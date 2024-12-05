import mongoose from "mongoose";
import productModel, { IFeedback } from "../Schemas/Product";
import Tourist from "../Schemas/Tourist";

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
    const populatedProducts = await Promise.all(
      products.map(async (product) => {
        const populatedFeedback = await Promise.all(
          product.feedback.map(async (feedback) => {
            const tourist = await Tourist.findById(
              feedback.touristId,
              "username"
            );
            return {
              touristId: feedback.touristId,
              rating: feedback.rating,
              review: feedback.review,
              touristUsername: tourist?.username,
            };
          })
        );
        return {
          ...product.toObject(),
          feedback: populatedFeedback,
        };
      })
    );
    return populatedProducts;
  } catch (error) {
    throw error;
  }
}

export async function getProductsWithWishList(touristUsername: string) {
  try {
    const products = await productModel.find().populate("seller");
    let tourist = await Tourist.find({ username: touristUsername }).select(
      "wishlisted_products"
    );

    if (!tourist || tourist.length == 0) throw Error("Tourist Does not Exist");

    const wishList = tourist[0].wishlisted_products;

    const populatedProducts = await Promise.all(
      products.map(async (product) => {
        const populatedFeedback = await Promise.all(
          product.feedback.map(async (feedback) => {
            const tourist = await Tourist.findById(
              feedback.touristId,
              "username"
            );
            return {
              touristId: feedback.touristId,
              rating: feedback.rating,
              review: feedback.review,
              touristUsername: tourist?.username,
            };
          })
        );
        return {
          ...product.toObject(),
          feedback: populatedFeedback,
        };
      })
    );

    populatedProducts.map(
      (product) => (product.isWishListed = wishList.includes(product._id))
    );

    return populatedProducts;
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
export async function getExternalProducts(externalSeller: string) {
  try {
    if (externalSeller) {
      const products = await productModel
        .find({
          externalseller: externalSeller,
        })
        .select("name");
      return products;
    } else {
      const products = await productModel
        .find({
          externalseller: { $exists: true, $ne: "" },
        })
        .select("name");
      return products;
    }
  } catch (error) {
    throw error;
  }
}
export async function addFeedback(ObjectId: string, feedback: IFeedback) {
  try {
    const product = await productModel.findById(ObjectId);

    if (product) {
      const feedbackIndex = product.feedback.findIndex(
        (f) => f.touristId.toString() === feedback.touristId.toString()
      );
      if (feedbackIndex !== -1) {
        product.feedback[feedbackIndex] = {
          ...product.feedback[feedbackIndex],
          touristId: feedback.touristId,
          rating:
            feedback.rating !== undefined && feedback.rating !== null
              ? feedback.rating
              : product.feedback[feedbackIndex].rating,
          review:
            feedback.review !== undefined && feedback.review !== null
              ? feedback.review
              : product.feedback[feedbackIndex].review,
        };
      } else {
        product.feedback.push(feedback);
      }
      return await product.save();
    }
    return null;
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
  addFeedback,
  getProductsWithWishList,
  getExternalProducts,
};
