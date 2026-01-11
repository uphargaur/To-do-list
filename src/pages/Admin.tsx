import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  useTheme,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { getBookings, updateBooking } from '../utils/supabase';
import { Booking } from '../types';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

const Admin = () => {
  const theme = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadBookings();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setBookings([]);
  };

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await getBookings();
      setBookings(data || []);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setDialogOpen(true);
  };

  const handleVerifyPayment = async (bookingId: string, verified: boolean) => {
    try {
      await updateBooking(bookingId, {
        paymentVerified: verified,
        status: verified ? 'payment_verified' : 'payment_uploaded',
      });
      await loadBookings();
      setDialogOpen(false);
    } catch (err) {
      setError('Failed to update booking');
    }
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      await updateBooking(bookingId, { status: newStatus });
      await loadBookings();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending_payment':
        return 'warning';
      case 'payment_uploaded':
        return 'info';
      case 'payment_verified':
        return 'success';
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.1
          )} 100%)`,
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
              Admin Login
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              sx={{ mb: 3 }}
            />
            <Button fullWidth variant="contained" size="large" onClick={handleLogin}>
              Login
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: alpha(theme.palette.primary.main, 0.02), py: 6 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Admin Dashboard
          </Typography>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            color="error"
          >
            Logout
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                All Bookings
              </Typography>
              <Button variant="contained" onClick={loadBookings} disabled={loading}>
                Refresh
              </Button>
            </Box>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Payment Verified</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography color="text.secondary">No bookings yet</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id.slice(0, 8)}...</TableCell>
                        <TableCell>{booking.clientName}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.sessionDuration} min</TableCell>
                        <TableCell>₹{booking.sessionPrice}</TableCell>
                        <TableCell>
                          <FormControl size="small" sx={{ minWidth: 150 }}>
                            <Select
                              value={booking.status}
                              onChange={(e) =>
                                handleUpdateStatus(booking.id, e.target.value as Booking['status'])
                              }
                            >
                              <MenuItem value="pending_payment">Pending Payment</MenuItem>
                              <MenuItem value="payment_uploaded">Payment Uploaded</MenuItem>
                              <MenuItem value="payment_verified">Payment Verified</MenuItem>
                              <MenuItem value="scheduled">Scheduled</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="cancelled">Cancelled</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          {booking.paymentVerified ? (
                            <Chip label="Verified" color="success" size="small" />
                          ) : (
                            <Chip label="Not Verified" color="warning" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(booking)}
                            color="primary"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Booking Details Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogContent>
            {selectedBooking && (
              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Booking ID:</strong> {selectedBooking.id}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Client Name:</strong> {selectedBooking.clientName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {selectedBooking.clientEmail}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Phone:</strong> {selectedBooking.clientPhone}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Service:</strong> {selectedBooking.service}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Duration:</strong> {selectedBooking.sessionDuration} minutes
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Price:</strong> ₹{selectedBooking.sessionPrice}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Status:</strong>{' '}
                  <Chip label={selectedBooking.status} color={getStatusColor(selectedBooking.status)} size="small" />
                </Typography>

                {selectedBooking.paymentScreenshot && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Payment Screenshot
                    </Typography>
                    <Box
                      component="img"
                      src={selectedBooking.paymentScreenshot}
                      alt="Payment Screenshot"
                      sx={{
                        maxWidth: '100%',
                        maxHeight: 400,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            {selectedBooking && !selectedBooking.paymentVerified && (
              <>
                <Button
                  startIcon={<CancelIcon />}
                  onClick={() => handleVerifyPayment(selectedBooking.id, false)}
                  color="error"
                >
                  Reject Payment
                </Button>
                <Button
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleVerifyPayment(selectedBooking.id, true)}
                  variant="contained"
                  color="success"
                >
                  Verify Payment
                </Button>
              </>
            )}
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Admin;
