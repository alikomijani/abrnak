import { useSearchParams } from "@/hooks/useSearchParams";
import {
  TableContainer,
  TextField,
  Tooltip,
  IconButton,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  Button,
  MenuItem,
} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, lazy, useState } from "react";
import withSuspenseLoading from "@/components/withSuspenseLoading";
import TablePagination from "@/components/TablePagination";
import { TODO_DEFAULT_PARAMS } from "./constants";
import { todoStatusMutation, useGetTodoList } from "@/api/todos";
import CreateTodoModal from "./create-todo-modal";
import DeleteTodoButton from "./delete-button";
import UpdateTodoButton from "./update-button";

const PageError = withSuspenseLoading(
  lazy(() => import("@/components/PageError"))
);
export default function ToDoList() {
  const { params, setParams, debouncedParams } =
    useSearchParams(TODO_DEFAULT_PARAMS);
  const [open, setOpen] = useState(false);
  const { mutate: setStatus } = todoStatusMutation();
  const { data, error, isError } = useGetTodoList(debouncedParams);

  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      offset: 0,
    }));
  };
  const hasFilter = params.search || params.isComplete;
  const clearFilter = () => {
    setParams(TODO_DEFAULT_PARAMS);
  };
  if (isError) {
    return <PageError error={error} />;
  }
  return (
    <TableContainer
      sx={{
        border: ({ palette }) => `1px solid ${palette.divider}`,
        borderRadius: 1,
      }}
    >
      <CreateTodoModal
        mode="create"
        open={open}
        onClose={() => setOpen(false)}
      />
      <Stack direction="row" p={2} alignItems="center">
        <Stack direction="row" p={2} alignItems="center" flexGrow={1}>
          <Typography variant="h6">تراکنش ها</Typography>
          <TextField
            size="small"
            name="search"
            slotProps={{
              input: {
                startAdornment: <SearchIcon color="action" />,
              },
            }}
            placeholder="جست‌وجو"
            value={params.search}
            onChange={handleSearchParams}
            sx={{
              mx: 2,
              width: 300,
            }}
          />
          <TextField
            name="isComplete"
            select
            label="وضعیت"
            size="small"
            sx={{
              minWidth: 100,
            }}
            value={params.isComplete}
            onChange={handleSearchParams}
          >
            <MenuItem value={""}>مهم نیست</MenuItem>
            <MenuItem value={"false"}>ناتمام</MenuItem>
            <MenuItem value={"true"}>انجام شده</MenuItem>
          </TextField>
          {hasFilter && (
            <Tooltip title="پاک کردن فیلترها">
              <IconButton onClick={clearFilter}>
                <FilterAltOffIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        <Button onClick={() => setOpen(true)} variant="contained">
          ایجاد تسک جدید
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox disabled />
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                عنوان
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                توضیحات
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                وضعیت
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                عملیات
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.results?.map((todo) => (
            <TableRow key={todo._id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={todo.isComplete}
                  onChange={(e) =>
                    setStatus({ id: todo._id, isComplete: e.target.checked })
                  }
                />
              </TableCell>
              <TableCell>
                <Typography variant="body1">{todo.title}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="textSecondary">
                  {todo.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={todo.isComplete ? "success.main" : "error.main"}
                >
                  {todo.isComplete ? "Complete" : "Incomplete"}
                </Typography>
              </TableCell>
              <TableCell>
                <UpdateTodoButton todo={todo} />
                <DeleteTodoButton todo={todo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination count={data?.total} />
    </TableContainer>
  );
}
