import Card from "./Card.jsx";

export default function Column({ title, icon, tasks }) {
  return (
    <div className="column">
      <div className="column-header">
        <h3>{icon} {title}</h3>
        <button className="add-btn">+</button>
      </div>

      {tasks.length > 0 ? (
        tasks.map((task) => <Card key={task.id} task={task} />)
      ) : (
        <p className="empty">Belum ada task.</p>
      )}
    </div>
  );
}