const mongoose = require("mongoose");

const salesSchema = mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    },
    companyPrice: {
      type: Number,
      required: true,
    },
    sale_price: {
      type: Number,
      required: true,
    },
    stock_qty: {
      type: Number,
      required: true,
    },
    sell_revenue:{
      type: Number,
      required: true,
    },
    saleDay: {
      type: String,
      required: true,
    },
    sale_date: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);

const SalesModel = mongoose.model('Sales', salesSchema);

module.exports = SalesModel;
