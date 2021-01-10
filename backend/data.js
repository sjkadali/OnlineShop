import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Saj',
            email: 'skadalikat@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'sjk',
            email: 'sajna_rajesh@yahoo.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products:[
        {   
            name: 'Slim Shirt',
            category: 'Shirts',
            image: '/images/VH-slim-shirt.jpg',
            price: 34.99,
            brand: 'Van Heusen',
            rating: 5,
            numReviews: 30,
            qtyInStock: 6
        },
        {   
            name: 'Classic Fit Shirt',
            category: 'Shirts',
            image: '/images/classic-fit-vh.jpg',
            price: 33.99,
            brand: 'Van Heusen',
            rating: 4,
            numReviews: 30,
            qtyInStock: 5
        },
        {   
            name: 'Comfort Fit Shirt',
            category: 'Shirts',
            image: '/images/comfortfit-vh.jpg',
            price: 30.99,
            brand: 'Van Heusen',
            rating: 5,
            numReviews: 30,
            qtyInStock: 5
        },
        {   
            name: 'Flexible Pants',
            category: 'Pants',
            image: '/images/FlexStPants-vh.jpg',
            price: 34.99,
            brand: 'Van Heusen',
            rating: 5,
            numReviews: 30,
            qtyInStock: 6
        },
        {   
            name: 'Non Iron Dress Shirt',
            category: 'Shirts',
            image: '/images/classic-fit-vh.jpg',
            price: 33.99,
            brand: 'Van Heusen',
            rating: 5,
            numReviews: 30,
            qtyInStock: 0
        },
]
}

export default data;