const express = require('express');
const cors = require('cors');
const products = require('./data/products');
const users = require('./data/users');

const app = express();

app.use(express.json());

app.use(cors());

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) =>
        user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    res.json({
        message: 'Login successfully',
        user: {
            name: user.name,
            email: user.email
        }
    })
})

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    users.push({
        name, email, password
    });
    res.status(201).json({
        message: 'User created successfully'
    });
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === id);

    if (!product)
        return res.status(404).json({
            message: 'Product not found'
        });

    res.json(product)
})

app.listen(3000, () => {
    console.log("server is running on port 300")
});

