import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  toggleComplete,
  startEditing,
  updateTask,
  cancelEditing,
} from "../features/task/taskSlice";

export default function TaskItem({ task }) {
  const [taskText, setTaskText] = useState(task.text);
  const dispatch = useDispatch();
  const { editingTask } = useSelector((state) => state.tasks);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedText = taskText.trim();
    if (!trimmedText) return;

    dispatch(updateTask(trimmedText));
  };

  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return editingTask && editingTask.id === task.id ? (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          id={task.id}
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md border border-border bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
          aria-label="Edit task input"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          aria-label="Update task"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => dispatch(cancelEditing())}
          className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
          aria-label="Cancel editing"
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <li className="p-4 bg-card text-card-foreground rounded-lg shadow-xs border border-border">
      <div className="flex items-start gap-3">
        <input
          id={task.id}
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleComplete(task.id))}
          className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
          aria-label="Toggle task completion"
        />
        <div className="flex-1 min-w-0">
          <p
            className={`text-base break-words ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.text}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{formattedDate}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(startEditing(task))}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
            aria-label="Edit task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
              <path d="m15 5 4 4"></path>
            </svg>
          </button>
          <button
            onClick={() => dispatch(deleteTask(task.id))}
            className="p-1.5 text-muted-foreground hover:text-destructive rounded-md hover:bg-muted transition-colors"
            aria-label="Delete task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
