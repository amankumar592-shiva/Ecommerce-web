import mongoose, { mongo } from 'mongoose'

const orderSchema = new mongoose.Schema({

    products: [
        {
            type: mongoose.ObjectId,
            ref: "Product"
        },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "users",
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    }, 


},
 { timestamp: true}
);

export default mongoose.model("order", orderSchema);