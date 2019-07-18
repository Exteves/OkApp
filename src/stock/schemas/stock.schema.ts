import * as mongoose from 'mongoose';

export const StockSchema = new mongoose.Schema({
    qtt: Number,
    gender: Boolean,
    size: String,    
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
    },
    created_at: { type: Date, default: Date.now }
})