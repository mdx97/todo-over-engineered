import { Todo } from "@prisma/client";
import { useState } from "react";

interface Props {
  todo: Todo;
  onDelete: (todoId: number) => void;
  onMark: (todoId: number, completed: boolean) => void;
}

/** TODO item component with a checkbox and delete button. */
function TodoItem({ todo, onDelete, onMark }: Props) {
  const [checked, setChecked] = useState(todo.completed);

  // To avoid extra round-trips, we just use our local state to track whether or not the item
  // is checked and do fire-and-forget writes to the database (well, we assume that is what
  // the caller is doing in `onMark`.)
  function onCheck(checked: boolean) {
    setChecked(checked);
    onMark(todo.id, checked);
  }

  return (
    <div className="flex items-center gap-2 card p-2">
      {/* Checkbox */}
      <input
        className="checkbox"
        type="checkbox"
        onChange={(e) => onCheck(e.target.checked)}
        checked={checked}
      />

      {/* Label */}
      <span className="flex-grow">{todo.label}</span>

      {/* Delete Button */}
      <button
        className="button button--rose button--compact"
        onClick={() => onDelete(todo.id)}
      >
        X
      </button>
    </div>
  );
}

export default TodoItem;
