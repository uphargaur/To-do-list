import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  useTheme,
  alpha,
  Alert,
  CircularProgress,
} from '@mui/material';
import { services, sessionOptions } from '../utils/data';
import { createBooking, uploadPaymentScreenshot } from '../utils/supabase';
import paymentQR from '../assets/qr/payment-qr.jpg';

const steps = ['Select Service', 'Session Details', 'Contact Info', 'Payment', 'Confirm Booking'];

const Book = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [sessionDuration, setSessionDuration] = useState<number>(60);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState<string | null>(null);

  const selectedSessionOption = sessionOptions.find((opt) => opt.duration === sessionDuration);

  const handleNext = async () => {
    setError('');

    // Validation for each step
    if (activeStep === 0 && !selectedService) {
      setError('Please select a service');
      return;
    }

    if (activeStep === 1 && !sessionDuration) {
      setError('Please select a session duration');
      return;
    }

    if (activeStep === 2) {
      if (!clientName || !clientEmail || !clientPhone) {
        setError('Please fill in all contact details');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
        setError('Please enter a valid email address');
        return;
      }
      if (!/^\d{10}$/.test(clientPhone)) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }

      // Create booking in database
      try {
        setLoading(true);
        const booking = await createBooking({
          clientName,
          clientEmail,
          clientPhone,
          service: selectedService,
          sessionDuration,
          sessionPrice: selectedSessionOption?.price || 0,
          paymentScreenshot: null,
          paymentVerified: false,
          bookingDate: null,
          status: 'pending_payment',
        });
        setBookingId(booking.id);
      } catch (err) {
        setError('Failed to create booking. Please try again.');
        return;
      } finally {
        setLoading(false);
      }
    }

    if (activeStep === 3) {
      if (!paymentFile) {
        setError('Please upload payment confirmation screenshot');
        return;
      }

      // Upload payment screenshot
      try {
        setLoading(true);
        if (bookingId) {
          const imageUrl = await uploadPaymentScreenshot(paymentFile, bookingId);
          // Update booking with payment screenshot
          await createBooking({
            clientName,
            clientEmail,
            clientPhone,
            service: selectedService,
            sessionDuration,
            sessionPrice: selectedSessionOption?.price || 0,
            paymentScreenshot: imageUrl,
            paymentVerified: false,
            bookingDate: null,
            status: 'payment_uploaded',
          });
        }
      } catch (err) {
        setError('Failed to upload payment screenshot. Please try again.');
        return;
      } finally {
        setLoading(false);
      }
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setActiveStep((prev) => prev - 1);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPaymentFile(event.target.files[0]);
      setError('');
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Select a Service
            </Typography>
            <Grid container spacing={3}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border:
                        selectedService === service.id
                          ? `2px solid ${theme.palette.primary.main}`
                          : '1px solid #e0e0e0',
                      '&:hover': {
                        borderColor: theme.palette.primary.light,
                        transform: 'translateY(-4px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Choose Session Duration
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Session Duration & Price</FormLabel>
              <RadioGroup
                value={sessionDuration}
                onChange={(e) => setSessionDuration(Number(e.target.value))}
              >
                {sessionOptions.map((option) => (
                  <FormControlLabel
                    key={option.duration}
                    value={option.duration}
                    control={<Radio />}
                    label={`${option.duration} minutes - ₹${option.price}`}
                    sx={{ mb: 2 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Your Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Payment
            </Typography>
            <Card sx={{ mb: 3, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Payment Summary
              </Typography>
              <Typography variant="body1">
                Service: <strong>{services.find((s) => s.id === selectedService)?.name}</strong>
              </Typography>
              <Typography variant="body1">
                Duration: <strong>{sessionDuration} minutes</strong>
              </Typography>
              <Typography variant="h5" sx={{ mt: 2, color: 'primary.main' }}>
                Total: ₹{selectedSessionOption?.price}
              </Typography>
            </Card>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Scan QR Code to Pay
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                component="img"
                src={paymentQR}
                alt="Payment QR Code"
                sx={{
                  maxWidth: 300,
                  width: '100%',
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: 2,
                  p: 2,
                }}
              />
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              After completing the payment, please upload a screenshot of the payment confirmation:
            </Typography>
            <Button variant="outlined" component="label" fullWidth>
              {paymentFile ? paymentFile.name : 'Upload Payment Screenshot'}
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'success.main' }}>
              Booking Submitted Successfully!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Thank you for your booking. Your payment is being verified by our admin.
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Once your payment is verified, you will receive an email with a link to schedule your
              session on the calendar.
            </Alert>
            <Typography variant="body2" color="text.secondary">
              Booking ID: {bookingId}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please save this ID for your records.
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.1
          )} 100%)`,
          pt: { xs: 6, md: 8 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Book Your Session
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
            Follow the simple steps below to book your session
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {renderStepContent()}

          {activeStep < steps.length - 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {activeStep === steps.length - 2 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default Book;
