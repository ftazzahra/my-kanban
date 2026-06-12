import Card from "./Card.jsx";

export default function Column({ title, icon, tasks }) {
  return (
    <div className="bg-blue-50/70 rounded-2xl p-4 min-h-96">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold">{icon} {title}</h3>
        <button className="border-none bg-transparent text-2xl cursor-pointer outline-none">+</button>
      </div>

      {tasks.length > 0 ? (
        tasks.map((task) => <Card key={task.id} task={task} />)
      ) : (
        <p className="text-sm text-slate-400">Belum ada task.</p>
      )}
    </div>
  );
}