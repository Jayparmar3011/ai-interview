"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CandidatePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const canContinue = name && email && role;

  const handleContinue = () => {
    localStorage.setItem(
      "candidate",
      JSON.stringify({ name, email, role, skills }),
    );
    router.push("/setup");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
        <h1 className="text-3xl font-bold">Candidate Details</h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-3 bg-slate-900 rounded"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 bg-slate-900 rounded"
        />
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role Applied For"
          className="w-full p-3 bg-slate-900 rounded"
        />

        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={addSkill}
          placeholder="Skills / Technologies (press Enter)"
          className="w-full p-3 bg-slate-900 rounded"
        />

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300"
            >
              {skill}
            </span>
          ))}
        </div>
        <button
          disabled={!canContinue}
          onClick={handleContinue}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
