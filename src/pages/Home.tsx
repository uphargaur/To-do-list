import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  useTheme,
  alpha,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NightlightIcon from '@mui/icons-material/Nightlight';
import CalculateIcon from '@mui/icons-material/Calculate';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { services, testimonials } from '../utils/data';
import shirnjaniImage from '../assets/images/shirnjani.png';

const iconMap: Record<string, any> = {
  psychology: PsychologyIcon,
  auto_awesome: AutoAwesomeIcon,
  nightlight: NightlightIcon,
  calculate: CalculateIcon,
  home: HomeIcon,
};

const Home = () => {
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
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 3,
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Find Clarity. Heal Within. Transform Your Life.
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                Professional counseling, intuitive guidance, and spiritual insights to help you break
                free from patterns and discover your true path.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/book"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Book a Session
                </Button>
                <Button component={Link} to="/about" variant="outlined" size="large">
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src={shirnjaniImage}
                  alt="Shirnjani"
                  sx={{
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 4,
                    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.3)}`,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Preview */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            How I Can Help You
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            A holistic approach combining psychology, spirituality, and ancient wisdom
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {service.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {service.description}
                    </Typography>
                    <Button
                      component={Link}
                      to="/services"
                      variant="text"
                      endIcon={<ArrowForwardIcon />}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button component={Link} to="/services" variant="contained" size="large">
            View All Services
          </Button>
        </Box>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
              What Clients Say
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Real experiences from people who found their path
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.slice(0, 3).map((testimonial) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {testimonial.service}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Card
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: 'white',
          }}
        >
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              Ready to Begin Your Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
              Book your first session today and take the first step towards clarity and
              transformation.
            </Typography>
            <Button
              component={Link}
              to="/book"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: alpha('#ffffff', 0.9),
                },
              }}
            >
              Book Now
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Home;
