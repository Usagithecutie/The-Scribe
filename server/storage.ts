import { documents, userPreferences, type Document, type InsertDocument, type UpdateDocument, type UserPreferences, type InsertUserPreferences } from "@shared/schema";

export interface IStorage {
  // Document operations
  createDocument(doc: InsertDocument): Promise<Document>;
  getDocument(id: number): Promise<Document | undefined>;
  getAllDocuments(): Promise<Document[]>;
  updateDocument(id: number, updates: UpdateDocument): Promise<Document | undefined>;
  deleteDocument(id: number): Promise<boolean>;
  
  // User preferences
  getUserPreferences(): Promise<UserPreferences | undefined>;
  updateUserPreferences(prefs: InsertUserPreferences): Promise<UserPreferences>;
}

export class MemStorage implements IStorage {
  private documents: Map<number, Document>;
  private preferences: UserPreferences | undefined;
  private currentDocId: number;
  private currentPrefId: number;

  constructor() {
    this.documents = new Map();
    this.currentDocId = 1;
    this.currentPrefId = 1;
    
    // Initialize with default preferences
    this.preferences = {
      id: this.currentPrefId++,
      isDarkMode: true,
      fontSize: 14,
      fontFamily: "Inter",
      autoSave: true,
    };

    // Add some initial sample documents for Rei
    const welcomeDoc: Document = {
      id: this.currentDocId++,
      title: "Your Writing Sanctuary 🎀",
      content: `<h1>Welcome to Your Writing Sanctuary, Rei</h1>

<p>This is your special place for creativity and expression. Just like how you find comfort in quiet moments with Chikawa, may this space bring you peace and inspiration for your poetry and stories.</p>

<h2>Getting Started</h2>
<ul>
<li>Use the toolbar above to format your text - bold, italic, colors, and heading styles</li>
<li>Your documents auto-save every 30 seconds</li>
<li>Create new documents anytime from the sidebar</li>
<li>Export your work as text files when you're ready to share</li>
</ul>

<p><em>"In this quiet sanctuary, your thoughts can bloom like poetry under starlight."</em></p>

<p>This is your creative haven. Write your heart out. 💜</p>`,
      wordCount: 95,
      characterCount: 620,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.documents.set(welcomeDoc.id, welcomeDoc);
  }

  async createDocument(insertDoc: InsertDocument): Promise<Document> {
    const id = this.currentDocId++;
    const now = new Date();
    const doc: Document = {
      ...insertDoc,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.documents.set(id, doc);
    return doc;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async getAllDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values()).sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  async updateDocument(id: number, updates: UpdateDocument): Promise<Document | undefined> {
    const doc = this.documents.get(id);
    if (!doc) return undefined;

    const updatedDoc: Document = {
      ...doc,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.documents.set(id, updatedDoc);
    return updatedDoc;
  }

  async deleteDocument(id: number): Promise<boolean> {
    return this.documents.delete(id);
  }

  async getUserPreferences(): Promise<UserPreferences | undefined> {
    return this.preferences;
  }

  async updateUserPreferences(prefs: InsertUserPreferences): Promise<UserPreferences> {
    this.preferences = {
      id: this.preferences?.id || this.currentPrefId++,
      ...prefs,
    };
    return this.preferences;
  }
}

export const storage = new MemStorage();
