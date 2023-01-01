import express from 'express'
import Pitches from "../Model/xhark.js";
import asyncHandler from 'express-async-handler'
import Offers  from '../Model/offer.js';
import filterSinglePitches from './filter.js'
 
 
const router=express.Router()
const filterPitches = (pitch)=>{
    return pitch.map(filterSinglePitches);
}

 
// 1. adding a pitch 
router.post("/", asyncHandler(async(req,resp)=>{
    let id = await Pitches.count({})+1;

    var data = {
            "id": id,
            "entrepreneur":req.body.entrepreneur,
            "pitchTitle": req.body.pitchTitle,
            "pitchIdea" : req.body.pitchIdea,
            "askAmount" : req.body.amount,
            "equity": req.body.equity
        }

    console.log("post request ",data);

    var myData = await Pitches.create(data);
    myData.save()
    .then(item => {
        return resp.status(201).send({ "id" : item.id});
    }).catch(err => {
        return resp.status(400).send("Invalid Request Body");
    });
}));

// 2. make a counter offer for a pitch

router.post("/:pitchid/makeOffer", async(req,resp)=>{
    console.log("in pitches.j"+ req.params.pitchid)
    const pitch = await Pitches.findOne({id: req.params.pitchid});
    let id = pitch.offers.length + 1;

    const data = {
        "id": id,
        "investor": req.body.investor,
        "amount": req.body.amount,
        "equity": req.body.equity,
        "comment": req.body.comment
    }
  console.log("itnenwjen",req.params.pitchid);
    const myData = await Offers.create(data);
    myData.save()
    .then(item=>{
        console.log("itnenwjen",req.params.pitchid);

         Pitches.findOne({ id:req.params.pitchid} ,async(err,pitch)=>{
            if(err){
                resp.status(404).send("Pitch Not Found")
            }else{   
                await pitch.offers.push(myData)
                await pitch.save();
                console.log("not found pitch", pitch);
            }
        return resp.status(201).send({ "id" : item.id});

    })})
    .catch(err => {
        return resp.status(400).send("Invalid Request Body");
    });
});

// 3. fetch the all the pitches in reverse chronological order
router.get("/", asyncHandler(async (req,res)=>{

    await Pitches.find().sort({createdAt: 'desc'}).populate("offers").exec((err,pitch)=>{
        if(err){
            return res.status(404).send("Pitch Not Found");
        }else{
            return res.status(200).send(JSON.stringify(filterPitches(pitch)));
        }
    })
}));



// 4. fetch a single pitch based on ID
router.get("/:pitchid", async(req,res)=>{
    await Pitches.findOne({id: req.params.pitchid}).populate("offers").exec((err,pitch)=>{
        if(err){
            console.log(err);
           // res.status(404).send("Pitch Not Found");
        }
        else if(pitch===null){
            return res.status(404).send("Pitch Not Found")
        }
        else{
            console.log("pitch single",pitch);

            return res.status(200).send(JSON.stringify(filterSinglePitches(pitch)));
        }
    })
  
})
export default router