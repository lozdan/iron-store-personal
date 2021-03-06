const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const uploadCloud = require('../configs/cloudinary');

router.get('/', (req, res, next) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.json(err));
})

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(theProduct => { res.json(theProduct); })
        .catch(err => console.log(err));
});

router.get('/category-name/:categoryName', (req, res, next) => {
    Product.find({ category: req.params.categoryName })
        .then(products => res.json(products))
        .catch(err => console.log(err))
})

router.post('/new', uploadCloud.single('photo'), (req, res, next) => {
    let newProduct = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        picturePath: req.file.url
    };

    Category.findOne({ name: req.body.category })
        .then(query => {
            if (query) {
                console.log("req.body: ", req.body)
                Product.create(newProduct)
                    .then(createdProduct => res.json(createdProduct))
                    .catch(err => res.json(err))
            }
            else
                res.json({ err: "Category not found" })
        })
        .catch(err => res.json(err));

})

router.post('/update/:id', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then(beforeUpdate => res.json(beforeUpdate))
        .catch(err => res.json(err))
})

router.post('/delete/:id', (req, res, next) => {
    Product.findByIdAndRemove(req.params.id)
        .then(deleted => res.json(deleted))
        .catch(err => res.json(err));
})


module.exports = router;
