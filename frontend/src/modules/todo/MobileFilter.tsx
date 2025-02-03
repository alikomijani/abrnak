import {
  Box,
  Collapse,
  FormLabel,
  Grid2,
  MenuItem,
  Paper,
  SvgIcon,
  TextField,
} from "@mui/material";
import { TODO_DEFAULT_PARAMS } from "./constants";
import { useSearchParams } from "@/hooks/useSearchParams";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
const MobileFilter = () => {
  const [checked, setChecked] = useState(false);
  const handleCollapse = () => {
    setChecked((prev) => !prev);
  };

  const { params, setParams } = useSearchParams(TODO_DEFAULT_PARAMS);
  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      offset: 0,
    }));
  };
  return (
    <Box
      component={Paper}
      variant="outlined"
      border="none"
      position="sticky"
      top="56px"
      zIndex={10}
    >
      <Box display="flex" alignItems="center" gap={1} p={1}>
        <FormLabel
          onClick={handleCollapse}
          sx={{
            cursor: "pointer",
          }}
        >
          <SvgIcon>
            <FilterAltIcon />
          </SvgIcon>
        </FormLabel>
        فیلترها
      </Box>

      <Collapse in={checked}>
        <Grid2 container spacing={1} my={1}>
          <Grid2 size={12}>
            <TextField
              name="search"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: <SearchIcon color="action" />,
                },
              }}
              placeholder="جست‌وجو"
              value={params.search}
              onChange={handleSearchParams}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              name="isComplete"
              fullWidth
              select
              placeholder="وضعیت"
              value={params.isComplete}
              onChange={handleSearchParams}
            >
              <MenuItem value={""}>مهم نیست</MenuItem>
              <MenuItem value={"false"}>ناتمام</MenuItem>
              <MenuItem value={"true"}>انجام شده</MenuItem>
            </TextField>
          </Grid2>
        </Grid2>
      </Collapse>
    </Box>
  );
};
export default MobileFilter;
