import { useState, useRef, useEffect } from 'react';
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
import { services } from '../utils/data';
import { createBooking, uploadPaymentScreenshot } from '../utils/supabase';
import paymentQR from '../assets/qr/payment-qr.jpg';

const steps = ['Select Service', 'Session Details', 'Contact Info', 'Payment', 'Confirm Booking'];

const Book = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [selectedPricingIndex, setSelectedPricingIndex] = useState<number>(0);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [showUpiAppSelector, setShowUpiAppSelector] = useState(false);

  // Refs for auto-scroll functionality
  const cardRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);

  const currentService = services.find((s) => s.id === selectedService);
  const selectedPricingOption = currentService?.pricingOptions[selectedPricingIndex];

  // Scroll to top when page first loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto-scroll to card top when step changes
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeStep]);

  const handleNext = async () => {
    setError('');

    // Validation for each step
    if (activeStep === 0 && !selectedService) {
      setError('Please select a service');
      return;
    }

    if (activeStep === 1 && selectedPricingIndex === undefined) {
      setError('Please select a pricing option');
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
        const bookingData = await createBooking({
          clientName,
          clientEmail,
          clientPhone,
          service: `${currentService?.name} - ${selectedPricingOption?.label}`,
          sessionDuration: selectedPricingOption?.duration || 0,
          sessionPrice: selectedPricingOption?.price || 0,
          paymentScreenshot: null,
          paymentVerified: false,
          bookingDate: null,
          status: 'pending_payment',
        });
        if (bookingData && bookingData.id) {
          setBookingId(bookingData.id);
        } else {
          throw new Error('No booking ID received');
        }
      } catch (err) {
        console.error('Booking error:', err);
        setError('Failed to create booking. Please try again.');
        setLoading(false);
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
          const { updateBooking } = await import('../utils/supabase');
          await updateBooking(bookingId, {
            paymentScreenshot: imageUrl,
            status: 'payment_uploaded',
          });
        } else {
          throw new Error('No booking ID found');
        }
      } catch (err) {
        console.error('Upload error:', err);
        setError('Failed to upload payment screenshot. Please try again.');
        setLoading(false);
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
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border:
                        selectedService === service.id
                          ? `2px solid ${theme.palette.primary.main}`
                          : '1px solid rgba(0, 0, 0, 0.12)',
                      backgroundColor: selectedService === service.id
                        ? alpha(theme.palette.primary.main, 0.05)
                        : 'white',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        transform: 'translateY(-4px)',
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                      transition: 'all 0.3s ease',
                      height: '100%',
                    }}
                    onClick={() => {
                      setSelectedService(service.id);
                      setSelectedPricingIndex(0); // Reset to first pricing option
                      // Auto-advance to next step after selection
                      setTimeout(() => {
                        setActiveStep(1);
                      }, 300);
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
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
              Choose Your Package
            </Typography>
            {currentService && (
              <>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  {currentService.name}
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Available Packages</FormLabel>
                  <RadioGroup
                    value={selectedPricingIndex}
                    onChange={(e) => {
                      setSelectedPricingIndex(Number(e.target.value));
                      // Auto-scroll to next button after selection
                      setTimeout(() => {
                        if (nextButtonRef.current) {
                          nextButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                      }, 300);
                    }}
                  >
                    {currentService.pricingOptions.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={index}
                        control={<Radio />}
                        label={
                          <Box sx={{ py: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {option.label}
                              {option.duration && ` (${option.duration} minutes)`}
                            </Typography>
                            {option.description && (
                              <Typography variant="body2" color="text.secondary">
                                {option.description}
                              </Typography>
                            )}
                            <Typography variant="h6" sx={{ color: 'primary.main', mt: 0.5 }}>
                              ₹{option.price.toLocaleString('en-IN')}
                            </Typography>
                          </Box>
                        }
                        sx={{
                          mb: 2,
                          border: '2px solid',
                          borderColor: selectedPricingIndex === index ? 'primary.main' : 'divider',
                          borderRadius: { xs: 2, sm: 3 },
                          p: { xs: 1.5, sm: 2 },
                          transition: 'all 0.3s ease',
                          backgroundColor: selectedPricingIndex === index
                            ? alpha(theme.palette.primary.main, 0.08)
                            : 'transparent',
                          '&:hover': {
                            borderColor: 'primary.light',
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          }
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </>
            )}
          </Box>
        );

      case 2:
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: { xs: '50vh', sm: '60vh' }
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
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
                Service: <strong>{currentService?.name}</strong>
              </Typography>
              <Typography variant="body1">
                Package: <strong>{selectedPricingOption?.label}</strong>
              </Typography>
              {selectedPricingOption?.duration && (
                <Typography variant="body1">
                  Duration: <strong>{selectedPricingOption.duration} minutes</strong>
                </Typography>
              )}
              {selectedPricingOption?.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {selectedPricingOption.description}
                </Typography>
              )}
              <Typography variant="h5" sx={{ mt: 2, color: 'primary.main', fontWeight: 700 }}>
                Total: ₹{selectedPricingOption?.price.toLocaleString('en-IN')}
              </Typography>
            </Card>

            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Complete Payment
            </Typography>

            <Alert severity="info" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Recommended: Scan QR Code
              </Typography>
              <Typography variant="body2">
                Some UPI apps may block direct UPI ID payments. For best results, please scan the QR code below.
              </Typography>
            </Alert>

            {/* QR Code - Make it primary */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Scan QR Code to Pay
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box
                  component="img"
                  src={paymentQR}
                  alt="Payment QR Code"
                  sx={{
                    maxWidth: 300,
                    width: '100%',
                    border: `3px solid ${theme.palette.primary.main}`,
                    borderRadius: 2,
                    p: 2,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Works with all UPI apps - No restrictions
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>OR</Typography>
            </Box>

            {/* UPI Payment Button - Secondary option */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              {/* Detect iOS */}
              {/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream ? (
                <>
                  {!showUpiAppSelector ? (
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        maxWidth: 400,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: 'white',
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        mb: 2,
                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
                        '&:hover': {
                          boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.45)}`,
                        },
                      }}
                      onClick={() => setShowUpiAppSelector(true)}
                    >
                      Pay ₹{selectedPricingOption?.price.toLocaleString('en-IN')} via UPI
                    </Button>
                  ) : (
                    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Choose Your UPI App
                      </Typography>
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        {[
                          { name: 'PhonePe', scheme: 'phonepe://pay', color: '#5f259f' },
                          { name: 'Google Pay', scheme: 'tez://upi/pay', color: '#4285f4' },
                          { name: 'Paytm', scheme: 'paytmmp://pay', color: '#00baf2' },
                          { name: 'BHIM', scheme: 'bhim://pay', color: '#d32f2f' },
                          { name: 'Amazon Pay', scheme: 'amazonpay://pay', color: '#ff9900' },
                          { name: 'MobiKwik', scheme: 'mobikwik://upi', color: '#e91e63' },
                        ].map((app) => (
                          <Grid item xs={6} key={app.name}>
                            <Button
                              variant="outlined"
                              fullWidth
                              sx={{
                                py: 1.5,
                                borderColor: app.color,
                                color: app.color,
                                fontWeight: 600,
                                '&:hover': {
                                  borderColor: app.color,
                                  backgroundColor: alpha(app.color, 0.1),
                                },
                              }}
                              onClick={() => {
                                const upiId = '9756666993@pthdfc';
                                const name = 'Shirnjani';
                                const amount = selectedPricingOption?.price || 0;
                                const paymentUrl = `${app.scheme}?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

                                window.location.href = paymentUrl;

                                // Copy UPI ID as fallback
                                setTimeout(() => {
                                  navigator.clipboard.writeText(upiId).then(() => {
                                    alert(`If ${app.name} didn't open:\n\nUPI ID copied: ${upiId}\nAmount: ₹${amount.toLocaleString('en-IN')}\n\nPlease paste in ${app.name} manually.`);
                                  });
                                }, 2000);
                              }}
                            >
                              {app.name}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                      <Button
                        size="small"
                        onClick={() => setShowUpiAppSelector(false)}
                        sx={{ color: 'text.secondary' }}
                      >
                        ← Back
                      </Button>
                    </Box>
                  )}
                </>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    maxWidth: 400,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    color: 'white',
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    mb: 2,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
                    '&:hover': {
                      boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.45)}`,
                    },
                  }}
                  onClick={() => {
                    const upiId = '9756666993@pthdfc';
                    const name = 'Shirnjani';
                    const amount = selectedPricingOption?.price || 0;
                    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
                    window.location.href = upiLink;
                  }}
                >
                  Pay ₹{selectedPricingOption?.price.toLocaleString('en-IN')} via UPI
                </Button>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                UPI ID: 9756666993@pthdfc (if supported by your app)
              </Typography>
            </Box>

            <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 3, mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                Upload Payment Screenshot
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                After completing the payment, please upload a screenshot of the payment confirmation:
              </Typography>
              <Button variant="outlined" component="label" fullWidth>
                {paymentFile ? paymentFile.name : 'Upload Payment Screenshot'}
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
            </Box>
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

      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Stepper
          activeStep={activeStep}
          sx={{
            mb: { xs: 3, md: 4 },
            '& .MuiStepLabel-label': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card ref={cardRef} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {renderStepContent()}

          {activeStep < steps.length - 1 && (
            <Box ref={nextButtonRef} sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
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
