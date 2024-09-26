import productModel from "../Schemas/Product";

export async function addProduct(product: any) {
  try {
    const newProduct = await productModel.create(product);
    return newProduct;
  } catch (error) {
    throw error;
  }
}

export async function getProducts() {
  try {
    const products = await productModel.find();
    return products;
  } catch (error) {
    throw error;
  }
}

module.exports = { addProduct, getProducts };
