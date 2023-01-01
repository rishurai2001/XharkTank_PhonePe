import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from "colors";
import data from "./data.js";
import connectDB from "../config/db.js";
import Pitches from "./xhark.js";
import Offers from "./offer.js";

dotenv.config();

connectDB();

const importData = async () => {
    try{
      await Pitches.deleteMany();
      await Offers.deleteMany();

      const createdUsers = await Pitches.insertMany(data);
      const adminUser = createdUsers[0]._id;
      console.log("data imported ".green.inverse);
      process.exit();

    }
    catch(error){
        console.error(`${error}`.red.inverse)
        process.exit(1);
    }
}


const destroyData = async () => {
    try{
     
      await Pitches.deleteMany();
      await Offers.deleteMany();

      console.log("data deleted! ".red.inverse);
      process.exit();
    }
    catch(error){
        consol.error(`${error}`.red.inverse)
        process.exit(1);
    }
}

if(process.argv[2]==='-d'){
 destroyData();
}else{
    importData();
}
