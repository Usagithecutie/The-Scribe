import { documents, userPreferences, writingPrompts, adviceEntries, type Document, type InsertDocument, type UpdateDocument, type UserPreferences, type InsertUserPreferences, type WritingPrompt, type InsertWritingPrompt, type AdviceEntry, type InsertAdviceEntry } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
  
  // Writing prompts
  getAllWritingPrompts(): Promise<WritingPrompt[]>;
  getWritingPromptsByCategory(category: string): Promise<WritingPrompt[]>;
  getRandomWritingPrompt(): Promise<WritingPrompt | undefined>;
  
  // Advice entries
  getAllAdviceEntries(): Promise<AdviceEntry[]>;
  getAdviceEntriesByCategory(category: string): Promise<AdviceEntry[]>;
  getRandomAdviceEntry(): Promise<AdviceEntry | undefined>;
}

export class MemStorage implements IStorage {
  private documents: Map<number, Document>;
  private preferences: UserPreferences | undefined;
  private writingPrompts: Map<number, WritingPrompt>;
  private adviceEntries: Map<number, AdviceEntry>;
  private currentDocId: number;
  private currentPrefId: number;
  private currentPromptId: number;
  private currentAdviceId: number;

  constructor() {
    this.documents = new Map();
    this.writingPrompts = new Map();
    this.adviceEntries = new Map();
    this.currentDocId = 1;
    this.currentPrefId = 1;
    this.currentPromptId = 1;
    this.currentAdviceId = 1;
    
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

    this.initializeWritingPrompts();
    this.initializeAdviceEntries();
  }

  private initializeWritingPrompts() {
    const prompts = [
      {
        title: "The Weight and Wonder of Feeling",
        content: "You feel everything so deeply that sometimes you wonder if your heart is too big for this world. Write about the weight and wonder of feeling deeply, and how it shapes your experience of love, loss, and everything in between.",
        category: "Emotions",
        isBookPassage: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      },
      {
        title: "Love That Nourishes, Not Depletes",
        content: "Describe the kind of love you want to receive - love that doesn't ask you to be smaller, love that doesn't require you to dim your light. What would it feel like to be loved exactly as you are?",
        category: "Love",
        isBookPassage: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      },
      {
        title: "The Art of Surrender",
        content: "Sometimes the bravest thing we can do is let go. Write about something you've been holding onto too tightly, and imagine what it would feel like to release it with gentleness.",
        category: "Letting Go",
        isBookPassage: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      },
      {
        title: "You Are the Writer and You Are the Story",
        content: "Your life is both the poem being written and the poet writing it. Reflect on a moment when you realized you had the power to change your narrative.",
        category: "Self-Discovery",
        isBookPassage: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      },
      {
        title: "Chikawa Moments",
        content: "Write about the small, tender moments that bring you joy - like how Chikawa finds wonder in simple things. What are your quiet happinesses?",
        category: "Joy",
        isBookPassage: false,
        bookReference: null
      },
      {
        title: "Poetry in Purple",
        content: "Purple is your color - the color of mystery, creativity, and deep emotion. Write a poem or story where purple plays a meaningful role.",
        category: "Creativity",
        isBookPassage: false,
        bookReference: null
      }
    ];

    prompts.forEach(prompt => {
      const writingPrompt: WritingPrompt = {
        id: this.currentPromptId++,
        title: prompt.title,
        content: prompt.content,
        category: prompt.category,
        isBookPassage: prompt.isBookPassage,
        bookReference: prompt.bookReference,
        createdAt: new Date()
      };
      this.writingPrompts.set(writingPrompt.id, writingPrompt);
    });
  }

  private initializeAdviceEntries() {
    const entries = [
      {
        title: "Drink Water, Nourish Your Soul",
        content: "Your body is 60% water, and your emotions flow like rivers through you. When you feel overwhelmed, drink a full glass of water slowly. With each sip, imagine you're nourishing not just your body, but your spirit. Hydration helps your mind think clearly and your heart feel steadier.",
        category: "Self-Care",
        actionable: true,
        isBookReference: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      },
      {
        title: "Let Music Hold You",
        content: "When words feel too heavy and the world feels too loud, let Spotify be your sanctuary. Create a playlist that feels like a warm hug - songs that understand your heart. Music has the power to heal what words cannot reach.",
        category: "Comfort",
        actionable: true,
        isBookReference: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      },
      {
        title: "The Permission to Rest",
        content: "You don't need to earn your rest. You don't need to be productive every moment. Sometimes the most revolutionary thing you can do is simply lie down, breathe deeply, and let yourself exist without purpose for a while.",
        category: "Rest",
        actionable: true,
        isBookReference: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      },
      {
        title: "Step Outside, Even for Five Minutes",
        content: "Fresh air is medicine for your soul. When you feel stuck or overwhelmed, step outside - even if it's just to your doorway. Feel the air on your skin, notice one thing that's beautiful, breathe in the sky. Nature remembers who you are when you forget.",
        category: "Grounding",
        actionable: true,
        isBookReference: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      },
      {
        title: "Write Three Good Things",
        content: "Before bed, write down three things that went well today - no matter how small. Your brain needs evidence that good things happen, that you matter, that there is still beauty in this world. This simple practice rewires your heart toward hope.",
        category: "Gratitude",
        actionable: true,
        isBookReference: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      },
      {
        title: "You Don't Have to Carry Everything",
        content: "That weight you're carrying? Some of it isn't even yours. Some of it belongs to people who walked away. Some of it belongs to versions of yourself you've outgrown. You have permission to put it down.",
        category: "Emotional Health",
        actionable: false,
        isBookReference: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      },
      {
        title: "Your Softness is Your Strength",
        content: "In a world that tells you to be harder, your gentleness is revolutionary. Your ability to feel deeply, to love fully, to care genuinely - this is not weakness. This is your superpower.",
        category: "Self-Acceptance",
        actionable: false,
        isBookReference: true,
        bookReference: "You Are A Poem And The World Is Reading You (By Zeke)"
      }
    ];

    entries.forEach(entry => {
      const adviceEntry: AdviceEntry = {
        id: this.currentAdviceId++,
        title: entry.title,
        content: entry.content,
        category: entry.category,
        actionable: entry.actionable,
        isBookReference: entry.isBookReference,
        bookReference: entry.bookReference,
        createdAt: new Date()
      };
      this.adviceEntries.set(adviceEntry.id, adviceEntry);
    });
  }

