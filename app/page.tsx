import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-2xl font-bold">
            AI
          </div>
          <h1 className="text-5xl font-bold">AI Interview Platform</h1>
          <p className="text-slate-400 text-lg">
            Experience a premium AI-powered interview simulation with coding
            challenges and instant evaluation.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-3">
          <h2 className="text-xl font-semibold">Instructions</h2>
          <ul className="list-disc pl-5 text-slate-300 space-y-1">
            <li>Ensure camera and microphone access.</li>
            <li>Complete all interview questions.</li>
            <li>Technical coding round follows interview.</li>
          </ul>
          <p className="text-cyan-400">Estimated duration: 25–30 minutes</p>
        </div>

        <Link href="/candidate">
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition">
            Start Interview
          </button>
        </Link>
      </div>
    </main>
  );
}
