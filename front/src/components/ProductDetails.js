import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { isAdmin, isLoggedIn } from '../services/Myservice';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { incAction } from '../statemanage/action/action';
import { add } from '../store/cartSlice';
import { style } from '@mui/system';

export default function ProductDetails({ prodata, deletePro }) {
  const dispatch = useDispatch();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 220 }}
        image={prodata.imageURL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {prodata.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price : Rs.{prodata.price}
        </Typography>
      </CardContent>
      <CardActions>
        {/* {isLoggedIn() && <>
          <Button size="small">Add Cart</Button>
          <Button size="small" component={NavLink} to={`/product-detail-cart/${prodata._id}`}>Details</Button>
        </>} */}

        {/* {isAdmin() &&
          <>
            <Button size="small" onClick={() => deletePro(prodata._id)}>Delete</Button>
            <Button component={NavLink} size='small' to={`/UpdatePro/${prodata._id}`}>Edit</Button>
          </>} */}
        {
          isAdmin() ?
            <>
              <Button size="small" component={NavLink} to={`/product-detail-cart/${prodata._id}`}>Details</Button>
              <Button size="small" onClick={() => deletePro(prodata._id)}>Delete</Button>
              <Button component={NavLink} size='small' to={`/UpdatePro/${prodata._id}`}>Edit</Button>
            </> : <>
              <Button size="small" onClick={() => dispatch(add(prodata))}>Add Cart</Button>
              <Button size="small" component={NavLink} to={`/product-detail-cart/${prodata._id}`}>Details</Button>
            </>
        }
      </CardActions>
    </Card>
  );
}