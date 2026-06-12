import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Moon } from "lucide-react";
import Column from "./Column.jsx";

const columns = [
  { id: "backlog", title: "Backlog", icon: "▣" },
  { id: "todo", title: "To Do", icon: "☰" },
  { id: "progress", title: "On Progress", icon: "◷" },
  { id: "accepted", title: "Accepted", icon: "✓" },
];

const initialTasks = [
  { id: 1, status: "backlog", priority: "High", date: "6 Juni 2025", title: "Riset kebutuhan pengguna", desc: "Mengumpulkan kebutuhan utama pengguna sebelum fitur dikembangkan." },
  { id: 2, status: "backlog", priority: "Medium", date: "6 Juni 2025", title: "Menyusun backlog fitur", desc: "Membuat daftar fitur utama yang akan dikerjakan." },
  { id: 3, status: "todo", priority: "High", date: "7 Juni 2025", title: "Membuat desain dashboard", desc: "Mendesain tampilan dashboard desktop dan mobile." },
  { id: 4, status: "todo", priority: "Low", date: "7 Juni 2025", title: "Dokumentasi project", desc: "Menuliskan dokumentasi awal aplikasi." },
  { id: 5, status: "progress", priority: "High", date: "8 Juni 2025", title: "Implementasi filter task", desc: "Menerapkan filter status, prioritas, dan pencarian task." },
  { id: 6, status: "progress", priority: "Medium", date: "8 Juni 2025", title: "Responsive mobile", desc: "Menyesuaikan tampilan untuk layar kecil." },
  { id: 7, status: "accepted", priority: "Medium", date: "9 Juni 2025", title: "Setup project Vite", desc: "Project React berhasil dibuat menggunakan Vite." },
  { id: 8, status: "accepted", priority: "Low", date: "9 Juni 2025", title: "Membuat komponen Card", desc: "Komponen Card sudah reusable." },
];

export default function Board() {
  const [activeStatus, setActiveStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    return initialTasks.filter((task) => {
      const matchStatus = activeStatus === "all" || task.status === activeStatus;
      const matchPriority =
        priorityFilter === "all" || task.priority.toLowerCase() === priorityFilter;

      const keyword = search.toLowerCase();
      const matchSearch =
        task.title.toLowerCase().includes(keyword) ||
        task.desc.toLowerCase().includes(keyword) ||
        task.priority.toLowerCase().includes(keyword);

      return matchStatus && matchPriority && matchSearch;
    });
  }, [activeStatus, search, priorityFilter]);

  const visibleColumns =
    activeStatus === "all"
      ? columns
      : columns.filter((column) => column.id === activeStatus);

  return (
    <div className="page">
      <header className="navbar">
        <div className="brand">
          <Moon size={18} />
          <span>INDIGO</span>
        </div>

        <nav className="nav-links">
          <a>Project</a>
          <a>People</a>
          <a>Setting</a>
        </nav>
      </header>

      <main className="content">
        <section className="toolbar">
          <select className="project-select">
            <option>BudJet</option>
          </select>

          <div className="tabs">
            <button
              className={activeStatus === "all" ? "tab active" : "tab"}
              onClick={() => setActiveStatus("all")}
            >
              All
            </button>

            {columns.map((column) => (
              <button
                key={column.id}
                className={activeStatus === column.id ? "tab active" : "tab"}
                onClick={() => setActiveStatus(column.id)}
              >
                {column.icon} {column.title}
              </button>
            ))}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search size={18} />
          </div>

          <div className="priority-filter">
            <SlidersHorizontal size={15} />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </section>

        <section className={`board ${activeStatus !== "all" ? "single-column" : ""}`}>
          {visibleColumns.map((column) => (
            <Column
              key={column.id}
              title={column.title}
              icon={column.icon}
              tasks={filteredTasks.filter((task) => task.status === column.id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}