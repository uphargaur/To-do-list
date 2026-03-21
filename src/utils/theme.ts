import { createTheme } from '@mui/material/styles';

// Calming cosmic color palette inspired by modern astrology aesthetics
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4A5A8D', // Soft cosmic blue-purple
      light: '#7B8BC4',
      dark: '#2D3A5F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E5C158', // Warm golden
      light: '#F4D78F',
      dark: '#C9A43D',
      contrastText: '#1A202C',
    },
    background: {
      default: '#FFFBF5', // Warm cream
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',
      secondary: '#5A6A85',
    },
    success: {
      main: '#7FB685',
    },
    error: {
      main: '#E57373',
    },
    warning: {
      main: '#F4A261',
    },
    info: {
      main: '#7B8BC4',
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
          background: 'linear-gradient(135deg, #4A5A8D 0%, #7B8BC4 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2D3A5F 0%, #4A5A8D 100%)',
            boxShadow: '0 8px 24px rgba(74, 90, 141, 0.35)',
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
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(74, 90, 141, 0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 40px rgba(74, 90, 141, 0.15)',
            borderColor: 'rgba(74, 90, 141, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 20px rgba(74, 90, 141, 0.08)',
          backgroundColor: 'rgba(255, 251, 245, 0.95)',
          backdropFilter: 'blur(20px)',
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
                borderColor: '#7B8BC4',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
  },
});

export default theme;
