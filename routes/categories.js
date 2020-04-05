const express = require('express');
const router = express.Router();

const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/', function (req, res, next) {
    Category.find(function (err, categories) {
        if (err) return console.log(err);
        res.status(200).json(categories);
    });
    
});
router.delete('/', function (req, res, next) {
    Category.deleteMany(function (err, categories) {
        if (err) return console.log(err);
        res.status(200).json({
            categories
        ,msg:'all categories deleted'
        });
    });
    
});


router.delete('/a', function (req, res, next) {
    Product.deleteMany(function (err, categories) {
        if (err) return console.log(err);
        res.status(200).json({
            categories
        ,msg:'all Product deleted'
        });
    });
    
});

//display all products in a specific Category
router.get('/:category', function (req, res, next) {
    Category.findOne({title: req.params.category}, function (err, category) {
        if (err) return console.log(err);
        Product.find({category: category.title}, function(err, products) {
            if(err) return console.log(err);
            res.status(200).json(products);
        });
    });
});


router.get('/edit/:id', function (req, res, next) {
    // Category.findOne({title: req.params.id}, function (err, category) {
        console.log('done')
        // if (err) return console.log(err);
        Product.findById(req.params.id, function(err, products) {
        //     if(err) return console.log(err);
        //     res.status(200).json(products);
        // });
        res.json({
            products
         })
    });
    
});
router.put('/edit/:id', function (req, res, next) {
    
    console.log('mmm')

    Product.findOneAndUpdate({_id:req.params.id},req.body,  {new:true},  (err,id)=>{
                if(err) res.send(err);
                res.json(
                id
                 ) 
        });
  });


  
module.exports = router;
