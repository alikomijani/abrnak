import { Skeleton, TableCell, TableRow } from "@mui/material";

type TableLoadingProps = {
  rows: number;
  cells: number;
};
export const TableLoading = ({ rows, cells }: TableLoadingProps) => {
  return (
    <>
      {new Array(rows).fill(0).map((_, i) => (
        <TableRow key={i}>
          {new Array(cells).fill(0).map((_, j) => (
            <TableCell key={`${i}-${j}`}>
              <Skeleton height={30} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
