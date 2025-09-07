// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY
// This file maps each image src to its thumbnail src for fast grid loading
import { galleryItems } from './galleryItems';

export const galleryThumbnails = Object.fromEntries(
  galleryItems
    .filter(item => item.type === 'image')
    .map(item => [
      item.src,
      item.src.replace('/gallery/media/', '/gallery/thumbnails/')
    ])
);
