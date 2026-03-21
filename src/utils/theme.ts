import { createTheme } from '@mui/material/styles';

// Balanced auspicious color palette with better readability
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF8C00', // Dark orange/saffron (more prominent)
      light: '#FFA726',
      dark: '#E65100',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFB300', // Amber yellow (less intense)
      light: '#FFCA28',
      dark: '#FF8F00',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#FFFBF5', // Subtle warm cream
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
          padding: '12px 32px',
          fontSize: '1rem',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '@media (max-width: 600px)': {
            padding: '10px 24px',
            fontSize: '0.95rem',
          },
          '&:hover': {
            boxShadow: '0 6px 20px rgba(255, 140, 0, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
          color: '#FFFFFF',
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(255, 140, 0, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E65100 0%, #D84315 100%)',
            boxShadow: '0 8px 24px rgba(255, 140, 0, 0.4)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#FF8C00',
          color: '#FF8C00',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: 'rgba(255, 140, 0, 0.08)',
            borderColor: '#E65100',
          },
        },
        sizeLarge: {
          padding: '14px 40px',
          fontSize: '1.1rem',
          '@media (max-width: 600px)': {
            padding: '12px 28px',
            fontSize: '1rem',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(255, 140, 0, 0.1)',
          border: '1px solid rgba(255, 140, 0, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '@media (max-width: 600px)': {
            borderRadius: 16,
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(255, 140, 0, 0.2)',
            borderColor: 'rgba(255, 140, 0, 0.4)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(255, 140, 0, 0.1)',
          backgroundColor: 'rgba(255, 251, 245, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 140, 0, 0.15)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            transition: 'all 0.3s ease',
            '@media (max-width: 600px)': {
              borderRadius: 12,
            },
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF8C00',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
                borderColor: '#FF6B35',
              },
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            fontSize: '0.8rem',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          '@media (max-width: 600px)': {
            fontSize: '2rem',
          },
        },
        h2: {
          '@media (max-width: 600px)': {
            fontSize: '1.75rem',
          },
        },
        h3: {
          '@media (max-width: 600px)': {
            fontSize: '1.5rem',
          },
        },
      },
    },
  },
});

export default theme;
