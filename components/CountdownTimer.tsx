"use client";

import { useEffect, useState } from "react";
import { Sparkles, Flame } from "lucide-react";

interface CountdownTimerProps {
  targetDate: string; // Format: "YYYY-MM-DDTHH:mm:ss"
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      setIsExpired(false);
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  if (isExpired) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e0730] via-[#2d0a3e] to-[#1e0730] border border-amber-400/40 p-8 text-center shadow-2xl shadow-amber-500/20">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Celebration Time
          </div>
          <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-pink-400 bg-clip-text text-transparent">
            🎉 Already left for home!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#160524] border border-amber-500/30 p-6 md:p-8 shadow-2xl shadow-purple-950/60">
      {/* Top Festive Bunting Strip */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500" />

      {/* Ambient Festive Glows */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-56 h-56 bg-pink-600/15 rounded-full blur-3xl" />

      {/* Header Label */}
      <div className="relative z-10 flex items-center justify-center gap-2 mb-6">
        <Flame className="w-4 h-4 text-amber-400 fill-amber-400/80 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">
          Countdown for Advance Christmas
        </span>
        <Flame className="w-4 h-4 text-amber-400 fill-amber-400/80 animate-pulse" />
      </div>

      {/* Timer Tiles */}
      <div className="relative z-10 flex flex-wrap gap-3 sm:gap-5 justify-center items-center font-mono">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className="group relative flex flex-col items-center justify-center bg-gradient-to-b from-amber-500/15 via-purple-950/70 to-pink-600/10 border border-amber-400/30 backdrop-blur-md p-4 sm:p-5 rounded-2xl min-w-[82px] sm:min-w-[100px] shadow-lg shadow-amber-500/10 hover:-translate-y-1 hover:border-amber-300/60 transition duration-300"
          >
            {/* Subtle corner sparkle dots */}
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400/60 group-hover:bg-amber-300" />

            <span className="text-4xl sm:text-5xl font-black bg-gradient-to-b from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(251,191,36,0.25)]">
              {formatNumber(value)}
            </span>

            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-amber-200/75 mt-2">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}