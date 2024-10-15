import purchase from '../../Model/Schemas/purchase';

export async function addPurchase(purchaseData: any) {
    try {
        await purchase.create(purchaseData);
    } catch (error) {
        throw error;
    }
}

module.exports = { addPurchase };