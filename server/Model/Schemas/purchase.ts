import mongoose from "mongoose";

const schema = mongoose.Schema;
const purchaseSchema = new schema({
    tourist: { type: mongoose.Types.ObjectId, required: true, ref: "Tourist" },
    product: { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
    
});

export default mongoose.model("Purchase", purchaseSchema);