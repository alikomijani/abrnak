import { AxiosError, AxiosRequestConfig } from "axios";
import api from "./base";
import { PaginatedServerApi, Todo, ToDoParams } from "./types";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const TODO_QUERY_KEY = "TO_DO_QUERY";
async function getTodoList(config?: AxiosRequestConfig) {
  const res = await api.get<PaginatedServerApi<Todo>>("todo", config);
  return res.data;
}

async function getToDoById(id: string, config?: AxiosRequestConfig) {
  const res = await api.get<Todo>("todo/" + id, config);
  return res.data;
}

async function deleteById(id: string, config?: AxiosRequestConfig) {
  const res = await api.delete("todo/" + id, config);
  return res.data;
}
export interface TodoData {
  title: string;
  description: string;
  subTasks: Array<{ title: string }>; // Match form input structure
}
export async function createToDo(data: TodoData) {
  const res = await api.post<Todo>("todo/", data);
  return res.data;
}

export async function updateToDo(id: string, data: TodoData) {
  const res = await api.put<Todo>(`todo/${id}`, data);
  return res.data;
}

export async function changeToDoStatus(
  id: string,
  data: { isComplete: boolean }
) {
  const res = await api.put<Todo>(`todo/${id}/update-status`, data);
  return res.data;
}
export function todoStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; isComplete: boolean }) =>
      changeToDoStatus(variables.id, { isComplete: variables.isComplete }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });

      // Update individual item cache
      queryClient.setQueryData([TODO_QUERY_KEY, data._id], data);
    },
  });
}

// React Query mutation for create/update
export function createOrUpdateMutation(mode: "create" | "edit") {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id?: string; data: TodoData }) =>
      mode === "create"
        ? createToDo(variables.data)
        : updateToDo(variables.id!, variables.data),
    onSuccess: (data, variables) => {
      queryClient.cancelQueries({ queryKey: [TODO_QUERY_KEY] });

      // Update infinite queries
      queryClient.setQueriesData<InfiniteData<PaginatedServerApi<Todo>>>(
        { queryKey: [TODO_QUERY_KEY, "infinity"] },
        (old) => updateInfiniteQuery(old, data, variables)
      );

      // Update paginated queries
      queryClient.setQueriesData<PaginatedServerApi<Todo>>(
        { queryKey: [TODO_QUERY_KEY, "paginated"] },
        (old) => updatePaginatedQuery(old, data, variables)
      );

      // Update individual item cache
      queryClient.setQueryData([TODO_QUERY_KEY, data._id], data);
    },
  });
}

// Helper functions
const updateInfiniteQuery = (
  oldData: InfiniteData<PaginatedServerApi<Todo>> | undefined,
  newItem: Todo,
  variables: { id?: string }
) => {
  if (!oldData) return oldData;

  return {
    ...oldData,
    pages: oldData.pages.map((page) => ({
      ...page,
      results: variables.id
        ? page.results.map((item) =>
            item._id === variables.id ? newItem : item
          )
        : [newItem, ...page.results],
    })),
  };
};

const updatePaginatedQuery = (
  oldData: PaginatedServerApi<Todo> | undefined,
  newItem: Todo,
  variables: { id?: string }
) => {
  if (!oldData) return oldData;
  return {
    ...oldData,
    results: variables.id
      ? oldData.results.map((item) =>
          item._id === variables.id ? newItem : item
        )
      : [newItem, ...oldData.results],
  };
};
export function deleteTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteById,
    onSuccess: (_, variable) => {
      queryClient.cancelQueries({ queryKey: [TODO_QUERY_KEY] }); // cancel request to prevent conflict
      queryClient.setQueriesData<
        // update infinity queries
        InfiniteData<PaginatedServerApi<Todo>, ToDoParams> | undefined
      >({ queryKey: [TODO_QUERY_KEY, "infinity"] }, (existingData) => {
        if (!existingData) {
          return existingData;
        }
        return {
          ...existingData,
          pages: existingData.pages.map((page) => ({
            ...page,
            results: page.results.filter((item) => item._id !== variable),
          })),
        };
      });
      // update desktop list
      queryClient.setQueriesData<PaginatedServerApi<Todo> | undefined>(
        { queryKey: [TODO_QUERY_KEY, "paginated"] },
        (existingData) => {
          if (!existingData) {
            return existingData;
          }
          return {
            ...existingData,
            results: existingData.results.filter(
              (item) => item._id !== variable
            ),
          };
        }
      );
    },
  });
}
export function useGetTodoById(id: string) {
  return useQuery<Todo, AxiosError>({
    queryKey: [TODO_QUERY_KEY, id],
    queryFn: () => getToDoById(id),
  });
}

export function useGetTodoList(params: ToDoParams) {
  return useQuery<PaginatedServerApi<Todo>, AxiosError>({
    queryKey: [TODO_QUERY_KEY, "paginated", params],
    queryFn: () => getTodoList({ params }),
  });
}

export function useInfiniteTodoList(params: ToDoParams) {
  return useInfiniteQuery<PaginatedServerApi<Todo>, AxiosError>({
    queryKey: [TODO_QUERY_KEY, "infinity", params],
    queryFn: ({ pageParam }) => getTodoList({ params: pageParam }),
    initialPageParam: {
      ...params,
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.total <= lastPage.offset + lastPage.limit) {
        return undefined;
      }
      return {
        ...params,
        offset: lastPage.offset + lastPage.limit,
      };
    },
  });
}
