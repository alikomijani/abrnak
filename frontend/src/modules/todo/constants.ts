import type { ToDoParams } from "@/api/types";

const TODO_DEFAULT_PARAMS: ToDoParams = {
  limit: 10,
  offset: 0,
  search: "",
  isComplete: "",
};

export { TODO_DEFAULT_PARAMS };
