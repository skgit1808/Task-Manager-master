import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { loadTasks, setFilter } from "./features/task/taskSlice";

export default function App() {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.tasks);
  const tasks = useSelector((state) => {
    const allTasks = state.tasks.tasks;

    if (state.tasks.filter === "active")
      return allTasks.filter((task) => !task.completed);
    if (state.tasks.filter === "completed")
      return allTasks.filter((task) => task.completed);
    return allTasks;
  });

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <ThemeSwitcher />
        </header>

        <TaskForm />

        <div className="flex gap-2 my-4">
          <button
            onClick={() => dispatch(setFilter("all"))}
            className={`px-3 py-1 rounded-md ${
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
            aria-pressed={filter === "all"}
          >
            All
          </button>
          <button
            onClick={() => dispatch(setFilter("active"))}
            className={`px-3 py-1 rounded-md ${
              filter === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
            aria-pressed={filter === "active"}
          >
            Active
          </button>
          <button
            onClick={() => dispatch(setFilter("completed"))}
            className={`px-3 py-1 rounded-md ${
              filter === "completed"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
            aria-pressed={filter === "completed"}
          >
            Completed
          </button>
        </div>

        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
