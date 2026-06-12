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
    <div className="min-h-screen bg-white text-indigo-950 font-sans">
      <header className="h-16 px-16 max-md:px-5 bg-blue-50 flex items-center justify-between">
        <div className="flex items-center gap-7 font-bold">
          <Moon size={18} />
          <span>INDIGO</span>
        </div>

        <nav className="flex items-center gap-7 font-bold">
          <a className="cursor-pointer">Project</a>
          <a className="cursor-pointer">People</a>
          <a className="cursor-pointer">Setting</a>
        </nav>
      </header>

      <main className="py-8 px-16 max-md:px-5">
        <section className="flex flex-wrap items-center gap-3 mb-6">
          <select className="w-40 h-10 px-4 border-none rounded-full bg-indigo-50/50 text-indigo-900 font-bold outline-none cursor-pointer">
            <option>BudJet</option>
          </select>

          <div className="flex gap-2 max-md:overflow-x-auto">
            <button
              className={`h-10 px-4 border-none rounded-full font-bold cursor-pointer outline-none whitespace-nowrap ${
                activeStatus === "all"
                  ? "bg-indigo-950 text-white"
                  : "bg-indigo-50/50 text-indigo-900"
              }`}
              onClick={() => setActiveStatus("all")}
            >
              All
            </button>

            {columns.map((column) => (
              <button
                key={column.id}
                className={`h-10 px-4 border-none rounded-full font-bold cursor-pointer outline-none whitespace-nowrap ${
                  activeStatus === column.id
                    ? "bg-indigo-950 text-white"
                    : "bg-indigo-50/50 text-indigo-900"
                }`}
                onClick={() => setActiveStatus(column.id)}
              >
                {column.icon} {column.title}
              </button>
            ))}
          </div>

          <div className="flex-1 h-10 px-3 flex items-center border-none rounded-full bg-indigo-50/50 text-indigo-900 font-bold">
            <input
              type="text"
              placeholder="Search task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-none outline-none bg-transparent text-indigo-900 font-bold placeholder-indigo-900/50"
            />
            <Search size={18} className="text-indigo-900" />
          </div>

          <div className="w-40 h-10 px-3 flex items-center border-none rounded-full bg-indigo-50/50 text-indigo-900 font-bold gap-2">
            <SlidersHorizontal size={15} className="text-indigo-900 shrink-0" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full border-none outline-none bg-transparent text-indigo-900 font-bold cursor-pointer"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </section>

        <section
          className={`grid gap-4 max-md:grid-cols-1 ${
            activeStatus !== "all" ? "grid-cols-1 max-w-sm" : "grid-cols-4"
          }`}
        >
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