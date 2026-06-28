import { Box, Pagination as MuiPagination } from "@mui/material";

export const EventPagination = ({ total, page, limit = 9, onChange }) => {
  const count = Math.ceil(total / limit);
  if (count <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <MuiPagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
        shape="rounded"
        size="large"
      />
    </Box>
  );
};
