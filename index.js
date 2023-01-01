import express from 'express'

import router from './Routes/pitches.js';
import connectDB from './config/db.js';


connectDB();



const app = express();           
const port = 8081;    

app.use(express.json());
app.use('/pitches', router);
app.get('/',(req,res)=>{
    res.send('Sharktank')
})
app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});








