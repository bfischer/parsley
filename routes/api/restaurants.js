const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Restaurant = require('../../models/Restaurant');
const Table = require('../../models/Table');
const MenuItem = require('../../models/MenuItem');


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

        const restaurants = await Restaurant.find().sort({ name: -1 })
        res.json(restaurants);
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

// @route   DELETE api/restaurants/:id
// @desc    Delete restaurant by ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if(!restaurant) {
            return res.status(401).json({ msg: 'Restaurant not found' });
        }

        if(restaurant.user.toString() !==  req.user.id) {
            return res.statusMessage(401).json({msg: 'User not authorized'})
        }

        await restaurant.remove()

        const restaurants = await Restaurant.find().sort({ name: -1 })
        res.json(restaurants);
    }
    catch(err) {
        console.error(err.message);
        res.status('Server error');
    }
})

// @route   GET api/restaurants/:id/tables
// @desc    Get all tables for a retaurant by restaurant ID
// @access  Private
router.get('/:id/tables', auth, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if(!restaurant) {
            return res.status(401).json({ msg: 'Restaurant not found' });
        }

        const tables = await Table.find({restaurant});

        res.json(tables);
    }
    catch(err) {
        console.error(err.message);
        res.status('Server error');
    }
})

// @route   POST api/restaurants/:id/tables
// @desc    Adds a new table for a restaurant
// @access  Private
router.post('/:id/tables', auth, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if(!restaurant) {
            return res.status(401).json({ msg: 'Restaurant not found' });
        }

        const newTable = new Table({
            name: req.body.name,
            size: req.body.size,
            restaurant: restaurant,
            status: 'Ready',
        });

        await newTable.save();
        const tables = await Table.find({restaurant});

        res.json(tables);
    }
    catch(err) {
        console.error(err.message);
        res.status('Server error');
    }
})

// @route   GET api/restaurants/:id/menu
// @desc    Gets the menu for a retaurant by restaurant ID
// @access  Private
router.get('/:id/menu', auth, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if(!restaurant) {
            return res.status(401).json({ msg: 'Restaurant not found' });
        }

        const menuItems = await MenuItem.find({restaurant});

        res.json(menuItems);
    }
    catch(err) {
        console.error(err.message);
        res.status('Server error');
    }
})

// @route   POST api/restaurants/:id/tables
// @desc    Adds a new menu item for a restaurant
// @access  Private
router.post('/:id/menu', auth, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if(!restaurant) {
            return res.status(401).json({ msg: 'Restaurant not found' });
        }

        const newMenuItem = new MenuItem({
            name: req.body.name,
            type: req.body.type,
            restaurant: restaurant,
            price: req.body.price,
        });

        await newMenuItem.save();
        const menuItems = await MenuItem.find({restaurant});

        res.json(menuItems);
    }
    catch(err) {
        console.error(err.message);
        res.status('Server error');
    }
})

module.exports = router;