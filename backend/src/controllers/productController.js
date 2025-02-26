const Product = require('../models/Product');

// ---------- CRUD Endpoints ---------- //

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Get products with filtering, search, sorting & pagination
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            brand,
            minPrice,
            maxPrice,
            page = 1,
            limit = 10,
            sortBy,
            order,
        } = req.query;

        // Build filter
        let filter = {};
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }
        if (category) filter.category = category;
        if (brand) filter.brand = brand;
        if (minPrice || maxPrice) {
            filter['price.discounted'] = {};
            if (minPrice) filter['price.discounted'].$gte = Number(minPrice);
            if (maxPrice) filter['price.discounted'].$lte = Number(maxPrice);
        }

        // Sorting options
        let sort = {};
        if (sortBy) {
            sort[sortBy] = order === 'desc' ? -1 : 1;
        }

        const skip = (Number(page) - 1) * Number(limit);
        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        const total = await Product.countDocuments(filter);
        res.status(200).json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            products,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('similarProducts');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update a product (full update)
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Partially update a product (PATCH)
// @route   PATCH /api/products/:id
const patchProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ---------- Additional Endpoints ---------- //

// @desc    Add a review to a product and update ratings
// @route   POST /api/products/:id/review
const addReview = async (req, res) => {
    try {
        const { rating, comment, user } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Push new review
        product.ratings.reviews.push({ rating, comment, user });
        // Recalculate average rating and count
        const totalReviews = product.ratings.reviews.length;
        const totalRating = product.ratings.reviews.reduce((acc, review) => acc + review.rating, 0);
        product.ratings.average = totalRating / totalReviews;
        product.ratings.count = totalReviews;
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Increment likes for a product
// @route   PATCH /api/products/:id/like
const likeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get similar products for a given product
// @route   GET /api/products/:id/similar
const getSimilarProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const { page = 1, limit = 5 } = req.query;
        if (!product) return res.status(404).json({ message: 'Product not found' });
        const similar = await Product.find({ _id: { $in: product.similarProducts } })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));
        res.status(200).json(similar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Add a similar product reference
// @route   POST /api/products/:id/similar
const addSimilarProduct = async (req, res) => {
    try {
        const { similarProductId } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.similarProducts.includes(similarProductId)) {
            return res.status(400).json({ message: 'Similar product already added' });
        }

        product.similarProducts.push(similarProductId);
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get popular products (by likes & views)
// @route   GET /api/products/popular
const getPopularProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ likes: -1, views: -1 })
            .limit(10);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get aggregated product statistics
// @route   GET /api/products/stats
const getProductStats = async (req, res) => {
    try {
        const stats = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalProducts: { $sum: 1 },
                    averagePrice: { $avg: '$price.discounted' },
                    averageRating: { $avg: '$ratings.average' },
                },
            },
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    patchProduct,
    deleteProduct,
    addReview,
    likeProduct,
    getSimilarProducts,
    addSimilarProduct,
    getPopularProducts,
    getProductStats,
};