  async createDocument(insertDoc: InsertDocument): Promise<Document> {
    const id = this.currentDocId++;
    const now = new Date();
    const doc: Document = {
      id,
      title: insertDoc.title || "Untitled Document",
      content: insertDoc.content || "",
      wordCount: insertDoc.wordCount || 0,
      characterCount: insertDoc.characterCount || 0,
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
      title: updates.title ?? doc.title,
      content: updates.content ?? doc.content,
      wordCount: updates.wordCount ?? doc.wordCount,
      characterCount: updates.characterCount ?? doc.characterCount,
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
      isDarkMode: prefs.isDarkMode ?? this.preferences?.isDarkMode ?? true,
      fontSize: prefs.fontSize ?? this.preferences?.fontSize ?? 14,
      fontFamily: prefs.fontFamily ?? this.preferences?.fontFamily ?? "Inter",
      autoSave: prefs.autoSave ?? this.preferences?.autoSave ?? true,
    };
    return this.preferences!;
  }

  // Writing prompts methods
  async getAllWritingPrompts(): Promise<WritingPrompt[]> {
    return Array.from(this.writingPrompts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getWritingPromptsByCategory(category: string): Promise<WritingPrompt[]> {
    return Array.from(this.writingPrompts.values())
      .filter(prompt => prompt.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getRandomWritingPrompt(): Promise<WritingPrompt | undefined> {
    const prompts = Array.from(this.writingPrompts.values());
    if (prompts.length === 0) return undefined;
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  // Advice entries methods
  async getAllAdviceEntries(): Promise<AdviceEntry[]> {
    return Array.from(this.adviceEntries.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getAdviceEntriesByCategory(category: string): Promise<AdviceEntry[]> {
    return Array.from(this.adviceEntries.values())
      .filter(entry => entry.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getRandomAdviceEntry(): Promise<AdviceEntry | undefined> {
    const entries = Array.from(this.adviceEntries.values());
    if (entries.length === 0) return undefined;
    return entries[Math.floor(Math.random() * entries.length)];
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async createDocument(insertDoc: InsertDocument): Promise<Document> {
    const [doc] = await db.insert(documents).values(insertDoc).returning();
    return doc;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    const [doc] = await db.select().from(documents).where(eq(documents.id, id));
    return doc || undefined;
  }

  async getAllDocuments(): Promise<Document[]> {
    return await db.select().from(documents).orderBy(documents.updatedAt);
  }

  async updateDocument(id: number, updates: UpdateDocument): Promise<Document | undefined> {
    const [doc] = await db.update(documents).set({
      ...updates,
      updatedAt: new Date()
    }).where(eq(documents.id, id)).returning();
    return doc || undefined;
  }

  async deleteDocument(id: number): Promise<boolean> {
    const result = await db.delete(documents).where(eq(documents.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getUserPreferences(): Promise<UserPreferences | undefined> {
    const [prefs] = await db.select().from(userPreferences).limit(1);
    return prefs || undefined;
  }

  async updateUserPreferences(prefs: InsertUserPreferences): Promise<UserPreferences> {
    const existing = await this.getUserPreferences();
    if (existing) {
      const [updated] = await db.update(userPreferences).set(prefs).where(eq(userPreferences.id, existing.id)).returning();
      return updated;
    } else {
      const [created] = await db.insert(userPreferences).values(prefs).returning();
      return created;
    }
  }

  async getAllWritingPrompts(): Promise<WritingPrompt[]> {
    return await db.select().from(writingPrompts).orderBy(writingPrompts.createdAt);
  }

  async getWritingPromptsByCategory(category: string): Promise<WritingPrompt[]> {
    return await db.select().from(writingPrompts).where(eq(writingPrompts.category, category)).orderBy(writingPrompts.createdAt);
  }

  async getRandomWritingPrompt(): Promise<WritingPrompt | undefined> {
    const prompts = await db.select().from(writingPrompts);
    if (prompts.length === 0) return undefined;
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  async getAllAdviceEntries(): Promise<AdviceEntry[]> {
    return await db.select().from(adviceEntries).orderBy(adviceEntries.createdAt);
  }

  async getAdviceEntriesByCategory(category: string): Promise<AdviceEntry[]> {
    return await db.select().from(adviceEntries).where(eq(adviceEntries.category, category)).orderBy(adviceEntries.createdAt);
  }

  async getRandomAdviceEntry(): Promise<AdviceEntry | undefined> {
    const entries = await db.select().from(adviceEntries);
    if (entries.length === 0) return undefined;
    return entries[Math.floor(Math.random() * entries.length)];
  }
}

// Use database storage if DATABASE_URL is available (Vercel deployment), otherwise use memory storage
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
