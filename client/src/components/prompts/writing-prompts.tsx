import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles, PenTool, Heart, Lightbulb, Coffee, Star } from "lucide-react";

export interface WritingPrompt {
  id: string;
  title: string;
  content: string;
  category: "Personal" | "Creative" | "Emotional" | "Reflective" | "Daily";
  difficulty: "Easy" | "Medium" | "Deep";
}

const prompts: WritingPrompt[] = [
  {
    id: "letter-to-younger-self",
    title: "Letter to Your Younger Self",
    content: "Write a compassionate letter to yourself at age 16. What would you tell them about love, dreams, and the journey ahead?",
    category: "Personal",
    difficulty: "Deep"
  },
  {
    id: "moment-of-peace",
    title: "A Moment of Perfect Peace",
    content: "Describe a moment when you felt completely at peace. What made it special? How can you create more moments like this?",
    category: "Reflective",
    difficulty: "Medium"
  },
  {
    id: "gratitude-letter",
    title: "Gratitude Letter",
    content: "Write a thank you letter to someone who changed your life. Tell them exactly how they impacted you.",
    category: "Emotional",
    difficulty: "Medium"
  },
  {
    id: "dream-conversation",
    title: "Conversation with Your Dreams",
    content: "If your dreams could speak, what would they tell you? Write a dialogue between you and your deepest aspirations.",
    category: "Creative",
    difficulty: "Deep"
  },
  {
    id: "morning-ritual",
    title: "Your Perfect Morning",
    content: "Design your ideal morning routine. What would make you feel most alive and ready for the day?",
    category: "Daily",
    difficulty: "Easy"
  },
  {
    id: "love-story",
    title: "A Love Story to Remember",
    content: "Write about a love story - it could be romantic, familial, or self-love. What made it beautiful and lasting?",
    category: "Emotional",
    difficulty: "Medium"
  },
  {
    id: "future-self",
    title: "Message from Future You",
    content: "Imagine your future self sending you a message. What wisdom would they share about your current challenges?",
    category: "Reflective",
    difficulty: "Deep"
  },
  {
    id: "simple-joy",
    title: "The Smallest Joy",
    content: "Write about a tiny moment that brought you unexpected happiness. Why do small things matter so much?",
    category: "Daily",
    difficulty: "Easy"
  }
];

const categoryColors = {
  Personal: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Creative: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Emotional: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  Reflective: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  Daily: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
};

const difficultyIcons = {
  Easy: Coffee,
  Medium: Lightbulb,
  Deep: Star
};

interface WritingPromptsProps {
  onCreateFromPrompt?: (prompt: WritingPrompt) => void;
}

export function WritingPrompts({ onCreateFromPrompt }: WritingPromptsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(prompts.map(p => p.category)));
  const filteredPrompts = selectedCategory 
    ? prompts.filter(p => p.category === selectedCategory)
    : prompts;

  const handleUsePrompt = (prompt: WritingPrompt) => {
    if (onCreateFromPrompt) {
      onCreateFromPrompt(prompt);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold">Writing Prompts</h2>
        </div>
        <p className="text-muted-foreground">
          Spark your creativity with thoughtful prompts designed to help you explore your inner world.
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
            All Prompts
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

      {/* Prompts Grid */}
      <ScrollArea className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPrompts.map((prompt) => {
            const DifficultyIcon = difficultyIcons[prompt.difficulty];
            return (
              <Card key={prompt.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-purple-400 transition-colors">
                        {prompt.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={categoryColors[prompt.category]}>
                        {prompt.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DifficultyIcon className="w-4 h-4" />
                        <span className="text-xs">{prompt.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="leading-relaxed">
                    {prompt.content}
                  </CardDescription>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => handleUsePrompt(prompt)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <PenTool className="w-4 h-4 mr-2" />
                      Start Writing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-6 border-t border-border bg-card/30 backdrop-blur">
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">💜 These prompts are crafted with love to help you connect with your inner voice.</p>
          <p className="flex items-center justify-center gap-1">
            <Heart className="w-4 h-4 text-pink-400" />
            Made for Rei's writing journey
          </p>
        </div>
      </div>
    </div>
  );
}