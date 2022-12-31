import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postAddProduct, postRegis } from '../services/Myservice';
import Alert from '@mui/material/Alert';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Addproduct() {
  const [state, setState] = useState({ errMsg: '', succMsg: '', imagePath: '' })
  const uploadImage = (event) => {
    if (event.target.files.length > 0) {
      setState({ ...state, imagePath: event.target.files[0] })
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.imagePath != '') {
      if (state.imagePath.type == "image/jpg" || state.imagePath.type == "image/jpeg" || state.imagePath.type == "image/png" || state.imagePath.type == "image/jfif") {
        // when we upload any attachment we can send the data with FormData 
        const data = new FormData(event.currentTarget);
        const senddata = new FormData();
        senddata.append("name", data.get('name'));
        senddata.append("category", data.get('category'));
        senddata.append("price", data.get('price'));
        senddata.append("description", data.get('description'));
        senddata.append("manufacturer", data.get('manufacturer'));
        senddata.append("availableItems", data.get('availableItems'));
        senddata.append("attach", state.imagePath);
        postAddProduct(senddata)
          .then(res => {
            if (res.data.err == 0) {
              setState({ ...state, succMsg: res.data.msg })
            }
            if (res.data.err == 1) {
              setState({ ...state, errMsg: res.data.msg })
            }
          })

      }
      else {
        setState({ ...state, errMsg: "Only support Jpg and Png Image" })
      }
    }
    else {
      setState({ ...state, errMsg: "Please select a image" })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          {state.errMsg != '' && <Alert severity="error">{state.errMsg}</Alert>}
          {state.succMsg != '' && <Alert severity="success">{state.succMsg}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  autoComplete="Category"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="description"
                  type="text"
                  id="description"
                  autoComplete="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="manufacturer"
                  label="manufacturer"
                  name="manufacturer"
                  autoComplete="manufacturer"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="availableItems"
                  label="availableItems"
                  name="availableItems"
                  autoComplete="availableItems"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="file"
                  id="image"
                  label="Image"
                  name="image"
                  autoComplete="image"
                  onChange={uploadImage}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}