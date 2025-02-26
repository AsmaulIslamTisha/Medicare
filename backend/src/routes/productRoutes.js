const express = require('express');
const router = express.Router();

const {
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
} = require('../controllers/productController');

// Standard CRUD & Advanced Query Routes
router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById).put(updateProduct).patch(patchProduct).delete(deleteProduct);

// Advanced Endpoints
router.route('/:id/review').post(addReview);
router.route('/:id/like').patch(likeProduct);
router.route('/:id/similar').get(getSimilarProducts).post(addSimilarProduct);
router.route('/popular').get(getPopularProducts);
router.route('/stats').get(getProductStats);

module.exports = router;
