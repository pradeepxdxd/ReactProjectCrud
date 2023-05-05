import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { getProducts, isAdmin, isLoggedIn } from '../services/Myservice';
import { searchProduct } from '../services/Myservice';
import { useDispatch, useSelector } from 'react-redux';
import {addPro} from '../store/searchProSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector(state => state.cart);

  const handleSearch = (event) => {
    let result = event.target.value;
    if (result) {
      searchProduct(result)
        .then(res => {
          dispatch(addPro(res.data.prodata));
        })
        .catch(err => err);
    }
    else {
      getProducts()
        .then(res => {
          dispatch(addPro(res.data.prodata));
        })
        .catch(err => err);
    }
  }

  const doLogout = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product App
          </Typography>
          {isLoggedIn() &&
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
              />
            </Search>
          }
          {!isLoggedIn() && <>
            <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/regis')}>SignUp</Button> </>
          }

          {/* {isLoggedIn() && <>
            <Button color="inherit" onClick={() => navigate('/products')}>Home</Button>
            {isAdmin() &&
              <> <Button color="inherit" onClick={() => navigate('/addproduct')}>Add Product</Button> </>}
            <Button color="inherit" onClick={() => navigate('/cart')}>Cart <span style={{ color: 'pink', marginLeft: '4px' }}> {item.length}</span></Button>
            <Button color="inherit" onClick={() => doLogout()}>Logout</Button>
          </>} */}

          {(isLoggedIn() && !isAdmin()) && <>
            <Button color="inherit" onClick={() => navigate('/products')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/cart')}>Cart <span style={{ color: 'pink', marginLeft: '4px' }}> {item.length}</span></Button>
            <Button color="inherit" onClick={() => doLogout()}>Logout</Button>
          </>}

          {
            (isLoggedIn() && isAdmin()) && <>
              <Button color="inherit" onClick={() => navigate('/products')}>Home</Button>
              <Button color="inherit" onClick={() => navigate('/addproduct')}>Add Product</Button>
              <Button color="inherit" onClick={() => doLogout()}>Logout</Button>
            </> 
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}