import { model } from 'mongoose';
import advertiserModel from '../Schemas/Advertiser';
import sellerModel from '../Schemas/Seller';
import tourGuideModel from '../Schemas/TourGuide';

import { Response } from 'express'; 


export async function createUser(user:any,type:string) {
  let model:any;
  switch(type){
    case "advertiser":
      model = advertiserModel;break;
    case "seller":
      model = sellerModel;break;
    case "tourGuide":
      model = tourGuideModel;break;
      
  }
  try {
    await isUniqueUsernameAndEmail(user.username, user.email);
    const newProduct = await model.create(user);
    return newProduct;
  } catch (error) {
    throw error;
  } 
}

async function isUniqueUsernameAndEmail(username: string, email: string) {
  // Check for existing username
  const usernameExists = await Promise.all([
    sellerModel.findOne({ username }),
    advertiserModel.findOne({ username }),
    tourGuideModel.findOne({ username })
  ]);

  if (usernameExists.some(result => result !== null)) {
    throw new Error('Username already exists');
  }

  // Check for existing email
  const emailExists = await Promise.all([
    sellerModel.findOne({ email }),
    advertiserModel.findOne({ email }),
    tourGuideModel.findOne({ email })
  ]);

  if (emailExists.some(result => result !== null)) {
    throw new Error('Email already exists');
  }
}

export async function handleRegisterErrors(err :any , res: any) {
  if (err.message === 'Username already exists') {
    res.status(409).send({ error: err.message });
  } else if (err.message === 'Email already exists') {
    res.status(409).send({ error: err.message });
} else {
    res.status(500).send({ error: err.message });
}

};



module.exports = {createUser,handleRegisterErrors};