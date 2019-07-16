import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
    coupon: String,
    quantity: Number,
    created_at: { type: Date, default: Date.now }
})