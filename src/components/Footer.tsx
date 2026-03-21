import { Box, Container, Typography, Link as MuiLink, Grid, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        background: `linear-gradient(135deg, #2D3A5F 0%, #4A5A8D 100%)`,
        color: 'white',
        py: 6,
        mt: 'auto',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(229, 193, 88, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              Shirajani
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Counselling Psychology • Tarot • Astrology • Numerology • Vastu
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Guiding you towards clarity, emotional balance, and conscious transformation.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={Link} to="/" color="inherit" underline="hover">
                Home
              </MuiLink>
              <MuiLink component={Link} to="/about" color="inherit" underline="hover">
                About Me
              </MuiLink>
              <MuiLink component={Link} to="/services" color="inherit" underline="hover">
                Services
              </MuiLink>
              <MuiLink component={Link} to="/book" color="inherit" underline="hover">
                Book Session
              </MuiLink>
              <MuiLink component={Link} to="/legal" color="inherit" underline="hover">
                Privacy & Terms
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" />
                <MuiLink href="mailto:Shirnjani33@gmail.com" color="inherit" underline="hover">
                  Shirnjani33@gmail.com
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">+91 82187 01093</Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Follow Me
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton color="inherit" size="small" aria-label="Instagram">
                  <InstagramIcon />
                </IconButton>
                <IconButton color="inherit" size="small" aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" size="small" aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Shirajani. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
