const priorityColors = {
  high: "bg-red-100 text-red-500",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

export default function Card({ task }) {
  const priorityKey = task.priority.toLowerCase();

  return (
    <div className="bg-white rounded-xl p-3.5 mb-3.5">
      <div className="flex justify-between mb-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${priorityColors[priorityKey] || ""}`}>
          {task.priority}
        </span>
        <span className="text-xs font-bold text-slate-400">{task.date}</span>
      </div>

      <h4 className="text-sm font-bold mb-2">{task.title}</h4>
      <p className="text-xs leading-normal text-slate-500">{task.desc}</p>
    </div>
  );
}