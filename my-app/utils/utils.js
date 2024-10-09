export const formatPrice = (price) => {
  return !isNaN(Number(price)) ? price.toLocaleString("vi-VN") : 0;
};

export function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date?.toLocaleDateString("en-US", options);
}

export const normalizeString = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const getPlantIdListinGalery = (galery) => {
  const plantIds = [];
  // console.log(galery);

  if (galery && galery.list_collection_id) {
    galery.list_collection_id.forEach((collection) => {
      if (collection.list_plant_id && collection.list_plant_id.length > 0) {
        plantIds.push(...collection.list_plant_id);
      }
    });
  }

  return plantIds;
};

export const getCollectionIdFromPlantId = (galleryData, plantId) => {
  for (const collection of galleryData.list_collection_id) {
    if (collection.list_plant_id.includes(plantId)) {
      return collection._id; // Return the collection ID
    }
  }
  return null; // Return null if the plant ID is not found
};
