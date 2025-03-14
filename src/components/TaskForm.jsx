import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/task/taskSlice";

export default function TaskForm() {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const trimmedText = taskText.trim();
      if (!trimmedText) return;

      dispatch(addTask(trimmedText));
      setTaskText("");
    },
    [dispatch, taskText]
  );

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          id="taskInput"
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-md border border-border bg-background focus:outline-hidden focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
          aria-label="Task input field"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          disabled={!taskText.trim()}
          aria-label="Add task button"
        >
          Add
        </button>
      </div>
    </form>
  );
}
