import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";

export default function BirthdayPage() {
  const [, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();

  const handleEnterApp = () => {
    setLocation("/editor");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Celestial background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <defs>
              <radialGradient id="star" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0}} />
              </radialGradient>
            </defs>
            {/* Scattered stars */}
            <circle cx="100" cy="150" r="1" fill="url(#star)" opacity="0.8" />
            <circle cx="200" cy="100" r="1.5" fill="url(#star)" opacity="0.6" />
            <circle cx="350" cy="200" r="1" fill="url(#star)" opacity="0.9" />
            <circle cx="500" cy="120" r="1" fill="url(#star)" opacity="0.7" />
            <circle cx="650" cy="180" r="1.5" fill="url(#star)" opacity="0.5" />
            <circle cx="800" cy="140" r="1" fill="url(#star)" opacity="0.8" />
            <circle cx="150" cy="400" r="1" fill="url(#star)" opacity="0.6" />
            <circle cx="400" cy="350" r="1.5" fill="url(#star)" opacity="0.7" />
            <circle cx="750" cy="380" r="1" fill="url(#star)" opacity="0.9" />
            <circle cx="300" cy="600" r="1" fill="url(#star)" opacity="0.5" />
            <circle cx="600" cy="650" r="1.5" fill="url(#star)" opacity="0.8" />
            <circle cx="850" cy="620" r="1" fill="url(#star)" opacity="0.6" />
            <circle cx="120" cy="800" r="1" fill="url(#star)" opacity="0.7" />
            <circle cx="450" cy="850" r="1.5" fill="url(#star)" opacity="0.4" />
            <circle cx="700" cy="900" r="1" fill="url(#star)" opacity="0.8" />
          </svg>
        </div>
        
        {/* Soft constellation patterns */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <defs>
              <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#c084fc', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0.1}} />
              </linearGradient>
            </defs>
            <path d="M200 200 L350 150 L500 220 L650 180" stroke="url(#constellation)" strokeWidth="0.5" fill="none" />
            <path d="M150 400 L300 350 L450 420 L600 380" stroke="url(#constellation)" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="container mx-auto">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🪶</span>
              <span className="text-xl font-semibold text-white">Writing Sanctuary</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full text-white hover:bg-white/10"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </nav>
        </div>
      </header>

      {/* Birthday Message Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-4xl mx-auto">
          {/* Birthday Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Happy birthday, Rei. 🎀
            </h1>
          </div>

          {/* Birthday Message */}
          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-500/20 shadow-2xl mb-8 max-h-[60vh] overflow-y-auto">
            <div className="prose prose-lg prose-invert max-w-none text-gray-200 leading-relaxed space-y-4">
              <p>There are people who enter this world loud —<br/>
              fireworks, attention, all eyes.<br/>
              But then there are people like you —<br/>
              quiet, steady, soft…<br/>
              but the kind of soft that stays.<br/>
              The kind of soft that teaches people how to feel again.</p>

              <p>And idk ha, pero like,<br/>
              do you ever realize how rare that is?</p>

              <p>You're not the type to force your way into someone's life,<br/>
              but somehow, when people meet you —<br/>
              they remember.<br/>
              Not because you demanded space,<br/>
              but because being around you feels like breathing for the first time in a long while.</p>

              <p>And I hope you know,<br/>
              you don't have to be the strongest person in the room<br/>
              just to be loved.<br/>
              Like bro, you don't need to always have it together.<br/>
              Your existence alone? That's already something worth holding with two hands.</p>

              <p>'Cause real talk, Rei —<br/>
              even in moments when you feel like you're fading,<br/>
              you are still someone's light.</p>

              <p>You've carried so much, noh?<br/>
              Pero hindi halata.<br/>
              You walk like you're just vibing,<br/>
              pero inside you, there's an entire story of battles fought quietly,<br/>
              and hope that refused to give up.</p>

              <p>And honestly? That's beautiful.<br/>
              The world doesn't need louder people —<br/>
              it needs truer ones.<br/>
              And that's you. Always has been.</p>

              <p>So today, even if you don't post much,<br/>
              even if you downplay the celebration,<br/>
              I want you to know:<br/>
              you deserve to be seen,<br/>
              to be celebrated,<br/>
              and to be loved not just for what you do —<br/>
              but for who you are when no one's watching.</p>

              <p>You're not just getting older.<br/>
              You're growing deeper roots —<br/>
              and believe me, the world feels safer<br/>
              because people like you exist.</p>

              <p>Don't forget, ha?<br/>
              You're the kind of person the stars write poems about.</p>

              <p className="text-purple-300 font-medium">Stay soft. Stay real.<br/>
              And please — never apologize for feeling too much.<br/>
              That's your magic.</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => setLocation("/sanctuary")}
              size="lg"
              className="group bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              <span>Enter Your Writing Sanctuary</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
