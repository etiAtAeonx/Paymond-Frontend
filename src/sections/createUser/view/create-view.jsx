/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unknown-property */
/* eslint-disable import/no-extraneous-dependencies */
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Grid, Card, Button, TextField, Container, Typography } from '@mui/material';


const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  companyName: Yup.string().required('Company name is required'),
  departmentName: Yup.string().required('Department name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  companyWebsite: Yup.string().url('Invalid URL').required('Company website is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  zipcode: Yup.string().required('Zipcode is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
});

const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      departmentName: '',
      email: '',
      phone: '',
      companyWebsite: '',
      street: '',
      city: '',
      zipcode: '',
      state: '',
      country: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container>
      <Typography sx={{ mb: 5 }} variant="h4" gutterBottom>
        Raymonds Digital Business Card
      </Typography>
      <Card sx={{ p: 3}}>
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
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            {/* <Typography variant="h4" gutterBottom>
            Organization Section
          </Typography> */}

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="companyName"
                name="companyName"
                label="Company Name"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                helperText={formik.touched.companyName && formik.errors.companyName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="departmentName"
                name="departmentName"
                label="Department Name"
                value={formik.values.departmentName}
                onChange={formik.handleChange}
                error={formik.touched.departmentName && Boolean(formik.errors.departmentName)}
                helperText={formik.touched.departmentName && formik.errors.departmentName}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="companyWebsite"
                name="companyWebsite"
                label="Company Website"
                value={formik.values.companyWebsite}
                onChange={formik.handleChange}
                error={formik.touched.companyWebsite && Boolean(formik.errors.companyWebsite)}
                helperText={formik.touched.companyWebsite && formik.errors.companyWebsite}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="street"
                name="street"
                label="Street"
                value={formik.values.street}
                onChange={formik.handleChange}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="zipcode"
                name="zipcode"
                label="Zipcode"
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                helperText={formik.touched.zipcode && formik.errors.zipcode}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} container spacing={2} gridRow={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="state"
                name="state"
                label="State"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
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
          <Button color="primary" variant="contained" type="submit" style={{ marginTop: '16px' }}>
            Reset
          </Button>
        </form>
        {/* <img width={300} height={300} src={Scan} alt="" /> */}
      </Card>
    </Container>
  );
};

export default MyForm;
