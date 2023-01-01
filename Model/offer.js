
import mongoose from "mongoose";

const Offer = mongoose.Schema({
    id:{
        type: Number,
    },
    investor: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default:0
    },
    equity: {
        type: Number,
        required: true,
    },
    comment:{
        type: String,
    }
},
    {
        timestamps: true,
    })
    

const Offers = mongoose.model("Offers", Offer);

export default Offers

