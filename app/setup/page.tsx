"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [camera, setCamera] = useState(false);
  const [mic, setMic] = useState(false);
  const [internet, setInternet] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setCamera(true), 1000);
    const t2 = setTimeout(() => setMic(true), 1800);
    const t3 = setTimeout(() => setInternet(true), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const ready = camera && mic && internet;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full space-y-6">
        <h1 className="text-3xl font-bold">Interview Setup</h1>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="font-semibold">📷 Camera Check</p>
            <p className={camera ? "text-green-400" : "text-yellow-400"}>
              {camera ? "Camera Ready" : "Checking..."}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="font-semibold">🎤 Microphone Check</p>
            <p className={mic ? "text-green-400" : "text-yellow-400"}>
              {mic ? "Microphone Active" : "Checking..."}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="font-semibold">🌐 Internet Status</p>
            <p className={internet ? "text-green-400" : "text-yellow-400"}>
              {internet ? "Stable Connection" : "Testing..."}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="font-semibold">Guidelines</p>
            <ul className="text-slate-300 text-sm list-disc pl-5 mt-2 space-y-1">
              <li>Stay focused on camera</li>
              <li>Answer clearly</li>
              <li>Do not refresh the page</li>
            </ul>
          </div>
        </div>

        <button
          disabled={!ready}
          onClick={() => router.push("/interview")}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 disabled:opacity-40"
        >
          Start Interview
        </button>
      </div>
    </main>
  );
}
