import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shuffle, Heart, BookOpen, Coffee, Moon, Sparkles, User } from "lucide-react";
import { AdviceEntry } from "@shared/schema";

export function AdviceBoard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: allAdvice = [] } = useQuery<AdviceEntry[]>({
    queryKey: ["/api/advice"],
  });

  const { data: randomAdvice, refetch: getRandomAdvice } = useQuery<AdviceEntry>({
    queryKey: ["/api/advice/random"],
    enabled: false,
  });

  const filteredAdvice = selectedCategory === "all" 
    ? allAdvice 
    : allAdvice.filter(entry => entry.category.toLowerCase() === selectedCategory);

  const categories = Array.from(new Set(allAdvice.map(a => a.category)));

  const handleRandomAdvice = () => {
    getRandomAdvice();
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'self-care': return <Coffee className="w-4 h-4" />;
      case 'rest': return <Moon className="w-4 h-4" />;
      case 'comfort': return <Heart className="w-4 h-4" />;
      case 'grounding': return <Sparkles className="w-4 h-4" />;
      case 'self-acceptance': return <User className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Advice Board</h2>
        <p className="text-muted-foreground mb-4">
          Gentle reminders and wisdom for when you need a soft place to rest your heart
        </p>
        <Button onClick={handleRandomAdvice} className="mb-6">
          <Shuffle className="w-4 h-4 mr-2" />
          Daily Wisdom
        </Button>
      </div>

      {randomAdvice && (
        <Card className="border-primary/20 bg-primary/5 mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle className="text-primary">Today's Gentle Reminder</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-lg mb-3">{randomAdvice.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {randomAdvice.content}
            </p>
            {randomAdvice.isBookReference && randomAdvice.bookReference && (
              <p className="text-xs text-primary italic">
                — from: {randomAdvice.bookReference}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-4 md:grid-cols-6 gap-1">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredAdvice.map((advice) => (
              <Card key={advice.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getCategoryIcon(advice.category)}
                      {advice.title}
                    </CardTitle>
                    <div className="flex gap-2 flex-shrink-0">
                      <Badge variant="secondary">{advice.category}</Badge>
                      {advice.actionable && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Actionable
                        </Badge>
                      )}
                      {advice.isBookReference && (
                        <Badge variant="outline" className="text-primary">
                          <BookOpen className="w-3 h-3 mr-1" />
                          Book
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {advice.content}
                  </p>
                  {advice.isBookReference && advice.bookReference && (
                    <p className="text-xs text-primary italic">
                      — from: {advice.bookReference}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredAdvice.length === 0 && (
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No advice found for this category. Try selecting "All" to see all available wisdom.
          </p>
        </div>
      )}
    </div>
  );
}