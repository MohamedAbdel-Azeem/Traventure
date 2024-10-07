import { model } from 'mongoose';
import advertiserModel from '../Schemas/Advertiser';
import sellerModel from '../Schemas/Seller';
import tourGuideModel from '../Schemas/TourGuide';
import adminModel from '../Schemas/Admin';
import touristModel from '../Schemas/Tourist';

import { Response } from 'express'; 
import { hashPassword } from '../../utils/functions/bcrypt_functions';


export async function createUser(user:any,type:string) {
  let model:any;
  switch(type){
    case "advertiser":
      model = advertiserModel;break;
    case "seller":
      model = sellerModel;break;
    case "tourGuide":
      model = tourGuideModel;break;
    case "admin":
      model = adminModel;break;
    case "tourist":
      model = touristModel;break;
      
  }
  try {
    
    if(model == adminModel){
      await isUniqueUsername(user.username);
    }
    else{
      await isUniqueUsernameAndEmailAndMobileNumber(user.username, user.email, user.mobileNumber);
    }
    user.password = await hashPassword(user.password);
    const newUser = await model.create(user);
    return newUser;
  } catch (error) {
    throw error;
  } 
}

async function isUniqueUsername(username: string) {

    // Check for existing username
    const usernameExists = await Promise.all([
      sellerModel.findOne({ username }),
      advertiserModel.findOne({ username }),
      tourGuideModel.findOne({ username }),
      adminModel.findOne({ username }),
      touristModel.findOne({ username})    
    ]);
  
    const existingModel = usernameExists.find(result => result !== null);
    if (existingModel) {
      throw new Error('Username already exists');
    }
}

async function isUniqueUsernameAndEmailAndMobileNumber(username: string, email: string, mobileNumber: string) {

  // Check for existing username

  try {
    // Check for existing username
    await isUniqueUsername(username);
  } catch (err:any) {
    // If the error is 'Username already exists', rethrow it to be handled later
    if (err.message === 'Username already exists') {
      throw err;
    } else {
      // Handle other potential errors
      throw new Error('An unexpected error occurred while checking the username');
    }
  }

  // Check for existing email
  try{
    await isUniqueEmail(email);
  }
  catch(err:any){
    if (err.message === 'Email already exists') {
      throw err;
    } else {
      throw new Error('An unexpected error occurred while checking the email');
    }
  }

  // Check for existing mobile number
  try{
    await isUniqueMobileNumber(mobileNumber);
  }
  catch(err:any){
    if (err.message === 'Mobile number already exists') {
      throw err;
    } else {
      throw new Error('An unexpected error occurred while checking the mobile number');
    }
  }


}

async function isUniqueEmail(email: string) {
  if(email === undefined){
    return;
  }

    // Check for existing email
    const emailExists = await Promise.all([
      sellerModel.findOne({ email }),
      advertiserModel.findOne({ email }),
      tourGuideModel.findOne({ email }),
      touristModel.findOne({ email })
    ]);
  
    if (emailExists.some(result => result !== null)) {
      throw new Error('Email already exists');
    }

}

async function isUniqueMobileNumber(mobileNumber: string) {
  if(mobileNumber === undefined){
    return;
  }
      // Check for existing email
      const mobileNumberExists = await Promise.all([
        sellerModel.findOne({ mobileNumber }),
        advertiserModel.findOne({ mobileNumber }),
        tourGuideModel.findOne({ mobileNumber }),
        touristModel.findOne({ mobileNumber })
      ]);
      
      if (mobileNumberExists.some(result => result !== null)) {
        throw new Error('Mobile number already exists');
      }

}


export async function handleRegisterErrors(err: any, res: any) {
  if (err.message === 'Username already exists') {
    res.status(409).send({ error: err.message });
  } else if (err.message === 'Email already exists') {
    res.status(409).send({ error: err.message });
} else if (err.message === 'Mobile number already exists') {
    res.status(409).send({ error: err.message });
} 
else {
    res.status(500).send({ error: err.message });
}

};



module.exports = {createUser,handleRegisterErrors , isUniqueUsername, isUniqueUsernameAndEmail: isUniqueUsernameAndEmailAndMobileNumber};