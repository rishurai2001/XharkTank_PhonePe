import mongoose from 'mongoose'
// import mongodb from 'mongoClient'
import autoIncrement from "mongoose-auto-increment"


const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/xharktank", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
   
    console.log(`MongoDB Connected: ${conn.connection.host}`)
     
  } catch (error) {
    console.error(`Error: ${error.message}`)
    
    process.exit(1)
  }
}
 
export default connectDB