export default function Card({ task }) {
  return (
    <div className="card">
      <div className="card-top">
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        <span className="date">{task.date}</span>
      </div>

      <h4>{task.title}</h4>
      <p>{task.desc}</p>
    </div>
  );
}