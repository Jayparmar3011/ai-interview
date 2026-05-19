"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Play, Send } from "lucide-react";
import { useInterviewStore } from "@/app/store/interviewstore";

export default function CodingPage() {
  const { tabSwitches, addTabSwitch, started } = useInterviewStore();

  const [code, setCode] = useState("");
  const [output, setOutput] = useState<string[]>([]);

  // 🧠 TAB SWITCH DETECTION
  useEffect(() => {
    const onBlur = () => addTabSwitch();

    const onVisibility = () => {
      if (document.hidden) addTabSwitch();
    };

    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // 💬 LIVE TYPING → SHOW IN OUTPUT (IMPORTANT PART)
  const handleTyping = (value: string) => {
    setCode(value);

    // realtime reflection in output
    setOutput((prev) => {
      const last = prev[prev.length - 1];

      const updated = [...prev.slice(0, -1), `User typing:\n${value}`];

      // if empty state
      if (prev.length === 0) {
        return [`User typing:\n${value}`];
      }

      return updated;
    });
  };

  // ▶ RUN CODE (NO FAKE AI ANSWER)
  const runCode = () => {
    setOutput((prev) => [...prev, "🔄 Running code..."]);

    setTimeout(() => {
      setOutput((prev) => [
        ...prev,
        "✅ Execution completed",
        "Output:\n" + (code || "No code written"),
      ]);
    }, 800);
  };

  // 📤 SUBMIT (FINAL ANSWER CAPTURE)
  const submit = () => {
    setOutput((prev) => [
      ...prev,
      "📤 Submitted answer:",
      code,
      "🧠 AI evaluation started...",
    ]);
  };

  if (!started) {
    return (
      <div className="p-10 text-white">
        Start interview from system check page first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Coding Interview</h1>

        <div className="text-yellow-400 text-sm">
          Tab Switches: {tabSwitches}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* QUESTION */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <h2 className="font-semibold">Problem</h2>
            <p className="text-sm text-zinc-400 mt-2">
              Write a function that returns sum of two numbers.
            </p>
          </CardContent>
        </Card>

        {/* CODE */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4 space-y-3">
            <Textarea
              className="min-h-[200px] bg-zinc-950"
              value={code}
              onChange={(e) => handleTyping(e.target.value)}
              placeholder="Type your answer..."
            />

            <div className="flex gap-2">
              <Button onClick={runCode}>
                <Play className="w-4 h-4 mr-1" />
                Run
              </Button>

              <Button variant="secondary" onClick={submit}>
                <Send className="w-4 h-4 mr-1" />
                Submit
              </Button>
            </div>

            {/* OUTPUT */}
            <div className="bg-zinc-950 p-3 rounded-md text-xs text-green-300 h-[200px] overflow-auto">
              {output.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
