import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shuffle, PenTool, BookOpen, Heart } from "lucide-react";
import { WritingPrompt } from "@shared/schema";

interface WritingPromptsProps {
  onCreateFromPrompt: (prompt: WritingPrompt) => void;
}

export function WritingPrompts({ onCreateFromPrompt }: WritingPromptsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: allPrompts = [] } = useQuery<WritingPrompt[]>({
    queryKey: ["/api/writing-prompts"],
  });

  const { data: randomPrompt, refetch: getRandomPrompt } = useQuery<WritingPrompt>({
    queryKey: ["/api/writing-prompts/random"],
    enabled: false,
  });

  const filteredPrompts = selectedCategory === "all" 
    ? allPrompts 
    : allPrompts.filter(prompt => prompt.category.toLowerCase() === selectedCategory);

  const categories = Array.from(new Set(allPrompts.map(p => p.category)));

  const handleUsePrompt = (prompt: WritingPrompt) => {
    onCreateFromPrompt(prompt);
  };

  const handleRandomPrompt = () => {
    getRandomPrompt().then(({ data }) => {
      if (data) {
        handleUsePrompt(data);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Writing Inspiration</h2>
        <p className="text-muted-foreground mb-4">
          Find your next story, poem, or reflection with these curated prompts
        </p>
        <Button onClick={handleRandomPrompt} className="mb-6">
          <Shuffle className="w-4 h-4 mr-2" />
          Surprise Me
        </Button>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-4 md:grid-cols-7 gap-1">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredPrompts.map((prompt) => (
              <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{prompt.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{prompt.category}</Badge>
                      {prompt.isBookPassage && (
                        <Badge variant="outline" className="text-primary">
                          <BookOpen className="w-3 h-3 mr-1" />
                          Book
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {prompt.content}
                  </p>
                  {prompt.isBookPassage && prompt.bookReference && (
                    <p className="text-xs text-primary italic mb-4">
                      — from: {prompt.bookReference}
                    </p>
                  )}
                  <Button 
                    onClick={() => handleUsePrompt(prompt)} 
                    className="w-full"
                    variant="outline"
                  >
                    <PenTool className="w-4 h-4 mr-2" />
                    Start Writing
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No prompts found for this category. Try selecting "All" to see all available prompts.
          </p>
        </div>
      )}
    </div>
  );
}