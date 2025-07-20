import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDocumentSchema, updateDocumentSchema, insertPreferencesSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Document routes
  app.post("/api/documents", async (req, res) => {
    try {
      const validatedData = insertDocumentSchema.parse(req.body);
      const document = await storage.createDocument(validatedData);
      res.json(document);
    } catch (error) {
      res.status(400).json({ message: "Invalid document data" });
    }
  });

  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getAllDocuments();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.get("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch document" });
    }
  });

  app.patch("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateDocumentSchema.parse(req.body);
      const document = await storage.updateDocument(id, validatedData);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  app.delete("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const permanent = req.query.permanent === 'true';
      
      if (permanent) {
        // Permanent deletion
        const success = await storage.deleteDocument(id);
        if (!success) {
          return res.status(404).json({ message: "Document not found" });
        }
        res.json({ success: true });
      } else {
        // Move to trash
        const document = await storage.updateDocument(id, { isTrashed: true });
        if (!document) {
          return res.status(404).json({ message: "Document not found" });
        }
        res.json(document);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete document" });
    }
  });

  // User preferences routes
  app.get("/api/preferences", async (req, res) => {
    try {
      const preferences = await storage.getUserPreferences();
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch preferences" });
    }
  });

  app.put("/api/preferences", async (req, res) => {
    try {
      const validatedData = insertPreferencesSchema.parse(req.body);
      const preferences = await storage.updateUserPreferences(validatedData);
      res.json(preferences);
    } catch (error) {
      res.status(400).json({ message: "Invalid preferences data" });
    }
  });

  // Export routes
  app.post("/api/export/pdf/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      // For now, return document data - PDF generation would be implemented with libraries like puppeteer
      res.json({ 
        message: "PDF export would be implemented here", 
        document: {
          title: document.title,
          content: document.content.replace(/<[^>]*>/g, '') // Strip HTML for simple text
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Export failed" });
    }
  });

  app.post("/api/export/text/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      const textContent = document.content.replace(/<[^>]*>/g, ''); // Strip HTML tags
      res.set({
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${document.title}.txt"`
      });
      res.send(textContent);
    } catch (error) {
      res.status(500).json({ message: "Export failed" });
    }
  });

  // Writing prompts routes
  app.get("/api/writing-prompts", async (req, res) => {
    try {
      const category = req.query.category as string;
      const prompts = category 
        ? await storage.getWritingPromptsByCategory(category)
        : await storage.getAllWritingPrompts();
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch writing prompts" });
    }
  });

  app.get("/api/writing-prompts/random", async (req, res) => {
    try {
      const prompt = await storage.getRandomWritingPrompt();
      if (!prompt) {
        return res.status(404).json({ message: "No prompts available" });
      }
      res.json(prompt);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch random prompt" });
    }
  });

  // Advice entries routes
  app.get("/api/advice", async (req, res) => {
    try {
      const category = req.query.category as string;
      const entries = category 
        ? await storage.getAdviceEntriesByCategory(category)
        : await storage.getAllAdviceEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch advice entries" });
    }
  });

  app.get("/api/advice/random", async (req, res) => {
    try {
      const entry = await storage.getRandomAdviceEntry();
      if (!entry) {
        return res.status(404).json({ message: "No advice available" });
      }
      res.json(entry);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch random advice" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
