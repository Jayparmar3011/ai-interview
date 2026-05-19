"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  "Tell me about yourself.",
  "Explain React hooks.",
  "What is TypeScript?",
  "How do you optimize performance in Next.js?",
];

export default function InterviewPage() {
  const router = useRouter();
  const recognitionRef = useRef<any>(null);

  const [current, setCurrent] = useState(0);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(78);

  // timer
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // fake confidence (your existing logic kept)
  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => {
      setConfidence((c) => Math.min(100, c + 1));
    }, 3000);

    return () => clearInterval(t);
  }, [recording]);

  // 🎤 REAL MIC FUNCTION
  const startMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text); // ✅ MIC TEXT
    };

    recognition.onerror = () => {
      setRecording(false);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopMic = () => {
    recognitionRef.current?.stop();
    setRecording(false);
  };

  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTranscript("");
      setRecording(false);
      stopMic();
    } else {
      router.push("/coding");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-cyan-500/20 mx-auto mb-4 animate-pulse" />
            <p>AI Interviewer</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4">
            <p>Confidence Score</p>
            <p className="text-cyan-400 text-2xl">{confidence}%</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/5 rounded-2xl p-4 flex justify-between">
            <span>
              Question {current + 1} of {questions.length}
            </span>
            <span>
              {mins}:{secs}
            </span>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-semibold">{questions[current]}</h2>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 text-center">
            <p>Candidate Video Preview</p>
            {recording && (
              <p className="text-red-400 animate-pulse">Recording...</p>
            )}
          </div>

          {recording && (
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex gap-1 h-8 items-end">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-cyan-400 rounded"
                    style={{ height: `${10 + ((i * 7) % 20)}px` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/5 rounded-2xl p-4 min-h-[120px]">
            <p className="text-slate-400">Transcript</p>
            <p className="text-sm mt-2">
              {transcript || "Waiting for response..."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setRecording(true);
                startMic(); // 🎤 START MIC
              }}
              className="px-4 py-2 bg-green-500 rounded"
            >
              Start Answer
            </button>

            <button
              onClick={() => {
                stopMic(); // 🎤 STOP MIC
              }}
              className="px-4 py-2 bg-blue-500 rounded"
            >
              Submit Answer
            </button>

            <button
              onClick={nextQuestion}
              className="px-4 py-2 bg-yellow-500 rounded"
            >
              Skip / Next
            </button>

            <button
              onClick={() => {
                stopMic();
                router.push("/summary");
              }}
              className="px-4 py-2 bg-red-500 rounded"
            >
              End Interview
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
