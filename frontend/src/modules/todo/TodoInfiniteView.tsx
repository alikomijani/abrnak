import { useInfiniteTodoList } from "@/api/todos";
import { useSearchParams } from "@/hooks/useSearchParams";
import { TODO_DEFAULT_PARAMS } from "./constants";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid2,
  Typography,
} from "@mui/material";
import FetchNextPage from "@/components/FetchNextPage";
import MobileFilter from "./MobileFilter";
import NotFou from "@assets/404-error.jpg";
import withSuspenseLoading from "@/components/withSuspenseLoading";
import { lazy } from "react";
import TodoCard from "@/pages/todo/TodoCard";

const PageError = withSuspenseLoading(
  lazy(() => import("@/components/PageError"))
);

export default function TodoInfiniteView() {
  const { debouncedParams, setParams } = useSearchParams(TODO_DEFAULT_PARAMS);
  const { data, hasNextPage, fetchNextPage, isLoading, error, isError } =
    useInfiniteTodoList(debouncedParams);
  if (isError) {
    return <PageError error={error} />;
  }
  return (
    <Box>
      <MobileFilter />
      <Grid2 spacing={1} container>
        {data?.pages[0].total === 0 && (
          <Grid2 size={12} textAlign="center">
            <Card variant="outlined">
              <CardContent>
                <img src={NotFou} width={"100%"} />
                <Typography gutterBottom>
                  با فیلترهای موجود داده ای یافت نشد!
                </Typography>
                <Button onClick={() => setParams(TODO_DEFAULT_PARAMS)}>
                  پاک کردن فیلترها
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        )}
        {data?.pages.map((page) =>
          page.results.map((todo) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={todo._id}>
              <TodoCard todo={todo} />
            </Grid2>
          ))
        )}
        <Grid2 size={12}>
          <FetchNextPage
            hasNextPage={hasNextPage || isLoading}
            fetch={fetchNextPage}
          >
            <CircularProgress size={24} />
          </FetchNextPage>
        </Grid2>
      </Grid2>
    </Box>
  );
}
