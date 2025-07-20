import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  BookOpen, 
  Heart, 
  Quote,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

// Book content extracted from the uploaded document
const bookSections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">You Are A Poem</h1>
        <p class="text-xl text-gray-300 italic">by Zeke Iverson</p>
      </div>
      
      <p class="text-lg leading-relaxed mb-6">
        Welcome to a journey of self-discovery and poetic wisdom. In these pages, you'll find reflections on life, love, and the beautiful complexity of being human.
      </p>
      
      <blockquote class="border-l-4 border-purple-500 pl-6 py-4 bg-purple-500/10 rounded-r-lg mb-6">
        <p class="italic text-lg">"You are not just reading poetry—you are poetry. Every breath, every heartbeat, every moment of your existence is a verse in the grand poem of life."</p>
      </blockquote>
      
      <p class="text-base leading-relaxed">
        This collection is more than words on pages; it's a mirror reflecting your own journey, struggles, and triumphs. Each piece invites you to see yourself not as you think you are, but as you truly are—magnificent, complex, and undeniably poetic.
      </p>
    `
  },
  {
    id: "chapter-1",
    title: "Chapter 1: The Mirror of Self",
    content: `
      <h2 class="text-2xl font-semibold text-purple-400 mb-6">The Mirror of Self</h2>
      
      <div class="poem-section mb-8 p-6 bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-xl">
        <h3 class="text-xl font-medium text-pink-400 mb-4">When You Look in the Mirror</h3>
        <div class="space-y-3 text-base leading-loose">
          <p>When you look in the mirror,</p>
          <p class="pl-4">what do you see?</p>
          <p>The flaws that others pointed out,</p>
          <p class="pl-4">or the beauty that's breaking free?</p>
          <p class="mt-4">Your eyes tell stories</p>
          <p class="pl-4">of tears and laughter,</p>
          <p>Your smile holds secrets</p>
          <p class="pl-4">of what you're chasing after.</p>
          <p class="mt-4 font-medium text-purple-300">You are more than your reflection—</p>
          <p class="pl-4 font-medium text-purple-300">you are the light behind it.</p>
        </div>
      </div>
      
      <p class="text-base leading-relaxed mb-6">
        We spend so much time examining our outer selves, critiquing every perceived imperfection, that we forget to see the poetry in our existence. Your scars are verses of survival. Your laugh lines are punctuation marks of joy. Your hands tell stories of all the love you've given.
      </p>
      
      <div class="reflection-box p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
        <h4 class="text-lg font-medium text-indigo-300 mb-3">Reflection Prompt:</h4>
        <p class="text-base leading-relaxed">
          Stand before a mirror today, but instead of looking for flaws, search for the poetry. Notice the way light catches your eyes, the unique curve of your smile, the strength in your posture. Write down three things you see that tell the story of who you are becoming.
        </p>
      </div>
    `
  },
  {
    id: "chapter-2", 
    title: "Chapter 2: Rhythms of the Heart",
    content: `
      <h2 class="text-2xl font-semibold text-purple-400 mb-6">Rhythms of the Heart</h2>
      
      <div class="poem-section mb-8 p-6 bg-gradient-to-br from-slate-800/50 to-pink-900/20 rounded-xl">
        <h3 class="text-xl font-medium text-pink-400 mb-4">Your Heart's Melody</h3>
        <div class="space-y-3 text-base leading-loose">
          <p>Listen closely to the rhythm</p>
          <p class="pl-4">beating in your chest—</p>
          <p>it's not just pumping blood,</p>
          <p class="pl-4">it's composing your life's song.</p>
          <p class="mt-4">Each beat is a word,</p>
          <p class="pl-4">each pause a breath,</p>
          <p>Each flutter when you're nervous</p>
          <p class="pl-4">or racing when you're blessed.</p>
          <p class="mt-4 font-medium text-pink-300">Your heart knows the lyrics</p>
          <p class="pl-4 font-medium text-pink-300">to songs you've never heard.</p>
        </div>
      </div>
      
      <p class="text-base leading-relaxed mb-6">
        Your heart has its own intelligence, its own way of knowing truth. It skips when you're excited, aches when you're hurt, and swells when you're loved. These aren't just physical responses—they're emotional punctuation marks in the story of your life.
      </p>
      
      <blockquote class="border-l-4 border-pink-500 pl-6 py-4 bg-pink-500/10 rounded-r-lg mb-6">
        <p class="italic">"The heart has its reasons which reason knows nothing of." —Blaise Pascal</p>
      </blockquote>
      
      <p class="text-base leading-relaxed mb-6">
        In a world that often demands logic and rationality, remember that your heart's wisdom is equally valuable. It feels what your mind cannot analyze. It knows connections your thoughts cannot explain. It loves without needing reasons.
      </p>
      
      <div class="reflection-box p-6 bg-pink-500/10 border border-pink-500/30 rounded-xl">
        <h4 class="text-lg font-medium text-pink-300 mb-3">Heart Practice:</h4>
        <p class="text-base leading-relaxed">
          Place your hand over your heart and feel its rhythm. For one minute, simply listen. Notice how it changes as you think of different people, places, or memories. Your heart is constantly writing poetry—learn to read its language.
        </p>
      </div>
    `
  },
  {
    id: "chapter-3",
    title: "Chapter 3: Words Unspoken",
    content: `
      <h2 class="text-2xl font-semibold text-purple-400 mb-6">Words Unspoken</h2>
      
      <div class="poem-section mb-8 p-6 bg-gradient-to-br from-slate-800/50 to-indigo-900/20 rounded-xl">
        <h3 class="text-xl font-medium text-indigo-400 mb-4">The Silence Between</h3>
        <div class="space-y-3 text-base leading-loose">
          <p>There are words living</p>
          <p class="pl-4">in the spaces between your ribs,</p>
          <p>sentences sleeping</p>
          <p class="pl-4">in the curve of your spine.</p>
          <p class="mt-4">All the things you wanted to say</p>
          <p class="pl-4">but couldn't find the voice,</p>
          <p>all the love you felt</p>
          <p class="pl-4">but feared to choose.</p>
          <p class="mt-4 font-medium text-indigo-300">Your silence is not empty—</p>
          <p class="pl-4 font-medium text-indigo-300">it's full of unborn poetry.</p>
        </div>
      </div>
      
      <p class="text-base leading-relaxed mb-6">
        We often think that only spoken words have power, but your unspoken thoughts and feelings are equally profound. They live in your gestures, your glances, the way you hold space for others, the way you choose to show up in the world.
      </p>
      
      <p class="text-base leading-relaxed mb-6">
        Sometimes the most powerful poetry is in what we don't say—the understanding that passes between friends without words, the comfort of a quiet presence, the way love can be felt without ever being declared.
      </p>
      
      <div class="quote-highlight p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-400/30 mb-6">
        <Quote className="w-8 h-8 text-indigo-400 mb-3" />
        <p class="text-lg italic leading-relaxed">
          "Sometimes you don't need to speak to be heard. Sometimes you don't need to move to create motion. Sometimes the most profound poetry is written in the language of presence."
        </p>
      </div>
      
      <div class="reflection-box p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
        <h4 class="text-lg font-medium text-indigo-300 mb-3">Silent Expression:</h4>
        <p class="text-base leading-relaxed">
          Think of something you've always wanted to express but haven't found the words for. Write it down, not for anyone else to read, but for you to acknowledge. Give voice to your silence, honor your unspoken truths.
        </p>
      </div>
    `
  },
  {
    id: "chapter-4",
    title: "Chapter 4: The Art of Becoming",
    content: `
      <h2 class="text-2xl font-semibold text-purple-400 mb-6">The Art of Becoming</h2>
      
      <div class="poem-section mb-8 p-6 bg-gradient-to-br from-slate-800/50 to-emerald-900/20 rounded-xl">
        <h3 class="text-xl font-medium text-emerald-400 mb-4">You Are Not Finished</h3>
        <div class="space-y-3 text-base leading-loose">
          <p>You are not a finished poem—</p>
          <p class="pl-4">you are still being written.</p>
          <p>Every day adds new lines,</p>
          <p class="pl-4">every experience, a new verse.</p>
          <p class="mt-4">Your chapters are not closed,</p>
          <p class="pl-4">your story is not done.</p>
          <p>You are the author and the poem,</p>
          <p class="pl-4">the writer and the one.</p>
          <p class="mt-4 font-medium text-emerald-300">Keep writing yourself</p>
          <p class="pl-4 font-medium text-emerald-300">into existence.</p>
        </div>
      </div>
      
      <p class="text-base leading-relaxed mb-6">
        Growth is not a destination; it's a continuous becoming. You are not the same person you were yesterday, and you won't be the same person tomorrow. This isn't a flaw—it's the most beautiful thing about being human.
      </p>
      
      <p class="text-base leading-relaxed mb-6">
        Every mistake is a rough draft, every success a published verse, every day a new page in the ongoing story of who you are becoming. Don't rush the process. Don't judge the drafts. Trust that you are exactly where you need to be in your own unique timeline.
      </p>
      
      <div class="growth-stages grid md:grid-cols-2 gap-4 mb-6">
        <div class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <h4 class="font-medium text-emerald-300 mb-2">Where You've Been</h4>
          <p class="text-sm leading-relaxed">Honor your past selves. They brought you here.</p>
        </div>
        <div class="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <h4 class="font-medium text-purple-300 mb-2">Where You're Going</h4>
          <p class="text-sm leading-relaxed">Trust the journey ahead. You're writing it as you go.</p>
        </div>
      </div>
      
      <div class="reflection-box p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
        <h4 class="text-lg font-medium text-emerald-300 mb-3">Becoming Practice:</h4>
        <p class="text-base leading-relaxed">
          Write a letter to yourself one year from now. What do you hope you'll have learned? What do you hope you'll have released? What new chapters are you excited to write? Remember: you're not trying to predict the future, you're setting intentions for your ongoing becoming.
        </p>
      </div>
    `
  },
  {
    id: "epilogue",
    title: "Epilogue: You Are the Poem",
    content: `
      <h2 class="text-2xl font-semibold text-purple-400 mb-6">You Are the Poem</h2>
      
      <div class="final-poem p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-400/30 mb-8">
        <div class="space-y-4 text-lg leading-loose text-center">
          <p class="font-medium text-purple-300">You are the poem</p>
          <p>that writes itself</p>
          <p>with every breath,</p>
          <p class="font-medium text-pink-300">every step,</p>
          <p>every act of love.</p>
          <p class="mt-6">You are the verse</p>
          <p>the universe</p>
          <p>has been waiting</p>
          <p class="font-medium text-purple-300">to read.</p>
          <p class="mt-6 text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            You are poetry in motion,
          </p>
          <p class="text-xl font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            a living, breathing masterpiece.
          </p>
        </div>
      </div>
      
      <p class="text-base leading-relaxed mb-6">
        As we reach the end of this collection, remember that this is not really an ending—it's a beginning. You now carry these words with you, but more importantly, you carry the understanding that you yourself are a poem worth reading, worth loving, worth celebrating.
      </p>
      
      <p class="text-base leading-relaxed mb-6">
        Every day, you have the opportunity to add new stanzas to your life's poem. Every interaction, every choice, every moment of presence is a line in the endless verse of your existence.
      </p>
      
      <blockquote class="border-l-4 border-purple-500 pl-6 py-4 bg-purple-500/10 rounded-r-lg mb-6">
        <p class="italic text-lg">
          "You are not here to be perfect. You are not here to be finished. You are here to be beautifully, courageously, authentically human. You are here to be poetry."
        </p>
      </blockquote>
      
      <div class="final-reflection p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl">
        <h4 class="text-lg font-medium text-purple-300 mb-3">Your Poem Continues:</h4>
        <p class="text-base leading-relaxed">
          Close this book, but don't close the poem of your life. Go forth and write yourself into the world with intention, with love, with the knowledge that you are both the author and the masterpiece. Your poem is still being written, and every day is a chance to make it more beautiful.
        </p>
      </div>
      
      <div class="text-center mt-8">
        <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
        <p class="italic text-purple-300">With love and poetry,</p>
        <p class="font-semibold text-purple-400">Zeke Iverson</p>
      </div>
    `
  }
];

export default function BookReader() {
  const [match, params] = useRoute("/book/:sectionId?");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { theme } = useTheme();

  // Find current section based on URL parameter or default to first section
  useEffect(() => {
    if (params?.sectionId) {
      const sectionIndex = bookSections.findIndex(section => section.id === params.sectionId);
      if (sectionIndex !== -1) {
        setCurrentSectionIndex(sectionIndex);
      }
    }
  }, [params?.sectionId]);

  const currentSection = bookSections[currentSectionIndex];
  const canGoBack = currentSectionIndex > 0;
  const canGoForward = currentSectionIndex < bookSections.length - 1;

  const goToPrevious = () => {
    if (canGoBack) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const goToNext = () => {
    if (canGoForward) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const goToSection = (index: number) => {
    setCurrentSectionIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Link href="/editor">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Editor</span>
            </Button>
          </Link>
          
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-semibold">You Are A Poem</h1>
            <Badge variant="secondary" className="text-xs">by Zeke Iverson</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" title="Bookmark">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" title="Share">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-72px)]">
        {/* Table of Contents */}
        <div className="w-80 bg-card/50 backdrop-blur border-r border-border">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-lg">Table of Contents</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {bookSections.length} chapters
            </p>
          </div>
          
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {bookSections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => goToSection(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    index === currentSectionIndex
                      ? 'bg-primary/20 border border-primary/30 text-primary'
                      : 'hover:bg-card/60 text-foreground'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      index === currentSectionIndex
                        ? 'border-primary text-primary bg-primary/10'
                        : 'border-muted-foreground text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm leading-tight">
                        {section.title}
                      </h3>
                      {index === currentSectionIndex && (
                        <p className="text-xs text-primary/80 mt-1">
                          Currently reading
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Content Area */}
          <ScrollArea className="flex-1">
            <div className="max-w-4xl mx-auto p-8">
              {/* Chapter Header */}
              <div className="mb-8">
                <Badge className="mb-4">
                  Chapter {currentSectionIndex + 1} of {bookSections.length}
                </Badge>
                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {currentSection.title}
                </h1>
              </div>

              {/* Chapter Content */}
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: currentSection.content }}
              />

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                <Button
                  variant="outline"
                  onClick={goToPrevious}
                  disabled={!canGoBack}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{currentSectionIndex + 1} of {bookSections.length}</span>
                </div>
                
                <Button
                  variant="outline"
                  onClick={goToNext}
                  disabled={!canGoForward}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Custom styles for book content */}
      <style>{`
        .poem-section {
          font-family: 'Georgia', serif;
        }
        
        .reflection-box {
          position: relative;
        }
        
        .reflection-box::before {
          content: '💭';
          position: absolute;
          top: -8px;
          left: 20px;
          font-size: 1.5rem;
        }
        
        .quote-highlight {
          position: relative;
        }
        
        .final-poem {
          font-family: 'Georgia', serif;
          position: relative;
          overflow: hidden;
        }
        
        .final-poem::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5cf6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}