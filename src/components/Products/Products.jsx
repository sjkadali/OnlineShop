import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';

const products = [
    { id: 1, name: 'Shoes', description:'Running Shoes.', price: '$30', image:'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/423db3ec-fe0f-4b8d-a98c-d973252ffece/flex-experience-run-9-mens-running-shoe-extra-wide-17FprH.jpg'},
    { id: 2, name: 'Macbook', description:'Apple macbook.', price: '$749', image:'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366612_sd.jpg;maxHeight=640;maxWidth=550'}    
]

const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}> 
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>   
                ))}            
            </Grid>
        </main>
    )    
}

export default Products;