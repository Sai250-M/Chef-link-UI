import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import InboxIcon from "@mui/icons-material/Inbox";

export const EmptyState = ({
  title = "Nothing here yet",
  description,
  icon,
  action,
  variant = "empty",
}) => {
  const DefaultIcon = variant === "search" ? SearchOffIcon : InboxIcon;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={8}
      px={3}
      textAlign="center"
      gap={2}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.08,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", opacity: 1 / 0.08 }}>
          {icon ?? <DefaultIcon sx={{ fontSize: 36, color: "primary.main", opacity: 0.6 }} />}
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" color="text.primary" gutterBottom>{title}</Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" maxWidth={360}>{description}</Typography>
        )}
      </Box>
      {action && (
        <Button variant="contained" onClick={action.onClick}>{action.label}</Button>
      )}
    </Box>
  );
};
