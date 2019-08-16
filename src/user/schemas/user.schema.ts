import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    phone: String,
    gender: Boolean,
    cpf: {
        type: String,
        minlength: 11,
        maxlength: 11,
        unique: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
    }]
});