const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Restaurant = require('../../models/Restaurant');

// @route   GET api/restaurants
// @desc    Get restaurants for a user
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await Restaurant.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err) {
        console.error(err.message);
        res.status('Server error in authorization');
    }
})


// @route   POST api/restaurants
// @desc    Add a restaurant for a user
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newRestaurant = new Restaurant({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            user: req.user.id,
        });

        const restaurant = await newRestaurant.save();

        res.json(restaurant);
    }
    catch(err) {
        console.error(err.message);
        res.status('Server error in authorization');
    }
})

// @route   GET api/restaurants
// @desc    Get restaurants for a user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const restaurants = await Restaurant.find().sort({ name: -1 })
        res.json(restaurants);
    }
    catch(err) {
        console.error(err.message);
        res.status('Server error in authorization');
    }
})

// @route   GET api/restaurants/:id
// @desc    Get restaurant by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if(!restaurant) {
            return res.status(401).json({ msg: 'Restaurant not found' });
        }

        res.json(restaurant);
    }
    catch(err) {
        console.error(err.message);
        res.status('Server error in authorization');
    }
})

module.exports = router;