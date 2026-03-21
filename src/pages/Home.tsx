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
import SpaIcon from '@mui/icons-material/Spa';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { services, testimonials } from '../utils/data';
import shirajamiImage from '../assets/images/Image_shirajani.jpeg';

const iconMap: Record<string, any> = {
  psychology: PsychologyIcon,
  auto_awesome: AutoAwesomeIcon,
  nightlight: NightlightIcon,
  calculate: CalculateIcon,
  home: HomeIcon,
};

const Home = () => {
  const theme = useTheme();

  // Healing and Vastu 3D Elements Component
  const HealingSymbol = ({ top, left, size = 60, delay = 0 }: any) => (
    <Box
      sx={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        opacity: 0.15,
        animation: `float ${8 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lotus Flower */}
        <path
          d="M50 20 C30 30, 20 45, 20 60 Q20 75, 35 85 L50 90 L65 85 Q80 75, 80 60 C80 45, 70 30, 50 20 Z"
          fill={theme.palette.primary.main}
          opacity="0.6"
        />
        <path
          d="M50 30 C38 38, 32 48, 32 58 Q32 68, 42 75 L50 78 L58 75 Q68 68, 68 58 C68 48, 62 38, 50 30 Z"
          fill={theme.palette.secondary.main}
          opacity="0.8"
        />
        <circle cx="50" cy="60" r="8" fill={theme.palette.secondary.light} />
      </svg>
    </Box>
  );

  const VastuCompass = ({ top, right, size = 80, delay = 0 }: any) => (
    <Box
      sx={{
        position: 'absolute',
        top,
        right,
        width: size,
        height: size,
        opacity: 0.12,
        animation: `rotateGlow ${15 + delay}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Vastu Compass */}
        <circle cx="50" cy="50" r="45" stroke={theme.palette.primary.main} strokeWidth="2" opacity="0.5" />
        <circle cx="50" cy="50" r="35" stroke={theme.palette.secondary.main} strokeWidth="1.5" opacity="0.6" />
        <path d="M50 5 L55 50 L50 95 L45 50 Z" fill={theme.palette.primary.main} opacity="0.6" />
        <path d="M5 50 L50 55 L95 50 L50 45 Z" fill={theme.palette.secondary.main} opacity="0.6" />
        <circle cx="50" cy="50" r="8" fill={theme.palette.primary.dark} opacity="0.8" />
      </svg>
    </Box>
  );

  const OmSymbol = ({ top, left, size = 70, delay = 0 }: any) => (
    <Box
      sx={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        opacity: 0.1,
        animation: `gentlePulse ${10 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Om Symbol */}
        <path
          d="M30 40 Q25 35, 30 30 Q35 25, 40 30 L45 35 Q50 30, 55 35 Q60 40, 55 45 L50 50"
          stroke={theme.palette.secondary.main}
          strokeWidth="3"
          fill="none"
          opacity="0.7"
        />
        <circle cx="50" cy="30" r="12" fill={theme.palette.primary.main} opacity="0.5" />
        <path
          d="M35 55 Q40 70, 50 70 Q60 70, 65 55"
          stroke={theme.palette.secondary.main}
          strokeWidth="4"
          fill="none"
          opacity="0.6"
        />
        <circle cx="70" cy="60" r="6" fill={theme.palette.primary.main} opacity="0.6" />
      </svg>
    </Box>
  );

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: `radial-gradient(ellipse at top, ${alpha(theme.palette.primary.main, 0.25)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.15
          )} 50%, transparent 100%),
          linear-gradient(180deg, #FFF8E7 0%, ${alpha('#FFE5B4', 0.4)} 100%)`,
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.2)} 0%, transparent 70%)`,
            borderRadius: '50%',
            animation: 'gentlePulse 8s ease-in-out infinite',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-20%',
            left: '-5%',
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
            borderRadius: '50%',
            animation: 'gentlePulse 10s ease-in-out infinite',
            animationDelay: '2s',
            pointerEvents: 'none',
          },
        }}
      >
        {/* Healing and Vastu 3D Elements */}
        <HealingSymbol top="5%" left="8%" size={80} delay={0} />
        <HealingSymbol top="60%" left="12%" size={60} delay={2} />
        <VastuCompass top="10%" right="5%" size={90} delay={1} />
        <VastuCompass top="70%" right="8%" size={70} delay={3} />
        <OmSymbol top="15%" left="85%" size={75} delay={1.5} />
        <OmSymbol top="75%" left="75%" size={65} delay={2.5} />

        {/* Floating meditation icon */}
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            right: '15%',
            opacity: 0.08,
            animation: 'float 12s ease-in-out infinite',
          }}
        >
          <SelfImprovementIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '5%',
            opacity: 0.08,
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '1s',
          }}
        >
          <SpaIcon sx={{ fontSize: 90, color: theme.palette.secondary.main }} />
        </Box>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  animation: 'fadeInUp 1s ease-out',
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    mb: 3,
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
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
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  animation: 'fadeInUp 1s ease-out 0.3s backwards',
                }}
              >
                {/* Cosmic glow effect behind image */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '450px',
                    height: '450px',
                    background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.3)} 0%, ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )} 50%, transparent 70%)`,
                    borderRadius: '50%',
                    animation: 'rotateGlow 20s linear infinite',
                    filter: 'blur(40px)',
                  }}
                />
                <Box
                  component="img"
                  src={shirajamiImage}
                  alt="Shirajani"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 4,
                    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.25)}`,
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                />
                {/* Floating stars decoration */}
                {[...Array(8)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      position: 'absolute',
                      width: i % 2 === 0 ? '8px' : '6px',
                      height: i % 2 === 0 ? '8px' : '6px',
                      borderRadius: '50%',
                      background: alpha(theme.palette.secondary.main, 0.6),
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`,
                      animation: `twinkle ${3 + Math.random() * 3}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Preview */}
      <Container maxWidth="lg" sx={{ py: 10, position: 'relative' }}>
        {/* Subtle background elements */}
        <HealingSymbol top="5%" left="2%" size={70} delay={1} />
        <VastuCompass top="50%" right="3%" size={75} delay={2} />

        <Box sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 1 }}>
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
                  <CardContent sx={{ flexGrow: 1, p: 4, position: 'relative' }}>
                    {/* Subtle cosmic background glow */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                      }}
                    />
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        position: 'relative',
                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'rotate(5deg) scale(1.05)',
                        },
                      }}
                    >
                      <IconComponent sx={{ fontSize: 36, color: 'white' }} />
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
      <Box
        sx={{
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
          py: 10,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
            borderRadius: '50%',
            animation: 'float 15s ease-in-out infinite',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      sx={{
                        mb: 2,
                        '& .MuiRating-iconFilled': {
                          color: theme.palette.secondary.main,
                        },
                      }}
                    />
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
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: 'white',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '400px',
              height: '400px',
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.3)} 0%, transparent 70%)`,
              borderRadius: '50%',
              animation: 'gentlePulse 10s ease-in-out infinite',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-30%',
              left: '-10%',
              width: '300px',
              height: '300px',
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.2)} 0%, transparent 70%)`,
              borderRadius: '50%',
              animation: 'gentlePulse 8s ease-in-out infinite',
              animationDelay: '3s',
            },
          }}
        >
          <CardContent sx={{ p: 6, textAlign: 'center', position: 'relative', zIndex: 1 }}>
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
                boxShadow: `0 8px 32px ${alpha('#000', 0.2)}`,
                '&:hover': {
                  bgcolor: alpha('#ffffff', 0.95),
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 40px ${alpha('#000', 0.3)}`,
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
