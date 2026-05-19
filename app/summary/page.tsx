"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Candidate {
  name: string;
  email: string;
  role: string;
}

export default function SummaryPage() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("candidate");

    if (stored) {
      setCandidate(JSON.parse(stored));
    }
  }, []);

  const handleDownloadReport = () => {
    alert("Interview report download started.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center">
          <h1 className="text-3xl font-bold text-green-400">
            Interview Completed
          </h1>
          <p className="text-slate-300 mt-2">
            Your interview has been submitted successfully.
          </p>
        </div>

        {/* Candidate Info */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Candidate Profile</h2>

          <div className="space-y-2 text-slate-300">
            <p>
              <span className="text-white font-medium">Name:</span>{" "}
              {candidate?.name || "Candidate"}
            </p>

            <p>
              <span className="text-white font-medium">Email:</span>{" "}
              {candidate?.email || "-"}
            </p>

            <p>
              <span className="text-white font-medium">Role:</span>{" "}
              {candidate?.role || "-"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-slate-400 text-sm">Questions Attempted</p>
            <p className="text-3xl font-bold text-cyan-400">9 / 10</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-slate-400 text-sm">Time Taken</p>
            <p className="text-3xl font-bold text-cyan-400">24 min</p>
          </div>
        </div>

        {/* AI Evaluation */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">AI Evaluation</h2>

          <p className="text-slate-300">
            Strong technical understanding with clear communication skills. Good
            confidence and problem-solving ability demonstrated during
            interview.
          </p>
        </div>

        {/* Strengths */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-green-400 mb-3">
            Strengths
          </h2>

          <ul className="space-y-2 text-slate-300 list-disc pl-5">
            <li>Strong React fundamentals</li>
            <li>Good problem solving</li>
            <li>Clear verbal communication</li>
            <li>Confident presentation</li>
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">
            Areas for Improvement
          </h2>

          <ul className="space-y-2 text-slate-300 list-disc pl-5">
            <li>System design depth</li>
            <li>Advanced TypeScript concepts</li>
            <li>Performance optimization examples</li>
          </ul>
        </div>

        {/* Final Status */}
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
          <p className="text-blue-300 font-semibold">Submitted for Review</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleDownloadReport}
            className="px-6 py-3 bg-cyan-500 rounded-xl font-medium"
          >
            Download Report
          </button>

          <Link href="/">
            <button className="px-6 py-3 bg-slate-700 rounded-xl">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
