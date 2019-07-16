import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    size: String,
    enabled: Boolean,
    created_at: { type: Date, default: Date.now }
})