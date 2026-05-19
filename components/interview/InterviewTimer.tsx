"use client";

import { useEffect, useState } from "react";

export default function InterviewTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((p) => p + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="bg-white/5 p-4 rounded-xl">
      {mins}:{secs.toString().padStart(2, "0")}
    </div>
  );
}
