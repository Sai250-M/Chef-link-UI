import { Chip } from "@mui/material";
import { APPLICATION_STATUS_LABELS, JOB_STATUS_LABELS } from "../../constants";

export const StatusChip = ({ status, type = "application", size = "small" }) => {
  const map = type === "job" ? JOB_STATUS_LABELS : APPLICATION_STATUS_LABELS;
  const cfg = map[status] ?? { label: status, color: "default" };

  return <Chip label={cfg.label} color={cfg.color} size={size} sx={{ fontWeight: 600 }} />;
};
