// Book content extracted from the DOCX file
export interface BookSection {
  id: string;
  title: string;
  content: string;
  sectionNumber: string;
  category: string;
}

export interface BookChapter {
  id: string;
  title: string;
  sections: BookSection[];
}

export const bookContent: BookChapter[] = [
  {
    id: "preface",
    title: "Introduction",
    sections: [
      {
        id: "letter",
        title: "💌 — A Letter From Me To You",
        sectionNumber: "Preface",
        category: "Introduction",
        content: `You are here.

And that means something.

This book is not just a collection of words.
It is a place to rest. A place to feel.
A place where your heart will be spoken to
In ways you didn't know it needed.

It is a journey—one you do not have to rush through.
One you do not have to be ready for.

Let this book meet you exactly where you are.
Let it unfold in your hands like a quiet revelation,
Like something you have always known but never had the words for.

Because that is what words do.
They name the feelings we thought were nameless.
They light candles in the rooms we thought would always be dark.

This book is for the ones who feel too much.
For the ones who have held on for too long.
For the ones who do not know how to let go,
But are learning.

For the ones who have loved deeply,
Who have ached quietly,
Who have searched for meaning in the spaces
Where silence lingers.

You will find yourself in these pages.
Not because they will tell you who to be—
but because they will remind you of who you have always been.

Let this book be a mirror.
Let it be a hand on your back, a whisper in your ear.
Let it be a place where you no longer have to explain yourself.
Where you do not have to beg to be understood.

This is not just a book.
This is a beginning.
And I promise you—
It is a beautiful one.`
      },
      {
        id: "synopsis",
        title: "🌻— SYNOPSIS",
        sectionNumber: "Overview",
        category: "Introduction",
        content: `You Are a Poem, and the World is Reading You

You did not find this book by accident. It found you.

Somewhere between the pages, between the spaces of each word, there is a reflection of you. This is not just a book—it is a mirror, a conversation, a quiet whisper in the spaces you thought no one noticed.

It Is here to sit with you in your softness, to unravel you gently, to remind you that you have always been poetry in motion. It will ask you questions you didn't know you needed to answer. It will pull at the threads of your heart, not to unravel you completely, but to show you the beauty of being woven together, even after everything.

This book is not here to teach you who you are. It is here to remind you of what you already know—of the love that has shaped you, the pain that has strengthened you, and the art of being human in all its aching, beautiful forms.

You are a poem. And the world is reading you.

–Zeke Iverson.`
      }
    ]
  },
  {
    id: "love-longing-1",
    title: "🎀 Section 0: Love & Longing I",
    sections: [
      {
        id: "love-steady",
        title: "Love as Something Steady",
        sectionNumber: "Page 1",
        category: "Love & Longing",
        content: "The depth of human connection, love in all its forms."
      },
      {
        id: "love-chooses",
        title: "Love That Chooses You Fully",
        sectionNumber: "Page 2", 
        category: "Love & Longing",
        content: "Love that doesn't ask you to be smaller, love that doesn't require you to dim your light."
      },
      {
        id: "love-finds-way",
        title: "Love Will Find Its Way to You",
        sectionNumber: "Page 3",
        category: "Love & Longing", 
        content: "Even when you feel unlovable, love has a way of finding you."
      },
      {
        id: "love-secure",
        title: "Love Needs to Feel Secure",
        sectionNumber: "Page 4",
        category: "Love & Longing",
        content: "Real love creates safety, not anxiety."
      },
      {
        id: "love-nourishes",
        title: "Love That Nourishes, Not Depletes",
        sectionNumber: "Page 5",
        category: "Love & Longing",
        content: "The kind of love that fills you up instead of emptying you out."
      },
      {
        id: "everything-ended",
        title: "Everything Has Ended, Yet I Am Still Here",
        sectionNumber: "Page 6",
        category: "Love & Longing",
        content: "Sometimes endings are beginnings in disguise."
      }
    ]
  },
  {
    id: "becoming",
    title: "🌿 Section I: Becoming",
    sections: [
      {
        id: "poetic-reflection",
        title: "A Poetic Reflection",
        sectionNumber: "Page 1",
        category: "Becoming",
        content: "Growth, healing, and stepping into your own light."
      },
      {
        id: "conversation-yourself",
        title: "A Conversation with Yourself", 
        sectionNumber: "Page 2",
        category: "Becoming",
        content: "The most important relationship you'll ever have is with yourself."
      },
      {
        id: "return-yourself",
        title: "A Reminder to Return to Yourself",
        sectionNumber: "Page 3",
        category: "Becoming", 
        content: "Come home to who you really are."
      },
      {
        id: "embracing-unfolding",
        title: "Embracing Your Unfolding",
        sectionNumber: "Page 4",
        category: "Becoming",
        content: "You are not behind. You are exactly where you need to be."
      },
      {
        id: "letter-lost",
        title: "A Letter to the One Who Feels Lost",
        sectionNumber: "Page 5",
        category: "Becoming",
        content: "Lost is just another word for searching."
      },
      {
        id: "not-behind",
        title: "You Are Not Behind",
        sectionNumber: "Page 6",
        category: "Becoming",
        content: "Your timeline is yours alone."
      },
      {
        id: "feel-too-much",
        title: "A Letter to the One Who Feels Too Much",
        sectionNumber: "Page 7",
        category: "Becoming",
        content: "Your sensitivity is a superpower."
      },
      {
        id: "quiet-unfolding", 
        title: "The Quiet Unfolding",
        sectionNumber: "Page 8",
        category: "Becoming",
        content: "Some of the most beautiful changes happen slowly."
      },
      {
        id: "love-letter-versions",
        title: "A Love Letter to Every Version of You",
        sectionNumber: "Page 9",
        category: "Becoming",
        content: "Every version of you has been necessary."
      },
      {
        id: "already-everything",
        title: "You Are Already Everything You Need to Be",
        sectionNumber: "Page 10",
        category: "Becoming",
        content: "Stop waiting for permission to be yourself."
      }
    ]
  },
  {
    id: "letting-go",
    title: "💔 Section II: Letting Go",
    sections: [
      {
        id: "weight-never-meant",
        title: "The Weight You Were Never Meant to Carry",
        sectionNumber: "Page 1",
        category: "Letting Go",
        content: "Learning the beauty of release, of surrender, of soft goodbyes."
      },
      {
        id: "storm-survived", 
        title: "The Storm You Survived",
        sectionNumber: "Page 2",
        category: "Letting Go",
        content: "You made it through. That matters."
      },
      {
        id: "learning-move-forward",
        title: "A Letter to the One Learning to Move Forward",
        sectionNumber: "Page 3",
        category: "Letting Go",
        content: "Moving forward doesn't mean forgetting."
      },
      {
        id: "art-surrender",
        title: "The Art of Surrender",
        sectionNumber: "Page 4",
        category: "Letting Go",
        content: "Sometimes the bravest thing you can do is let go."
      },
      {
        id: "never-been-held",
        title: "For the One Who Has Never Been Held",
        sectionNumber: "Page 5",
        category: "Letting Go",
        content: "You deserve tenderness."
      },
      {
        id: "fear-what-comes-next",
        title: "The Fear of What Comes Next",
        sectionNumber: "Page 6",
        category: "Letting Go",
        content: "The unknown is not your enemy."
      },
      {
        id: "things-never-meant-keep",
        title: "The Things You Were Never Meant to Keep",
        sectionNumber: "Page 7",
        category: "Letting Go",
        content: "Some things are meant to pass through you, not stick to you."
      },
      {
        id: "weight-no-one-sees",
        title: "The Weight No One Sees",
        sectionNumber: "Page 8",
        category: "Letting Go", 
        content: "Your invisible battles matter."
      },
      {
        id: "space-between",
        title: "The Space Between Holding On and Moving Forward",
        sectionNumber: "Page 9",
        category: "Letting Go",
        content: "You can honor the past and still choose your future."
      },
      {
        id: "last-time-hold-pain",
        title: "The Last Time You Hold This Pain",
        sectionNumber: "Page 10",
        category: "Letting Go",
        content: "Today can be the day you set it down."
      }
    ]
  },
  {
    id: "love-longing-2",
    title: "❤️ Section III: Love & Longing II",
    sections: [
      {
        id: "love-all-forms",
        title: "Love, in All Its Forms",
        sectionNumber: "Page 1",
        category: "Love & Longing",
        content: "The depth of human connection, love in all its forms."
      },
      {
        id: "kind-love-stays",
        title: "The Kind of Love That Stays",
        sectionNumber: "Page 2",
        category: "Love & Longing",
        content: "Real love doesn't leave when things get hard."
      },
      {
        id: "love-deserve",
        title: "The Love You Deserve", 
        sectionNumber: "Page 3",
        category: "Love & Longing",
        content: "You deserve love that feels like home."
      },
      {
        id: "love-never-yours",
        title: "The Love That Was Never Yours to Keep",
        sectionNumber: "Page 4",
        category: "Love & Longing",
        content: "Some love is a lesson, not a destination."
      },
      {
        id: "real-love-feels-like",
        title: "What Real Love Feels Like",
        sectionNumber: "Page 5",
        category: "Love & Longing",
        content: "Real love feels like coming home to yourself."
      },
      {
        id: "deserve-loved-fully",
        title: "You Deserve to Be Loved Fully",
        sectionNumber: "Page 6",
        category: "Love & Longing",
        content: "Not in pieces. Not conditionally. Fully."
      },
      {
        id: "when-love-finds-you",
        title: "When Love Finds You",
        sectionNumber: "Page 7",
        category: "Love & Longing", 
        content: "You won't have to convince it to stay."
      },
      {
        id: "love-should-feel-safe",
        title: "Love Should Feel Safe",
        sectionNumber: "Page 8",
        category: "Love & Longing",
        content: "Love is not supposed to make you anxious."
      },
      {
        id: "love-nourishes-not-depletes",
        title: "Love That Nourishes, Not Depletes",
        sectionNumber: "Page 9",
        category: "Love & Longing",
        content: "The right love will energize you, not drain you."
      },
      {
        id: "love-never-leaves",
        title: "Love Never Leaves",
        sectionNumber: "Page 10",
        category: "Love & Longing",
        content: "Real love transforms but never truly leaves you."
      }
    ]
  },
  {
    id: "art-feeling",
    title: "✨ Section IV: The Art of Feeling",
    sections: [
      {
        id: "weight-wonder-feeling",
        title: "The Weight and Wonder of Feeling",
        sectionNumber: "Page 1",
        category: "The Art of Feeling",
        content: "An ode to those who feel deeply, who love hard, who carry the universe inside them."
      },
      {
        id: "okay-be-weak",
        title: "It's Okay to Be Weak",
        sectionNumber: "Page 2",
        category: "The Art of Feeling",
        content: "Vulnerability is not weakness. It's courage."
      },
      {
        id: "beauty-falling-apart",
        title: "The Beauty in Falling Apart",
        sectionNumber: "Page 3",
        category: "The Art of Feeling",
        content: "Sometimes we need to fall apart to fall back together."
      },
      {
        id: "ache-being-human",
        title: "The Ache of Being Human",
        sectionNumber: "Page 4",
        category: "The Art of Feeling",
        content: "To be human is to ache beautifully."
      },
      {
        id: "still-here",
        title: "I Am Still Here",
        sectionNumber: "Page 5",
        category: "The Art of Feeling",
        content: "Despite everything, you're still here. That's everything."
      },
      {
        id: "loneliness-comes-after",
        title: "The Loneliness That Comes After",
        sectionNumber: "Page 6",
        category: "The Art of Feeling",
        content: "After the storm, the quiet can feel overwhelming."
      },
      {
        id: "learning-feel-again",
        title: "Learning to Feel Again",
        sectionNumber: "Page 7",
        category: "The Art of Feeling",
        content: "After numbness, feeling can be frightening and beautiful."
      },
      {
        id: "weight-can-release",
        title: "The Weight That You Can Now Release",
        sectionNumber: "Page 8", 
        category: "The Art of Feeling",
        content: "You have permission to put it down."
      },
      {
        id: "forgiving-yourself",
        title: "Forgiving Yourself for the Things You Cannot Change",
        sectionNumber: "Page 9",
        category: "The Art of Feeling",
        content: "Self-forgiveness is the deepest form of self-love."
      },
      {
        id: "feeling-cannot-name",
        title: "The Feeling You Cannot Name",
        sectionNumber: "Page 10",
        category: "The Art of Feeling",
        content: "Some feelings are too profound for words."
      }
    ]
  },
  {
    id: "you-are-poem",
    title: "🧸 Section V: You Are a Poem",
    sections: [
      {
        id: "poem-world-reading",
        title: "You Are a Poem, and the World Is Reading You",
        sectionNumber: "Page 1",
        category: "You Are a Poem",
        content: "A gentle reminder that life itself is poetry, and you are its writer."
      },
      {
        id: "universe-wrote-you",
        title: "The Universe Wrote You Into Existence",
        sectionNumber: "Page 2",
        category: "You Are a Poem",
        content: "You are not an accident. You are poetry in motion."
      },
      {
        id: "universe-writing-cursive",
        title: "The Universe Is Writing You in Cursive",
        sectionNumber: "Page 3",
        category: "You Are a Poem",
        content: "Every curve of your story is intentional."
      },
      {
        id: "writer-and-story",
        title: "You Are the Writer, and You Are the Story",
        sectionNumber: "Page 4",
        category: "You Are a Poem",
        content: "You have the power to edit your narrative."
      },
      {
        id: "ink-refuses-fade",
        title: "You Are the Ink That Refuses to Fade",
        sectionNumber: "Page 5",
        category: "You Are a Poem",
        content: "Your impact is permanent, beautiful, and lasting."
      },
      {
        id: "canvas-existence",
        title: "The Canvas of Your Existence (A Prelude to the Final Revelation)",
        sectionNumber: "Page 6",
        category: "You Are a Poem",
        content: "Every experience adds color to your masterpiece."
      },
      {
        id: "colors-longing",
        title: "The Colors of Longing",
        sectionNumber: "Page 7",
        category: "You Are a Poem",
        content: "Even your pain has beauty in it."
      },
      {
        id: "moment-before-universe",
        title: "The Moment Before the Universe Began",
        sectionNumber: "Page 8",
        category: "You Are a Poem",
        content: "You existed in possibility before you existed in reality."
      },
      {
        id: "universe-born-tears",
        title: "The Universe Was Born From Your Tears (Final Poem, Prelude)",
        sectionNumber: "Page 9",
        category: "You Are a Poem", 
        content: "Even your sorrow is sacred."
      },
      {
        id: "final-whisper",
        title: "A Final Whisper to You (Closing Reflection)",
        sectionNumber: "Page 10",
        category: "You Are a Poem",
        content: "You are loved. You are seen. You are enough."
      }
    ]
  },
  {
    id: "final-message",
    title: "🌙 Final Section: A Message from the Author",
    sections: [
      {
        id: "walked-journey",
        title: "To the One Who Has Walked This Journey (A Letter from the Author)",
        sectionNumber: "Page 11",
        category: "Final Message",
        content: "The author's heartfelt message to the readers."
      },
      {
        id: "name-written-light",
        title: "A Name Written in Light (A Quiet Dedication)",
        sectionNumber: "Page 12", 
        category: "Final Message",
        content: "You are remembered. You matter."
      }
    ]
  }
];

// Helper functions for the book content
export function getAllSections(): BookSection[] {
  return bookContent.flatMap(chapter => chapter.sections);
}

export function getSectionById(id: string): BookSection | undefined {
  return getAllSections().find(section => section.id === id);
}

export function getSectionsByCategory(category: string): BookSection[] {
  return getAllSections().filter(section => section.category === category);
}

export function getNextSection(currentId: string): BookSection | undefined {
  const allSections = getAllSections();
  const currentIndex = allSections.findIndex(section => section.id === currentId);
  if (currentIndex === -1 || currentIndex === allSections.length - 1) return undefined;
  return allSections[currentIndex + 1];
}

export function getPreviousSection(currentId: string): BookSection | undefined {
  const allSections = getAllSections();
  const currentIndex = allSections.findIndex(section => section.id === currentId);
  if (currentIndex <= 0) return undefined;
  return allSections[currentIndex - 1];
}

export const categories = [
  "Introduction",
  "Love & Longing", 
  "Becoming",
  "Letting Go",
  "The Art of Feeling",
  "You Are a Poem",
  "Final Message"
];