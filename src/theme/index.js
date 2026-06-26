import { createTheme, alpha } from "@mui/material/styles";

export const BRAND = {
  orange: "#E07B39",
  orangeDark: "#B8611F",
  orangeLight: "#F5A878",
  orangeSoft: "#FEF3EC",
  gold: "#F4C542",
  goldDark: "#D4A017",
  navy: "#0F172A",
  navyLight: "#1E293B",
  navyMid: "#334155",
  slate: "#64748B",
  slateLight: "#94A3B8",
  slateSoft: "#CBD5E1",
  surface: "#F8FAFC",
  white: "#FFFFFF",
  // Glassmorphism
  glass: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.12)",
  glassDark: "rgba(15,23,42,0.7)",
};

// Reusable gradient/glassmorphism helpers (use as sx prop values)
export const glass = (opacity = 0.06) => ({
  background: `rgba(255,255,255,${opacity})`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: `1px solid rgba(255,255,255,${opacity * 2})`,
});

export const glassDark = (opacity = 0.5) => ({
  background: `rgba(15,23,42,${opacity})`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
});

export const gradientText = {
  background: `linear-gradient(135deg, ${BRAND.orange} 0%, ${BRAND.gold} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export const premiumGradient = `linear-gradient(135deg, ${BRAND.orange} 0%, ${BRAND.orangeDark} 50%, #8B3A0F 100%)`;
export const darkHeroGradient = `linear-gradient(160deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)`;
export const darkCardGradient = `linear-gradient(145deg, #1E293B 0%, #0F172A 100%)`;

export const theme = createTheme({
  palette: {
    primary: {
      main: BRAND.orange,
      dark: BRAND.orangeDark,
      light: BRAND.orangeLight,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: BRAND.navy,
      dark: "#080F1D",
      light: BRAND.navyLight,
      contrastText: "#FFFFFF",
    },
    neutral: {
      main: BRAND.slate,
      dark: BRAND.navy,
      light: BRAND.slateLight,
      contrastText: "#FFFFFF",
    },
    gold: {
      main: BRAND.gold,
      dark: BRAND.goldDark,
      light: "#FAE29A",
      contrastText: BRAND.navy,
    },
    background: {
      default: BRAND.surface,
      paper: BRAND.white,
    },
    text: {
      primary: BRAND.navy,
      secondary: BRAND.slate,
    },
    success: { main: "#10B981", light: "#D1FAE5", dark: "#059669", contrastText: "#fff" },
    warning: { main: "#F59E0B", light: "#FEF3C7", dark: "#D97706", contrastText: "#fff" },
    error: { main: "#EF4444", light: "#FEE2E2", dark: "#DC2626", contrastText: "#fff" },
    info: { main: "#3B82F6", light: "#DBEAFE", dark: "#2563EB", contrastText: "#fff" },
    divider: "#E2E8F0",
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
    h1: { fontSize: "clamp(2.25rem, 5.5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em" },
    h2: { fontSize: "clamp(1.875rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" },
    h3: { fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em" },
    h4: { fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 600, lineHeight: 1.3 },
    h5: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.35 },
    h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: "1rem", lineHeight: 1.75, color: BRAND.navy },
    body2: { fontSize: "0.875rem", lineHeight: 1.65, color: BRAND.slate },
    subtitle1: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.5 },
    caption: { fontSize: "0.75rem", lineHeight: 1.5, color: BRAND.slate },
    button: { fontWeight: 600, letterSpacing: "0.02em", textTransform: "none" },
    overline: { fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" },
  },
  shape: { borderRadius: 14 },
  spacing: 8,
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    "0 4px 8px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
    "0 10px 20px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)",
    "0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)",
    "0 30px 60px rgba(0,0,0,0.14)",
    // Premium glow shadows (index 6-10)
    `0 8px 32px rgba(224,123,57,0.3)`,
    `0 16px 48px rgba(224,123,57,0.4)`,
    `0 8px 32px rgba(244,197,66,0.25)`,
    `0 8px 32px rgba(59,130,246,0.3)`,
    `0 8px 32px rgba(16,185,129,0.3)`,
    ...Array(14).fill("none"),
  ],
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          fontSize: "0.9375rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        },
        contained: {
          background: premiumGradient,
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 32px rgba(224,123,57,0.45)",
            background: premiumGradient,
          },
          "&:active": { transform: "translateY(0)" },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": { borderWidth: "1.5px", backgroundColor: alpha(BRAND.orange, 0.07) },
        },
        text: {
          "&:hover": { backgroundColor: alpha(BRAND.orange, 0.07) },
        },
        sizeLarge: { padding: "14px 36px", fontSize: "1.0625rem", borderRadius: 14 },
        sizeSmall: { padding: "6px 16px", fontSize: "0.8125rem", borderRadius: 10 },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid #E2E8F0",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          "&:hover": {
            boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
            borderColor: "#CBD5E1",
            transform: "translateY(-3px)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: BRAND.white,
            transition: "all 0.2s ease",
            "& fieldset": { borderColor: "#E2E8F0", borderWidth: "1.5px" },
            "&:hover fieldset": { borderColor: "#CBD5E1" },
            "&.Mui-focused fieldset": { borderColor: BRAND.orange, borderWidth: "2px" },
            "&.Mui-focused": { boxShadow: `0 0 0 3px ${alpha(BRAND.orange, 0.12)}` },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          "& fieldset": { borderColor: "#E2E8F0", borderWidth: "1.5px" },
          "&:hover fieldset": { borderColor: "#CBD5E1" },
          "&.Mui-focused fieldset": { borderColor: BRAND.orange, borderWidth: "2px" },
          "&.Mui-focused": { boxShadow: `0 0 0 3px ${alpha(BRAND.orange, 0.12)}` },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: "0.8125rem", borderRadius: 8 },
        filled: { "&.MuiChip-colorPrimary": { backgroundColor: alpha(BRAND.orange, 0.12), color: BRAND.orangeDark } },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { backgroundColor: alpha(BRAND.orange, 0.15), color: BRAND.orange, fontWeight: 700 },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 12, height: 8, backgroundColor: "#E2E8F0" },
        bar: { borderRadius: 12, background: premiumGradient },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 24, padding: "8px" },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { borderBottom: "1px solid rgba(226,232,240,0.8)" },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { border: "none", boxShadow: "4px 0 30px rgba(0,0,0,0.08)" },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: "2px 8px",
          transition: "all 0.18s ease",
          "&.Mui-selected": {
            backgroundColor: alpha(BRAND.orange, 0.1),
            color: BRAND.orange,
            "& .MuiListItemIcon-root": { color: BRAND.orange },
            "&:hover": { backgroundColor: alpha(BRAND.orange, 0.15) },
          },
          "&:hover": { backgroundColor: alpha(BRAND.navy, 0.04) },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        rounded: { borderRadius: 20 },
        outlined: { border: "1px solid #E2E8F0" },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "#E2E8F0" },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            backgroundColor: BRAND.surface,
            fontWeight: 700,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: BRAND.slate,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: "#F1F5F9", padding: "14px 16px" },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 14, fontSize: "0.875rem" },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { borderRadius: 8, fontSize: "0.8125rem", fontWeight: 500 },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: { fontWeight: 700 },
      },
    },
  },
});

export default theme;
