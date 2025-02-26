const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true },
    description: { type: String, trim: true },
    category: { type: String, required: true },
    price: {
      original: { type: Number, required: true },
      discounted: { type: Number, required: true },
      discountPercentage: { type: Number },
    },
    stock: { type: Number, required: true, default: 0 },
    weight: {
      value: { type: Number, required: true },
      unit: { type: String, default: 'mg' },
    },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
      reviews: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          rating: { type: Number, required: true, min: 1, max: 5 },
          comment: { type: String, trim: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
    images: [{ type: String, required: true }],
    similarProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    delivery: {
      timeRange: { type: String, default: '12-24 HOURS' },
      available: { type: Boolean, default: true },
    },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
