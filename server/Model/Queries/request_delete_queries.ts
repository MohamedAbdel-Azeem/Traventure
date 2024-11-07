import e from 'express';
import Tourist from '../Schemas/Tourist';
import TourGuide from '../Schemas/TourGuide';
import Seller from '../Schemas/Seller';
import Advertiser from '../Schemas/Advertiser';

export async function deleteRequestDelete (user_id: string, type:string, isAccepted: boolean) {;
    if(isAccepted){
       
        if(type === "advertiser"){
            await Advertiser.findOneAndDelete({_id:user_id});
        }else if(type === "seller"){
            await Seller.findOneAndDelete({_id: user_id});
        }else if(type === "tourguide"){
            await TourGuide.findOneAndDelete({_id: user_id});
        }else if(type === "tourist"){
            await Tourist.findOneAndDelete({_id: user_id});
        }
        return "Deleted";
}
};

module.exports = {deleteRequestDelete};
