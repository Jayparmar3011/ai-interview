export default function RecruiterDashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold">Candidates</h3>
        <p className="text-slate-400 mt-2">24 Active Interviews</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold">Interviews</h3>
        <p className="text-slate-400 mt-2">12 Completed Today</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold">Reports</h3>
        <p className="text-slate-400 mt-2">8 Pending Reviews</p>
      </div>
    </div>
  );
}
