import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    coupon: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});