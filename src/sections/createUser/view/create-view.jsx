import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import {
  Grid,
  Card,
  Button,
  TextField,
  Container,
  Typography,
  InputAdornment,
} from '@mui/material';
import {
  AccountCircle,
  Email,
  Phone,
  Business,
  LocationCity,
  Public,
  Home,
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  company: Yup.string().required('Company name is required'),
  department: Yup.string().required('Department name is required'),
  designation: Yup.string().required('Designation name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  company_url: Yup.string().url('Invalid URL').required('Company website is required'),
  address: Yup.object({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    postalCode: Yup.string().required('Zipcode is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
  }),
});

const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
      department: '',
      designation: '',
      email: '',
      phone: '',
      company_url: '',
      address: {
        street: '',
        city: '',
        postalCode: '',
        state: '',
        country: '',
      },
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post(
          'http://raymond-digibizcard-alb-239931124.ap-south-1.elb.amazonaws.com/api/employee',
          values
        )
        .then((res) => {
          if (res.data.error) {
            return toast.error(res.data.message);
          } else {
            console.log(res.data);
            formik.resetForm();
            console.log(res.data.message);
            return toast.success(res.data.message);
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error('An unexpected error occurred');
          }
        });
    },
  });

  return (
    <Container>
      <Typography sx={{ mb: 5 }} variant="h4" gutterBottom>
        Raymonds Digital Business Card
      </Typography>
      <Card sx={{ p: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <span>Generate digital business card as QR codes</span>
          <Grid sx={{ mb: 2, mt: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="company"
                name="company"
                label="Company Name"
                value={formik.values.company}
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="department"
                name="department"
                label="Department Name"
                value={formik.values.department}
                onChange={formik.handleChange}
                error={formik.touched.department && Boolean(formik.errors.department)}
                helperText={formik.touched.department && formik.errors.department}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="designation"
                name="designation"
                label="Designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                error={formik.touched.designation && Boolean(formik.errors.designation)}
                helperText={formik.touched.designation && formik.errors.designation}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="company_url"
                name="company_url"
                label="Company Website"
                value={formik.values.company_url}
                onChange={formik.handleChange}
                error={formik.touched.company_url && Boolean(formik.errors.company_url)}
                helperText={formik.touched.company_url && formik.errors.company_url}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Public />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="street"
                name="address.street"
                label="Street"
                value={formik.values.address.street}
                onChange={formik.handleChange}
                error={formik.touched.street && Boolean(formik.errors.address?.street)}
                helperText={formik.touched.street && formik.errors.address?.street}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="city"
                name="address.city"
                label="City"
                value={formik.values.address.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.address?.city)}
                helperText={formik.touched.city && formik.errors.address?.city}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCity />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="postalCode"
                name="address.postalCode"
                label="Zipcode"
                value={formik.values.address.postalCode}
                onChange={formik.handleChange}
                error={formik.touched.postalCode && Boolean(formik.errors.address?.postalCode)}
                helperText={formik.touched.postalCode && formik.errors.address?.postalCode}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="state"
                name="address.state"
                label="State"
                value={formik.values.address.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.address?.state)}
                helperText={formik.touched.state && formik.errors.address?.state}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="country"
                name="address.country"
                label="Country"
                value={formik.values.address.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.address?.country)}
                helperText={formik.touched.country && formik.errors.address?.country}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ mr: 2 }}
            color="primary"
            variant="contained"
            type="submit"
            style={{ marginTop: '16px' }}
          >
            Submit
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={formik.handleReset}
            style={{ marginTop: '16px' }}
          >
            Reset
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default MyForm;