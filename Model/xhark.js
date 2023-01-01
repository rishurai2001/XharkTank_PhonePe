import mongoose from"mongoose";
import Offers from './offer.js'

const Pitche = mongoose.Schema({
    id:{
        type: Number,
    },
    entrepreneur: {
    type: String,
    unique: true,
    requied: true,
  },
  pitchTitle: {
    type: String,
    unique: true,
    requied: true,
  },
  pitchIdea: {
    type: String,
    requied: true,
  },
  askAmount: {
    type: Number,
    require: true,
    default:1000000000,
  },
  equity:{
      type: Number,
      min:0,
      default:0,
      max:100
  },
  offers:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offers'
  }],
  createdAt: Date,
});


const Pitches = mongoose.model("Pitches", Pitche);
export default Pitches