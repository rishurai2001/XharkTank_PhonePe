const filterOffers = (offer)=>{
    return{ 
        "id": offer.id,
        "investors": offer.investors,
        "amount": offer.amount,
        "equity": offer.equity,
        "comment": offer.comment
    }
}

const filterOffer = (offers)=>{
    return offers.map(filterOffers);
}
const filterSinglePitches = (pitch)=>{
    return {
        "id" : pitch.id,
        "entrepreneur": pitch.entrepreneur,
        "pitchTitle": pitch.pitchTitle,
        "pitchIdea": pitch.pitchIdea,
        "askAmount": pitch.askAmount,
        "equity": pitch.equity,
        "offers": filterOffer(pitch.offers),
       
    }
}

 
export default filterSinglePitches