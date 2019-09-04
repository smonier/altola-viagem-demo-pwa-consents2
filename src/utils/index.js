import { mediaPrefix } from "../config";

export const getImageUrl = imageField =>
  imageField &&
  imageField.path &&
  encodeURI(`${mediaPrefix}${imageField.path.path}`);

export const getFeaturedImageUrl = images =>
  images &&
  images.images &&
  images.images.length > 0 &&
  encodeURI(`${mediaPrefix}${images.images[0].path}`);