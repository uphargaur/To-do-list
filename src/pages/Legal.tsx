import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  alpha,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Legal = () => {
  const theme = useTheme();

  return (
    <Box>
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
            Legal Information
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}
          >
            Privacy Policy, Terms of Service, and Disclaimers
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Privacy Policy
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ '& > *': { mb: 2 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
                Information We Collect
              </Typography>
              <Typography variant="body1">
                We collect personal information that you provide to us when booking a session,
                including your name, email address, phone number, and payment confirmation details.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                How We Use Your Information
              </Typography>
              <Typography variant="body1">
                Your information is used to:
              </Typography>
              <ul>
                <li>Process and manage your booking</li>
                <li>Communicate with you about your sessions</li>
                <li>Send appointment reminders and follow-ups</li>
                <li>Improve our services</li>
              </ul>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Data Security
              </Typography>
              <Typography variant="body1">
                We implement appropriate security measures to protect your personal information.
                Your data is stored securely and is only accessible to authorized personnel.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Third-Party Services
              </Typography>
              <Typography variant="body1">
                We use third-party services including Supabase for data storage and Google Calendar
                for scheduling. These services have their own privacy policies.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Your Rights
              </Typography>
              <Typography variant="body1">
                You have the right to access, update, or delete your personal information. Contact
                us at t1346fh@gmail.com for any privacy-related requests.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Terms of Service
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ '& > *': { mb: 2 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
                Service Agreement
              </Typography>
              <Typography variant="body1">
                By booking a session with Shirnjani, you agree to these terms and conditions.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Booking and Payment
              </Typography>
              <ul>
                <li>Payment must be completed before the session can be scheduled</li>
                <li>All payments are in Indian Rupees (INR)</li>
                <li>Payment confirmation must be uploaded within 24 hours of booking</li>
                <li>Sessions will be scheduled only after payment verification</li>
              </ul>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Cancellation Policy
              </Typography>
              <ul>
                <li>Cancellations must be made at least 24 hours before the scheduled session</li>
                <li>
                  Cancellations made within 24 hours may not be eligible for a refund or
                  rescheduling
                </li>
                <li>No-shows will forfeit the session fee</li>
              </ul>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Rescheduling
              </Typography>
              <Typography variant="body1">
                Sessions can be rescheduled once without charge if requested at least 48 hours in
                advance. Contact us via email to reschedule.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Confidentiality
              </Typography>
              <Typography variant="body1">
                All information shared during sessions is kept strictly confidential, except where
                required by law.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Code of Conduct
              </Typography>
              <Typography variant="body1">
                Respectful and appropriate behavior is expected from all clients. We reserve the
                right to terminate services for abusive or inappropriate conduct.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Disclaimers
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ '& > *': { mb: 2 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
                Professional Services
              </Typography>
              <Typography variant="body1">
                The services provided are for guidance and support purposes. They are not a
                substitute for professional medical, psychological, legal, or financial advice.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Counseling Services
              </Typography>
              <Typography variant="body1">
                While I am a trained counseling psychologist, if you are experiencing a mental
                health emergency, please contact emergency services or a crisis helpline immediately.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Spiritual Services (Tarot, Astrology, Numerology, Vastu)
              </Typography>
              <Typography variant="body1">
                These services are based on spiritual and ancient practices. Results and
                interpretations may vary and are not guaranteed. They should be used for guidance and
                self-reflection, not as absolute predictions or directives.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                No Guarantees
              </Typography>
              <Typography variant="body1">
                While I strive to provide the best possible service, no specific outcomes or results
                are guaranteed. Your personal growth and transformation depend on many factors
                including your own commitment and actions.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Limitation of Liability
              </Typography>
              <Typography variant="body1">
                To the fullest extent permitted by law, Shirnjani shall not be liable for any
                indirect, incidental, special, or consequential damages arising from the use of our
                services.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>
                Medical Conditions
              </Typography>
              <Typography variant="body1">
                If you have any medical or psychiatric conditions, please consult with your healthcare
                provider before booking a session. Inform me of any relevant conditions during our
                consultation.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Contact Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 1 }}>
              For any questions or concerns regarding these policies, please contact:
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Email:</strong> t1346fh@gmail.com
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> Shirnjani
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
};

export default Legal;
