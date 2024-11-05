import mongoose from "mongoose";
import productModel from "../Schemas/Product";

export async function addProduct(product: Object) {
  try {
    const newProduct = await productModel.create(product);
    return newProduct;
  } catch (error) {
    throw error;
  }
}

export async function getProducts() {
  try {
    const products = await productModel.find().populate("seller");
    return products;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(ObjectId: string | mongoose.Types.ObjectId) {
  try {
    const product = await productModel.findById(ObjectId);
    return product;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(ObjectId: string, newProduct: Object) {
  try {
    const product = await productModel.findByIdAndUpdate(ObjectId, newProduct);
    return product;
  } catch (error) {
    throw error;
  }
}

export async function toggleProductArchive(ObjectId: string) {
  try {
    const product = await productModel.findById(ObjectId);
    if (product) {
      product.isArchived = !product.isArchived;
      const newProduct = await product.save();
      return newProduct;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function decrementProductQuantity(
  ObjectId: string | mongoose.Types.ObjectId,
  quantity: number
) {
  try {
    const product = await productModel.findById(ObjectId);
    if (product) {
      const prodQuantity = product.quantity;
      product.quantity = prodQuantity - quantity;
      const newProduct = await product.save();
      return newProduct;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function getExternalSellers() {
  try {
    const externalSellers = await productModel.find().select("externalseller");
    const sellerNames = [
      ...new Set(
        externalSellers
          .filter(
            (product) => product.externalseller && product.externalseller !== ""
          )
          .map((product) => product.externalseller)
      ),
    ];
    return sellerNames;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  toggleProductArchive,
  decrementProductQuantity,
  getExternalSellers,
};
