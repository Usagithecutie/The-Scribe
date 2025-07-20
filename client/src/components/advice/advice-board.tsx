import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Sparkles, Coffee, Sun, Moon } from "lucide-react";

interface AdviceCard {
  id: string;
  title: string;
  content: string;
  category: "Writing" | "Life" | "Love" | "Growth" | "Daily";
  mood: "Gentle" | "Motivating" | "Reflective" | "Uplifting";
  icon: React.ComponentType<{ className?: string }>;
}

const adviceCards: AdviceCard[] = [
  {
    id: "write-from-heart",
    title: "Write from Your Heart, Not Your Head",
    content: "The most beautiful writing comes from authentic emotion. Don't worry about perfect grammar or structure in your first draft. Let your heart speak first, then let your mind edit later. Your vulnerability is your strength.",
    category: "Writing",
    mood: "Gentle",
    icon: Heart
  },
  {
    id: "embrace-imperfection",
    title: "Embrace the Beautiful Mess",
    content: "Your first draft doesn't need to be perfect. In fact, it shouldn't be. Perfection kills creativity. Write messily, write badly, write authentically. You can always polish a rough diamond, but you can't create something from nothing.",
    category: "Writing",
    mood: "Motivating",
    icon: Sparkles
  },
  {
    id: "daily-pages",
    title: "Morning Pages: Your Daily Reset",
    content: "Try writing three pages every morning - just stream of consciousness. No topic, no goal, just pure brain dump. This clears mental clutter and often reveals surprising insights about what's really on your mind.",
    category: "Daily",
    mood: "Uplifting",
    icon: Sun
  },
  {
    id: "self-compassion",
    title: "Be Gentle with Your Creative Soul",
    content: "Writing takes courage. Every time you put words on paper, you're being vulnerable. Treat yourself with the same kindness you'd show a dear friend. Your creative voice deserves love and patience, especially from you.",
    category: "Growth",
    mood: "Gentle",
    icon: Heart
  },
  {
    id: "small-moments",
    title: "Find Magic in Ordinary Moments",
    content: "The best stories often come from the smallest moments - the way morning light hits your coffee cup, a stranger's smile, the sound of rain. Train yourself to notice these tiny miracles. They're everywhere, waiting to be written.",
    category: "Life",
    mood: "Reflective",
    icon: Star
  },
  {
    id: "write-for-yourself",
    title: "Write the Story You Need to Read",
    content: "Don't write to impress others or follow trends. Write the words you need to hear, the story you wish existed, the advice you needed when you were younger. Authentic writing always finds its audience.",
    category: "Writing",
    mood: "Motivating",
    icon: Sparkles
  },
  {
    id: "rest-is-creative",
    title: "Rest is Part of the Creative Process",
    content: "You don't have to write every day to be a 'real' writer. Sometimes your creativity needs to recharge. Take walks, read books, have conversations, live life. All of it feeds your writing in ways you can't imagine.",
    category: "Growth",
    mood: "Gentle",
    icon: Moon
  },
  {
    id: "trust-your-voice",
    title: "Your Voice Matters",
    content: "In a world full of noise, your unique perspective is needed. Don't try to sound like anyone else. The world has enough of them - what it needs is the first and only you. Trust that your voice has value.",
    category: "Love",
    mood: "Uplifting",
    icon: Star
  }
];

const categoryColors = {
  Writing: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Life: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", 
  Love: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Growth: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  Daily: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
};

const moodColors = {
  Gentle: "text-rose-400",
  Motivating: "text-orange-400", 
  Reflective: "text-indigo-400",
  Uplifting: "text-emerald-400"
};

export function AdviceBoard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(adviceCards.map(card => card.category)));
  const filteredCards = selectedCategory
    ? adviceCards.filter(card => card.category === selectedCategory)
    : adviceCards;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-pink-400" />
          <h2 className="text-2xl font-bold">Writing Wisdom</h2>
        </div>
        <p className="text-muted-foreground">
          Gentle guidance and encouragement for your writing journey. Remember: you are already enough.
        </p>
      </div>

      {/* Category Filter */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Wisdom
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Advice Cards */}
      <ScrollArea className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {filteredCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card key={card.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-muted/50 ${moodColors[card.mood]}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-purple-400 transition-colors">
                        {card.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={categoryColors[card.category]}>
                          {card.category}
                        </Badge>
                        <span className={`text-xs ${moodColors[card.mood]} font-medium`}>
                          {card.mood}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed text-base">
                    {card.content}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-6 border-t border-border bg-card/30 backdrop-blur">
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">🌸 Every writer's journey is unique and beautiful.</p>
          <p className="flex items-center justify-center gap-1">
            <Coffee className="w-4 h-4 text-amber-400" />
            Take what serves you, leave what doesn't
            <Heart className="w-4 h-4 text-pink-400" />
          </p>
        </div>
      </div>
    </div>
  );
}