import React, { useState, useEffect } from 'react'
import { getProducts, deleteProduct } from '../services/Myservice';
import Grid from '@mui/material/Grid';
import ProductDetails from './ProductDetails';
import { useSelector } from 'react-redux';

export default function Products() {
  const [proData, setProdata] = useState([]);
  const product = useSelector(state => state.searchPro);
  let prod;
  if(product === undefined){}
  else if (product.length > 0) {
    prod = product[product.length - 1];
  }

  useEffect(() => {
    getProducts()
      .then(res => {
        if (res.data.err == 0) {
          // console.log(res.data);
          setProdata(res.data.prodata)
        }
      })
      .catch(err => console.log(err))
  }, [])

  const deletePro = (id) => {
    deleteProduct(id).then(() => {
      getProducts()
        .then(res => {
          if (res.data.err == 0) {
            // console.log(res.data);
            setProdata(res.data.prodata)
          }
        })
    })
  }

  return (
    <div>
      <h2> All Products</h2>
      <Grid container spacing={2}>
        {
          prod && prod.length > 0 ?
            prod?.map(item =>
              <Grid item xs={4} key={item._id}>
                <ProductDetails prodata={item} deletePro={deletePro} />
              </Grid>
            )
            :
            proData?.map(pro =>
              <Grid item xs={4} key={pro._id}>
                <ProductDetails prodata={pro} deletePro={deletePro} />
              </Grid>
            )
        }
      </Grid>
    </div>
  )
}

