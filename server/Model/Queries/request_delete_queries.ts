import e from 'express';
import RequestDelete from '../Schemas/RequestDelete';
import Tourist from '../Schemas/Tourist';
import TourGuide from '../Schemas/TourGuide';
import Seller from '../Schemas/Seller';
import Advertiser from '../Schemas/Advertiser';

export const createRequestDelete = async (user_id:string, name: string, type: string, wallet: number) => {
    const requestDelete = await RequestDelete.create({user_id, name, type, wallet});
    return  requestDelete;
};

export const getRequestDelete = async () => {
    const requestDelete = await RequestDelete.find();
    return requestDelete;
};

export const deleteRequestDelete = async (username: string, isAccepted: boolean) => {
    const requestDelete = await RequestDelete.findOneAndDelete({name: username});
    if(isAccepted){
       
        if (!requestDelete) {
            throw new Error('RequestDelete not found');
        }
       
        if((requestDelete as any).type === "Advertiser"){
            await Advertiser.findOneAndDelete({_id:(requestDelete as any).user_id});
        }else if((requestDelete as any).type === "Seller"){
            await Seller.findOneAndDelete({_id: (requestDelete as any).user_id});
        }else if((requestDelete as any).type === "TourGuide"){
            await TourGuide.findOneAndDelete({_id: (requestDelete as any).user_id});
        }else if((requestDelete as any).type === "Tourist"){
            await Tourist.findOneAndDelete({_id: (requestDelete as any).user_id});
        }
        return requestDelete;

}
};

module.exports = {createRequestDelete, getRequestDelete, deleteRequestDelete};
