import { ITourist } from "../Schemas/Tourist";
import touristModel from "../Schemas/Tourist";

  export async function redeemPoints(touristUsername: string , amount:number){
    try{
      const tourist = await touristModel.findOne({username:touristUsername});
      if(!tourist){
        throw new Error("Tourist not found");
      }
      if(tourist.currentLoyaltyPoints<amount){
        throw new Error("Insufficient points");
      }
      if(amount<0){
        throw new Error("Invalid amount");
      }
      tourist.currentLoyaltyPoints-=amount;
      tourist.wallet+=amount/100;
      await tourist.save();
    }
    catch(err){
      throw err;
    }
    
  }



module.exports = {redeemPoints}; 
