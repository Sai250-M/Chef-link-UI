import { Box, Card, CardContent, Typography, LinearProgress, Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";

export const ProfileCompletion = ({ pct, steps, editRoute }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight={700}>Profile Strength</Typography>
          <Typography variant="h5" fontWeight={800} color={pct >= 80 ? "success.main" : pct >= 50 ? "warning.main" : "error.main"}>
            {pct}%
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={pct}
          color={pct >= 80 ? "success" : pct >= 50 ? "warning" : "error"}
          sx={{ mb: 2.5 }}
        />

        <Typography variant="caption" color="text.secondary" mb={1.5} display="block">
          {pct < 100 ? "Complete your profile to get more opportunities" : "Your profile is complete!"}
        </Typography>

        <List dense disablePadding>
          {steps.map((step, i) => (
            <ListItem key={i} disablePadding sx={{ py: 0.25 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                {step.done
                  ? <CheckCircleIcon sx={{ fontSize: 18, color: "success.main" }} />
                  : <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: "text.disabled" }} />
                }
              </ListItemIcon>
              <ListItemText
                primary={step.label}
                slotProps={{
                  primary: {
                    variant: "caption",
                    color: step.done ? "text.secondary" : "text.primary",
                    sx: { fontWeight: step.done ? 400 : 500, textDecoration: step.done ? "line-through" : "none" },
                  }
                }}
              />
            </ListItem>
          ))}
        </List>

        {pct < 100 && (
          <Button variant="outlined" size="small" fullWidth sx={{ mt: 2 }} onClick={() => navigate(editRoute)}>
            Complete Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
