export const formatPrice = (price) => {
  return !isNaN(Number(price)) ? price.toLocaleString("vi-VN") : 0;
};

export function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date?.toLocaleDateString("en-US", options);
}

export function formatTime(isoString) {
  const date = new Date(isoString);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // if hour is 0, set it to 12 for 12-hour format

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${formattedMinutes} ${ampm}`;
}

export function formatDateMonthYear(isoString) {
  const date = new Date(isoString);
  const month = date.getUTCMonth() + 1; // Months are 0-based, so we add 1
  const year = date.getUTCFullYear();

  return `${month < 10 ? "0" + month : month}/${year}`;
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

export const successfulStatus = (status) => {
  return status >= 200 && status < 300;
};

export const formatPhoneNumber = (phoneNumber, callingCode) => {
  // Remove the leading '0' if present
  const formattedNumber = phoneNumber.startsWith("0")
    ? phoneNumber.substring(1)
    : phoneNumber;

  // Return the formatted phone number with calling code
  return `${callingCode}${formattedNumber}`;
};
