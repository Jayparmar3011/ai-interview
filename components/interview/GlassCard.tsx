export default function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      {children}
    </div>
  );
}
