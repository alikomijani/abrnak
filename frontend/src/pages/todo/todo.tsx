import { lazy } from "react";
import { Link } from "react-router";
import withSuspenseLoading from "@/components/withSuspenseLoading";
import useIsMobile from "@/hooks/useIsMobile";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
} from "@mui/material";

const TodoInfiniteView = withSuspenseLoading(
  lazy(() => import("@/modules/todo/TodoInfiniteView"))
);

const TodoTable = withSuspenseLoading(
  lazy(() => import("@/modules/todo/TodoTable"))
);
function Todos() {
  const isMobile = useIsMobile();
  return (
    <Box>
      <Box p={1} pt={0}>
        <Breadcrumbs>
          <MuiLink component={Link} underline="hover" color="inherit" to="/">
            داشبورد
          </MuiLink>
          <Typography sx={{ color: "text.primary" }}>تراکنش ها</Typography>
        </Breadcrumbs>
      </Box>
      <Card sx={{ border: "none", overflow: "unset" }} variant="outlined">
        <CardContent sx={{ p: { xs: 0, md: 2 } }}>
          {isMobile ? <TodoInfiniteView /> : <TodoTable />}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Todos;
