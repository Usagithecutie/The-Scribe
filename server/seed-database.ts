import { db } from "./db";
import { documents, writingPrompts, adviceEntries, userPreferences } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingPrompts = await db.select().from(writingPrompts).limit(1);
    if (existingPrompts.length > 0) {
      console.log("Database already seeded");
      return;
    }

    console.log("Seeding database...");

    // Add default user preferences
    await db.insert(userPreferences).values({
      isDarkMode: true,
      fontSize: 14,
      fontFamily: "Inter",
      autoSave: true,
    });

    // Add welcome document
    await db.insert(documents).values({
      title: "Your Writing Sanctuary 🎀",
      content: `<h1>Welcome to Your Personal World, Rei</h1>

<p>This is your special place for creativity and expression. Just like how you find comfort in quiet moments with Chikawa, may this space bring you peace and inspiration for your poetry and stories.</p>

<h2>Getting Started</h2>
<ul>
<li>Use the toolbar above to format your text - bold, italic, colors, and heading styles</li>
<li>Your documents auto-save every 30 seconds</li>
<li>Create new documents anytime from the sidebar</li>
<li>Explore Writing Prompts for inspiration</li>
<li>Visit the Advice Board for gentle reminders and wisdom</li>
<li>Export your work as text files when you're ready to share</li>
</ul>

<p><em>"In this quiet sanctuary, your thoughts can bloom like poetry under starlight."</em></p>

<p>This is your creative haven. Write your heart out. 💜</p>`,
      wordCount: 110,
      characterCount: 750,
    });

    // Seed writing prompts
    const promptsData = [
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

    await db.insert(writingPrompts).values(promptsData);

    // Seed advice entries
    const adviceData = [
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

    await db.insert(adviceEntries).values(adviceData);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}