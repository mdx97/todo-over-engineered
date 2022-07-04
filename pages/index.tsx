import NiceModal from "@ebay/nice-modal-react";
import toast from "react-hot-toast";
import { Todo } from "@prisma/client";

import CreateTodoModal from "../components/CreateTodoModal";
import Page from "../components/Page";
import TodoItem from "../components/TodoItem";
import { trpc } from "../utils/trpc";

/** The home page of the site. */
export default function Home() {
  const todoList = trpc.useQuery(["todo.list"]);
  const todoDeleteOne = trpc.useMutation("todo.deleteOne");
  const todoSetCompleted = trpc.useMutation("todo.setCompleted");

  function openCreateTodoModal() {
    NiceModal.show<Todo>(CreateTodoModal)
      .then((todoItem) => {
        todoList.refetch();
        toast.success(`Successfully added new todo item! id#${todoItem.id}`);
      })
      .catch((err) =>
        toast.error(`Failed to add new todo item: ${err.message}`)
      );
  }

  // Callbacks passed to `TodoItem` instances.

  function onDelete(todoId: number) {
    todoDeleteOne.mutateAsync({ id: todoId }).then(() => todoList.refetch());
  }

  function onMark(todoId: number, completed: boolean) {
    todoSetCompleted.mutate({ id: todoId, completed });
  }

  return (
    <Page className="flex justify-center p-4">
      <div className="card flex flex-col items-stretch gap-4 p-4 w-96">
        {/* List of TODOs */}
        {todoList.data && (
          <ul className="flex flex-col gap-4">
            {todoList.data.map((todoItem) => (
              <li key={todoItem.id}>
                <TodoItem {...{ onDelete, onMark }} todo={todoItem} />
              </li>
            ))}
          </ul>
        )}

        {/* Create Todo Item Button */}
        <button className="button" onClick={() => openCreateTodoModal()}>
          Create Todo Item
        </button>
      </div>
    </Page>
  );
}
