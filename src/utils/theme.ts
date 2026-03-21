import { createTheme } from '@mui/material/styles';

// Vibrant auspicious color palette inspired by AstroTalk aesthetics
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFD700', // Lemon yellow / Golden yellow (auspicious)
      light: '#FFE44D',
      dark: '#E6C200',
      contrastText: '#1A1A1A',
    },
    secondary: {
      main: '#FF6B35', // Vibrant saffron orange
      light: '#FF8A65',
      dark: '#E64A19',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFF8E7', // Warm cream with yellow tint
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#4A4A4A',
    },
    success: {
      main: '#4CAF50',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#FF9800',
    },
    info: {
      main: '#2196F3',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '14px 36px',
          fontSize: '1rem',
          boxShadow: 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(74, 90, 141, 0.25)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          color: '#1A1A1A',
          fontWeight: 700,
          '&:hover': {
            background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
            boxShadow: '0 8px 24px rgba(255, 140, 0, 0.4)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: 'rgba(74, 90, 141, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(255, 140, 0, 0.15)',
          border: '2px solid rgba(255, 215, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 40px rgba(255, 140, 0, 0.3)',
            borderColor: 'rgba(255, 215, 0, 0.6)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 20px rgba(255, 215, 0, 0.2)',
          backgroundColor: 'rgba(255, 248, 231, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '2px solid rgba(255, 215, 0, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            transition: 'all 0.3s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFD700',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
                borderColor: '#FFA500',
              },
            },
          },
        },
      },
    },
  },
});

export default theme;
