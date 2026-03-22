import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import { aboutContent } from '../utils/data';

const About = () => {
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
            About Shirnjani
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, textAlign: 'center', maxWidth: 800, mx: 'auto' }}
          >
            Your Guide to Emotional Healing and Spiritual Clarity
          </Typography>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            {/* Spiritual Lotus Mandala Illustration */}
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: 4,
              }}
            >
              <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%' }}
              >
                {/* Background Circle */}
                <circle cx="200" cy="200" r="190" fill={alpha(theme.palette.primary.main, 0.08)} />

                {/* Outer Ring */}
                <circle cx="200" cy="200" r="180" stroke={alpha(theme.palette.secondary.main, 0.3)} strokeWidth="2" fill="none" />

                {/* Lotus Petals - Outer Layer */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x = 200 + Math.cos(angle) * 120;
                  const y = 200 + Math.sin(angle) * 120;
                  return (
                    <ellipse
                      key={`outer-${i}`}
                      cx={x}
                      cy={y}
                      rx="40"
                      ry="60"
                      fill={alpha(theme.palette.primary.main, 0.15)}
                      stroke={alpha(theme.palette.primary.main, 0.4)}
                      strokeWidth="1.5"
                      transform={`rotate(${i * 30} ${x} ${y})`}
                    />
                  );
                })}

                {/* Lotus Petals - Middle Layer */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180;
                  const x = 200 + Math.cos(angle) * 80;
                  const y = 200 + Math.sin(angle) * 80;
                  return (
                    <ellipse
                      key={`middle-${i}`}
                      cx={x}
                      cy={y}
                      rx="35"
                      ry="50"
                      fill={alpha(theme.palette.secondary.main, 0.2)}
                      stroke={alpha(theme.palette.secondary.main, 0.5)}
                      strokeWidth="1.5"
                      transform={`rotate(${i * 45} ${x} ${y})`}
                    />
                  );
                })}

                {/* Lotus Petals - Inner Layer */}
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 60 * Math.PI) / 180;
                  const x = 200 + Math.cos(angle) * 50;
                  const y = 200 + Math.sin(angle) * 50;
                  return (
                    <ellipse
                      key={`inner-${i}`}
                      cx={x}
                      cy={y}
                      rx="25"
                      ry="40"
                      fill={alpha(theme.palette.primary.main, 0.25)}
                      stroke={alpha(theme.palette.primary.main, 0.6)}
                      strokeWidth="2"
                      transform={`rotate(${i * 60} ${x} ${y})`}
                    />
                  );
                })}

                {/* Center Circle - Om Symbol Base */}
                <circle cx="200" cy="200" r="45" fill={alpha(theme.palette.secondary.main, 0.15)} />
                <circle cx="200" cy="200" r="45" stroke={theme.palette.primary.main} strokeWidth="2" fill="none" />

                {/* Om Symbol - Stylized */}
                <g transform="translate(200, 200)">
                  {/* 3 */}
                  <path
                    d="M -20 -10 Q -25 -20, -15 -25 Q -5 -30, 5 -20 Q 10 -15, 5 -5 Q 0 0, -10 5"
                    stroke={theme.palette.primary.main}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Upper dot */}
                  <circle cx="-5" cy="-30" r="4" fill={theme.palette.secondary.main} />

                  {/* Curve */}
                  <path
                    d="M -15 10 Q 0 25, 15 10"
                    stroke={theme.palette.primary.main}
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Small dot on right */}
                  <circle cx="20" cy="0" r="5" fill={theme.palette.secondary.main} />
                </g>

                {/* Decorative Stars */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180;
                  const x = 200 + Math.cos(angle) * 160;
                  const y = 200 + Math.sin(angle) * 160;
                  return (
                    <circle
                      key={`star-${i}`}
                      cx={x}
                      cy={y}
                      r="3"
                      fill={alpha(theme.palette.secondary.main, 0.6)}
                    />
                  );
                })}
              </svg>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 600 }}>
              Hi, I'm Shirnjani
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              {aboutContent.introduction}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              {aboutContent.philosophy}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {aboutContent.approach}
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Who I Help Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
            Who I Help
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, textAlign: 'center', maxWidth: 800, mx: 'auto' }}
          >
            My work is focused on helping people who feel:
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {aboutContent.focus.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent>
                    <CheckCircleIcon
                      sx={{
                        fontSize: 48,
                        color: theme.palette.primary.main,
                        mb: 2,
                      }}
                    />
                    <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                      {item}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Experience Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ mb: 6, fontWeight: 600, textAlign: 'center' }}>
          Experience & Impact
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: 'center',
                p: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white',
              }}
            >
              <EventIcon sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                {aboutContent.experience.years}
              </Typography>
              <Typography variant="h6">Years of Practice</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: 'center',
                p: 4,
                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                color: 'white',
              }}
            >
              <GroupsIcon sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                {aboutContent.experience.clientsServed}
              </Typography>
              <Typography variant="h6">Happy Clients</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: 'center',
                p: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white',
              }}
            >
              <StarIcon sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                {aboutContent.experience.sessionsCompleted}
              </Typography>
              <Typography variant="h6">Orders Completed</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: 'center',
                p: 4,
                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                color: 'white',
              }}
            >
              <EventIcon sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                {aboutContent.experience.totalMinutes}
              </Typography>
              <Typography variant="h6">Minutes of Guidance</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Qualifications Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
            Qualifications & Expertise
          </Typography>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <List>
                {aboutContent.qualifications.map((qualification, index) => (
                  <ListItem key={index} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={qualification}
                      primaryTypographyProps={{ variant: 'h6', fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Approach Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card
          sx={{
            p: 6,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.1
            )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            My Approach
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            I don't believe in one-size-fits-all solutions. Every person's journey is unique, and so
            is my approach with each client.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Whether you're seeking emotional healing through counseling, clarity through tarot,
            understanding through astrology, or harmony through Vastu — I'm here to guide you with
            compassion, insight, and practical wisdom.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip label="Empathetic" color="primary" />
            <Chip label="Intuitive" color="primary" />
            <Chip label="Professional" color="primary" />
            <Chip label="Non-judgmental" color="primary" />
            <Chip label="Results-oriented" color="primary" />
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default About;
