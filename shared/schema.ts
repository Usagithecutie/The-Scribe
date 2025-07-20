import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().default("Untitled Document"),
  content: text("content").notNull().default(""),
  wordCount: integer("word_count").notNull().default(0),
  characterCount: integer("character_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  isDarkMode: boolean("is_dark_mode").notNull().default(true),
  fontSize: integer("font_size").notNull().default(14),
  fontFamily: text("font_family").notNull().default("Inter"),
  autoSave: boolean("auto_save").notNull().default(true),
});

export const writingPrompts = pgTable("writing_prompts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull().default("General"),
  isBookPassage: boolean("is_book_passage").notNull().default(false),
  bookReference: text("book_reference").default("You Are A Poem And The World Is Reading You (By Zeke)"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adviceEntries = pgTable("advice_entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull().default("Self-Care"),
  actionable: boolean("actionable").notNull().default(true),
  isBookReference: boolean("is_book_reference").notNull().default(false),
  bookReference: text("book_reference").default("You Are A Poem And The World Is Reading You (By Zeke)"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export const insertPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
});

export const insertWritingPromptSchema = createInsertSchema(writingPrompts).omit({
  id: true,
  createdAt: true,
});

export const insertAdviceEntrySchema = createInsertSchema(adviceEntries).omit({
  id: true,
  createdAt: true,
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type UpdateDocument = z.infer<typeof updateDocumentSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = z.infer<typeof insertPreferencesSchema>;
export type WritingPrompt = typeof writingPrompts.$inferSelect;
export type InsertWritingPrompt = z.infer<typeof insertWritingPromptSchema>;
export type AdviceEntry = typeof adviceEntries.$inferSelect;
export type InsertAdviceEntry = z.infer<typeof insertAdviceEntrySchema>;
