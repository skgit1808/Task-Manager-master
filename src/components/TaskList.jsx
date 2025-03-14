import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div
      className="text-center py-8 text-muted-foreground"
      aria-live="polite"
      >
        No tasks found. Add some tasks to get started!
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
