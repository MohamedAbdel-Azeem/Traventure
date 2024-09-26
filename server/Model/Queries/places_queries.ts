import placesModel from "../Schemas/Places";

export async function getPlaces() {
  try {
    const places = await placesModel.find();
    return places;
  } catch (error) {
    throw error;
  }
}

export async function getPlace(ObjectId: string) {
  try {
    const place = await placesModel.findById(ObjectId);
    return place;
  } catch (error) {
    throw error;
  }
}

export async function addPlace(place: Object) {
  try {
    const newPlace = await placesModel.create(place);
    return newPlace;
  } catch (error) {
    throw error;
  }
}

export async function updatePlace(ObjectId: string, newPlace: Object) {
  try {
    const place = await placesModel.findByIdAndUpdate(ObjectId, newPlace);
    return place;
  } catch (error) {
    throw error;
  }
}

export async function deletePlace(ObjectId: string) {
  try {
    const place = await placesModel.findByIdAndDelete(ObjectId);
    return place;
  } catch (error) {
    throw error;
  }
}

module.exports = { getPlaces, getPlace, addPlace, updatePlace, deletePlace };
