import { Skeleton, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface LabelValueDisplayProps {
  label: string;
  value: ReactNode | undefined;
  isLoading?: boolean;
  pleaseHolder?: ReactNode;
}
const LabelValueDisplay = ({
  label,
  value,
  isLoading = false,
  pleaseHolder = "-",
}: LabelValueDisplayProps) => (
  <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
    <Typography
      variant="body2"
      sx={{
        color: (theme) => theme.palette.text.secondary,
      }}
    >
      {label}
    </Typography>
    {isLoading ? (
      <Skeleton width={50} />
    ) : (
      <Typography component={"div"} variant="body2">
        {value ?? pleaseHolder}
      </Typography>
    )}
  </Stack>
);
export default LabelValueDisplay;
