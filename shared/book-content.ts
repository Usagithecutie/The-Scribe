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
        content: `Love is not meant to be fleeting,
Not meant to be a passing storm
That rages and disappears,
Leaving wreckage in its wake.

Love is the steady rain
That softens the earth,
The quiet presence
That does not demand to be seen
Yet is always felt.

Love is not just passion.
It is presence.

It is choosing—
Day after day,
Moment after moment,
To stay.

Even when the fire of newness fades,
Even when life grows heavy,
Even when the road is long
And uncertain.

Love is the hand
That reaches for yours in the dark.
The voice that says,
"You do not have to walk alone."

It is not perfect,
But it does not leave.
It does not break at the first sign of struggle.
It does not retreat when the world becomes too much.

Love stays.
Even when it is quiet.
Even when it is not easy.
Even when it has to be chosen,
Again and again.

Because love,
True love,
Is not just about feeling.
It is about being.

And it is steady,
Even when everything else is not.`
      },
      {
        id: "love-chooses",
        title: "Love That Chooses You Fully",
        sectionNumber: "Page 2", 
        category: "Love & Longing",
        content: `Love should never be a half-written story,
A hesitation,
A feeling that lingers in the air
But never lands.

You deserve a love
That does not flinch when the world gets heavy.
A love that does not step back
When the waters rise.
A love that does not make you wonder
If you are enough.

Because love—real love—chooses.

It chooses you in the morning light,
When your hair is messy
And your eyes are still full of dreams.
It chooses you in the midnight silence,
When your fears slip between the sheets like shadows.
It chooses you on the easy days and the impossible ones,
Not because it has to,
But because it cannot imagine a world where it does not.

Love is not meant to be guessed at.
It is not meant to be chased,
Bargained for,
Or questioned.

If you have to wonder
Whether love is choosing you,
Then it is already telling you the answer.

And you—
You deserve the kind of love
That stands firm,
That meets you where you are,
That takes your hand and says,

"No matter what, I choose you."`
      },
      {
        id: "love-finds-way",
        title: "Love Will Find Its Way to You",
        sectionNumber: "Page 3",
        category: "Love & Longing", 
        content: `Love will find its way to you.

Love does not always arrive
When you are ready for it.
It does not knock politely,
Waiting for permission to enter.

It comes as the tide—
Gentle some days, relentless on others,
Pulling at your shores
Even when you swore you would never let it in again.

Love finds you in the quiet moments,
In laughter you didn't expect,
In the warmth of a hand reaching for yours
When you weren't looking for comfort.

It does not always come
Wrapped in the certainty you imagined.
Sometimes, it comes softly,
A whisper instead of a declaration,
A quiet presence instead of a grand entrance.

And love, real love,
Does not demand that you be unbroken to receive it.
It does not ask you to be perfect,
To be fearless,
To be anything other than who you are.

It simply arrives.
And stays.

So when love finds you,
Let it.

Let it soften the places inside you
That have turned to stone.
Let it remind you
That you were never meant to do this alone.
Let it be what it was always meant to be—

Not a storm,
But a home.`
      },
      {
        id: "love-secure",
        title: "Love Needs to Feel Secure",
        sectionNumber: "Page 4",
        category: "Love & Longing",
        content: `Love should not feel like walking on glass,
Like measuring your words,
Like holding your breath
To see if you are still wanted.

Love should not be something
That makes you question your worth,
That makes you feel like too much
Or never enough.

Love should be a place
Where your walls come down,
Where your voice does not shake,
Where your heart is not afraid
Of what happens if it is fully seen.

Love should be safe.

Not perfect.
Not without its storms,
But never the storm itself.

It should be the shelter you run to,
Not the thing you run from.

It should be a hand that reaches for yours
In the dark,
A voice that says,
"I am here. I am not leaving."

Love does not ask you
To shrink yourself to be held.
It does not turn away
When your scars are visible.
It does not punish you
For feeling deeply.

It stays.
It listens.
It softens the sharp edges of the world.

And if love does not feel like safety,
If it makes you feel small,
If it makes you question the ground beneath your feet—
Then, my love,
It is not love.`
      },
      {
        id: "love-nourishes",
        title: "Love That Nourishes, Not Depletes",
        sectionNumber: "Page 5",
        category: "Love & Longing",
        content: `Love should not drain you.
It should not leave you hollow,
Empty, exhausted,
Wondering if you are giving too much
Or if you are asking for too much.

Love should not be a battlefield,
Where your worth is something
That must constantly be proven.
It should not feel like an uphill climb,
Where only one of you is carrying the weight.

Love should give.

It should fill you.
It should feel like sunlight on your skin,
Not something that steals your light.
It should feel like breathing deeply,
Not gasping for air.

Love should be the kind of thing
That helps you grow,
That waters the parts of you
That have gone dry,
That reminds you that you are not too much,
That you were never too much.

Love should not leave you questioning
Whether you are worth the effort.
It should be the effort.

Because love that is real,
Love that is whole,
Does not take more than it gives.
It does not drain,
It restores.

And if love is making you feel empty,
Then it is not love.
It is longing,
It is fear,
It is something else in disguise.

But love?
Love should be the thing
That makes you feel more like yourself,
Not less.`
      },
      {
        id: "everything-ended",
        title: "Everything Has Ended, Yet I Am Still Here",
        sectionNumber: "Page 6",
        category: "Love & Longing",
        content: `There are moments when the world shifts beneath your feet,
When the people you thought would stay
Become ghosts in your story,
When the love you poured into another
Returns to you empty.

And yet—
You are still here.

You have felt the weight of goodbyes
That were never meant to be spoken.
You have stood in the wreckage
Of something you once called home,
Wondering if you would ever find your way back to yourself.

And yet—
You are still here.

You have sat with silence so loud
It threatened to swallow you whole.
You have traced the outline of what was,
Aching for something
That no longer belongs to you.

And yet—
You are still here.

Perhaps survival does not look like victory.
Perhaps it does not feel like strength.
Perhaps it is just the quiet persistence
Of putting one foot in front of the other
When your heart is begging you to stop.

But if you are here,
If you are reading this,
If you have made it through the nights
You thought would break you—

Then know this:

You are stronger than the endings.
You are more than the love that left.
You are not just what you have lost—
You are everything that remains.

And that is enough.

Now that you're here, take your time, breathe slowly—a gentle reminder that there is no need for you to rush. This is just the beginning, turn the page and let your own story in this book unfold, so go on and continue reading. -Zeke Iverson`
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
        content: `Becoming is not a destination.
It is the space between what was and what will be.
It is the silence before a song,
The pause between inhale and exhale.

Becoming is slow, soft, sometimes painful.
It is a process of unlearning the ways you thought you had to shrink yourself,
Of untangling the expectations woven into your skin.

You are not late.
You are not behind.
You are simply arriving.

At your own pace.
In your own way.
In your own time.

🌿 There is no rush. Flowers do not bloom all at once.

🌿 You are allowed to be both a masterpiece and a work in progress at the same time.

🌿 Growth is not about becoming someone new, but about returning to who you were before the world told you who to be.

Dear You,

I know there are days when you feel like you should have figured everything out by now. When the weight of "should" and "must" and "not enough" sits heavy on your chest.

But hear me when I say: You are not running out of time.

You are growing, even when you cannot see it.
You are healing, even in the moments when it feels like you are breaking.
You are becoming—slowly, softly, and in ways that do not always feel obvious.

Please be gentle with yourself.
You are not a problem to be solved.
You are a story still unfolding,
And every page is worth reading.

With love,
A friend who believes in you.`
      },
      {
        id: "conversation-yourself",
        title: "A Conversation with Yourself", 
        sectionNumber: "Page 2",
        category: "Becoming",
        content: `Becoming is not just about moving forward. Sometimes, it is about standing still long enough to listen to yourself.

Take a deep breath.
Feel the weight you have been carrying.
Now, set it down.
Just for a moment.
You do not have to hold everything at once.

🌿 A Thought to Hold Onto

You are not broken just because you are still becoming.
You are not behind just because your journey looks different.
You are exactly where you need to be.

Let yourself exist in this moment—without expectation, without judgment.

📝 A Question for You

When was the last time you gave yourself permission to just be?

Take a moment. Write it down. Let your thoughts flow without fear of how they sound.

💫 A Gentle Reminder

If you do not feel ready, that is okay.
If you do not have the words yet, that is okay.
This space is yours, whenever you need it.`
      },
      {
        id: "return-yourself",
        title: "A Reminder to Return to Yourself",
        sectionNumber: "Page 3",
        category: "Becoming", 
        content: `You do not have to be fearless to keep going.
You do not have to be whole to be worthy of love.
You do not have to have the answers to belong here.

There is nothing wrong with you.
You are not running out of time.
You are allowed to rest.
You are allowed to exist without earning it.

🌿 A Poetic Affirmation

Whenever you feel lost, return to these words:

"I am not behind, I am unfolding.
I am not lost, I am wandering toward myself.
I am not broken, I am becoming."

You do not have to prove yourself to be enough.
You already are.

📝 A Question for You

What is one thing you need to hear today?

If no one has said it to you, say it to yourself.
Write it down. Let it become a truth that belongs to you.

💫 A Soft Reminder

Healing is not linear.
Growth does not always look like progress.
Some days, becoming means resting.
And that is enough.`
      },
      {
        id: "embracing-unfolding",
        title: "Embracing Your Unfolding",
        sectionNumber: "Page 4",
        category: "Becoming",
        content: `The journey inward is a quiet revolution.
Each heartbeat and every breath whispers a secret truth—
That transformation lives in the stillness between moments,
In the silent spaces where hope and vulnerability meet.

Sometimes, growth is not loud; it is soft and subtle,
Like the first hint of dawn that gently pushes away the night.
In these moments, when you pause and simply listen,
You discover the strength that comes from being exactly as you are.

A Gentle Invitation

Take a moment now:
Close your eyes.
Feel the rhythm of your heart.
Allow the quiet of your soul to speak.

Reflect on a time when you felt completely at peace—a moment when you knew you were exactly as you should be.
What did that moment feel like?
How did it shape you?

Remember, dear one, that every soft step you take is a quiet victory.
Each act of self-kindness, every moment of honesty with yourself, is a triumph in your unfolding.
Be patient with your growth; bloom at your own pace.
Your journey is uniquely yours, and every whisper of your heart is proof of your resilience.`
      },
      {
        id: "letter-lost",
        title: "A Letter to the One Who Feels Lost",
        sectionNumber: "Page 5",
        category: "Becoming",
        content: `Dear You,

If you are reading this, I need you to know—
You are not failing just because you are still finding your way.

There is no timeline for healing, no deadline for becoming.
You do not have to have everything figured out today, tomorrow, or even next year.

Some journeys take longer.
Some hearts need more time.
Some souls are meant to wander before they find home.

But please—do not be so hard on yourself.
You are allowed to move slowly.
You are allowed to rest.
You are allowed to exist in the in-between without rushing to the next chapter.

A Quiet Moment of Peace

Close your eyes.
Take a deep breath.
Let yourself be here, in this moment.

Nothing else matters right now.
Not the past. Not the future. Only this.

You are not behind.
You are not lost.
You are simply becoming.`
      },
      {
        id: "not-behind",
        title: "You Are Not Behind",
        sectionNumber: "Page 6",
        category: "Becoming",
        content: `There is no timeline for becoming the person you are meant to be.

No deadline for healing.
No expiration date on dreams.
No schedule that you must follow to be worthy of love.

You are not behind just because someone else seems ahead.
You are not failing just because your path looks different.
You are not running out of time just because you haven't arrived yet.

Some flowers bloom in spring, others in fall.
Some stories unfold quickly, others take decades.
Some hearts heal fast, others need more time.

And all of it is okay.
All of it is exactly as it should be.

Your journey is not a race.
It is an unfolding.
A becoming.
A slow, beautiful return to yourself.

So please, be gentle with your timing.
Trust your pace.
Honor your process.

You are not behind.
You are exactly where you need to be.`
      },
      {
        id: "feel-too-much",
        title: "A Letter to the One Who Feels Too Much",
        sectionNumber: "Page 7",
        category: "Becoming",
        content: `Dear sensitive soul,

I know the world has told you that you are too much.
Too sensitive. Too emotional. Too intense.
That your tears are too quick, your heart too open, your care too deep.

But what if I told you that your sensitivity is not a flaw?
What if it is, instead, your greatest gift?

You feel the world in colors others cannot see.
You hear the music in moments others miss.
You love with a depth that transforms everyone you touch.

Yes, it hurts more when you are this open.
Yes, it aches more when you feel this deeply.
But it also means you experience joy more fully,
Love more completely,
Live more authentically.

Your tears are not weakness—they are courage.
Your empathy is not too much—it is exactly what this world needs.
Your heart is not broken—it is beautifully, brilliantly open.

So please, do not dim your light to make others comfortable.
Do not shrink your heart to fit into spaces too small for your spirit.
Do not apologize for feeling deeply in a shallow world.

You are not too much.
You are exactly enough.
And your sensitivity? It is your superpower.`
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