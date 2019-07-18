import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    enabled: Boolean,
    spotlight: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
})