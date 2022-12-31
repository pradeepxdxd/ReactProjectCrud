import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/system';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { remove } from '../store/cartSlice';

export default function Cart() {
    const product = useSelector(state => state.cart);
    const dispatch = useDispatch();
    return (
        <div>
            <Container maxWidth="sm">
                <h3 style={{ textAlign: 'center' }}>Product Details</h3>
                {
                    product?.map(item =>
                        <div key={item._id}>
                            <Card sx={{ maxWidth: 550 }}>
                                <CardHeader
                                    title={item.name}
                                    subheader={item.category}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={item.imageURL}
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        This impressive paella is a perfect party dish and a fun meal to cook
                                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                                        if you like.
                                    </Typography>
                                </CardContent>
                                <Button variant="outlined" color="error" onClick={() => dispatch(remove(item._id))}>
                                    remove
                                </Button>
                            </Card>
                            <br/>
                        </div>
                    )
                }
            </Container>
        </div>
    )
}