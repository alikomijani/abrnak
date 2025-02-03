import { useSearchParams } from "@/hooks/useSearchParams";
import { TODO_DEFAULT_PARAMS } from "@/modules/todo/constants";
import { TablePagination as MuiTablePagination } from "@mui/material";
import { ChangeEvent } from "react";

type TablePaginationProps = {
  count?: number;
};
export default function TablePagination({ count = 0 }: TablePaginationProps) {
  const { params, setParams } = useSearchParams(TODO_DEFAULT_PARAMS);
  function handleChangePage(_: unknown, page: number) {
    setParams((prev) => ({ ...prev, offset: page * params.limit })); // mui use zero index page number
  }
  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    const limit = parseInt(e.target.value);
    setParams((prev) => ({ ...prev, offset: 0, limit }));
  };
  return (
    <MuiTablePagination
      rowsPerPageOptions={[10, 15, 20]}
      component="div"
      labelDisplayedRows={({ from, to, count }) =>
        `نمایش ${from} - ${to} از ${count}`
      }
      labelRowsPerPage="تعداد تراکنش در هر صفحه"
      count={count}
      rowsPerPage={+(params.limit || 10)}
      page={params.offset / params.limit} // mui use zero page number
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
