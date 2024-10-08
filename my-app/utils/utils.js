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
