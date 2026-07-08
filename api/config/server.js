const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '..', '.env')
});

const express = require('express');
const cors = require('cors');
const products = require('../data/products');
const connectDB = require('./db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const authMiddleware = require('../middleware/auth.middleware')

connectDB();

app.use(express.json());

app.use(cors());
console.log(process.env.JWT_SECRET);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email' })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: 'Invalid Password'
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }


});

app.get('/users', authMiddleware, async (req, res) => {
    const users = await User.find();
    res.json(users)
});

app.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        console.log("Saved user:", user);

        res.status(201).json({
            message: 'User created successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
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
});

app.post('/cart', authMiddleware, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const existingProduct = user.cart.find(item => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        user.cart.push({
            productId,
            quantity: 1
        });
    }

    await user.save();

    res.status(200).json({
        message: 'Product added to cart',
    })

});

app.get('/cart', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const cartItems = user.cart.map(item => {

        const product = products.find(p => p.id === item.productId);

        return {
            product,
            quantity: item.quantity
        }

    })

    res.status(200).json(cartItems)

});

app.patch('/cart', authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({
            message: 'Quantity must be at least 1'
        })
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const cartItem = user.cart.find(item => item.productId === productId);

    if (!cartItem) {
        return res.status(404).json({
            message: 'Product not found in cart'
        })
    }

    cartItem.quantity = quantity;

    await user.save();

    res.status(200).json({
        message: 'Cart updated successfully'
    })
});

app.delete('/cart/:productId', authMiddleware, async (req, res) => {

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const { productId } = req.params;

    const cartItem = user.cart.find(item => item.productId === productId);

    if (!cartItem) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }

    user.cart = user.cart.filter(item => item.productId !== productId);

    await user.save();

    res.status(200).json({
        message: 'Product removed from cart'
    })
})

app.post('/wishlist', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const { productId } = req.body;

    const existingInProducts = products.find(product => product.id === productId);

    if (!existingInProducts) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    //When user clicks again faviourite so I'm just removing it.
    const existingProduct = user.wishlist.find(item => item.productId === productId);

    if (existingProduct) {
        user.wishlist = user.wishlist.filter(item => item.productId !== productId);

        await user.save();

        return res.status(200).json({
            message: 'Product removed from wishlist'
        });

    } else {
        user.wishlist.push({
            productId,
        });
    }

    await user.save();

    return res.status(200).json({
        message: 'Product added to wishlist'
    })
});

app.get('/wishlist', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const wishlistItems = user.wishlist.map(item =>
        products.find(product => product.id === item.productId)
    ).filter(Boolean)

    res.status(200).json(wishlistItems)

})

app.delete('/wishlist/:productId', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const { productId } = req.params;

    const wishlistItem = user.wishlist.find(item => item.productId === productId);

    if (!wishlistItem) {
        return res.status(404).json({
            message: 'Product not found in wishlist'
        })
    }

    user.wishlist = user.wishlist.filter(item => item.productId !== productId);

    await user.save();

    res.status(200).json({
        message: 'Product removed from wishlist'
    })

})

app.listen(3000, () => {
    console.log("server is running on port 3000")
});

