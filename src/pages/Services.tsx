import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  alpha,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NightlightIcon from '@mui/icons-material/Nightlight';
import CalculateIcon from '@mui/icons-material/Calculate';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { services } from '../utils/data';

const iconMap: Record<string, any> = {
  psychology: PsychologyIcon,
  auto_awesome: AutoAwesomeIcon,
  nightlight: NightlightIcon,
  calculate: CalculateIcon,
  home: HomeIcon,
};

const Services = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.1
          )} 100%)`,
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Services
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, textAlign: 'center', maxWidth: 800, mx: 'auto' }}
          >
            Comprehensive guidance combining modern psychology with ancient wisdom
          </Typography>
        </Container>
      </Box>

      {/* Services Detail Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8}>
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Grid item xs={12} key={service.id}>
                <Card
                  sx={{
                    p: { xs: 3, md: 5 },
                    background:
                      index % 2 === 0
                        ? alpha(theme.palette.primary.main, 0.03)
                        : alpha(theme.palette.secondary.main, 0.03),
                  }}
                >
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: 3,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: { xs: 'auto', md: 0 },
                          mb: { xs: 2, md: 0 },
                        }}
                      >
                        <IconComponent sx={{ fontSize: 48, color: 'white' }} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
                        {service.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 3, fontWeight: 400 }}
                      >
                        {service.description}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}
                      >
                        {service.detailedDescription}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Pricing Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
            Flexible Pricing for Every Need
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 6, textAlign: 'center', maxWidth: 700, mx: 'auto' }}
          >
            Each service offers multiple package options. View pricing when booking.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {services.slice(0, 3).map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                      {service.name}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                      Starting from
                    </Typography>
                    <Typography variant="h2" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
                      ₹{Math.min(...service.pricingOptions.map(opt => opt.price)).toLocaleString('en-IN')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {service.pricingOptions.length} packages available
                    </Typography>
                    <Button
                      component={Link}
                      to="/book"
                      variant="contained"
                      fullWidth
                      size="large"
                    >
                      View Packages
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="body1" color="text.secondary">
              All sessions include personalized guidance and follow-up support
            </Typography>
            <Button
              component={Link}
              to="/book"
              variant="outlined"
              size="large"
              sx={{ mt: 3 }}
              endIcon={<ArrowForwardIcon />}
            >
              View All Pricing Options
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Card
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(
              theme.palette.secondary.main,
              0.1
            )} 100%)`,
            border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            color: theme.palette.text.primary,
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            boxShadow: 'none',
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
            Book your session now and take the first step towards transformation
          </Typography>
          <Button
            component={Link}
            to="/book"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 700,
              px: 5,
              py: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.45)}`,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Book Now
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default Services;
