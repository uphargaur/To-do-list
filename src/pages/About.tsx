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
import shirnjaniImage from '../assets/images/shirnjani.png';

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
            <Box
              component="img"
              src={shirnjaniImage}
              alt="Shirnjani"
              sx={{
                width: '100%',
                borderRadius: 4,
                boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            />
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
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
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
              <Typography variant="h6">Clients Served</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
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
              <Typography variant="h6">Sessions Completed</Typography>
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
