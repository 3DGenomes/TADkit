// Chromatin.js
function getChromatin(geometry) {
  if (chromatin[geometry.type])
    return chromatin[geometry.type](geometry);
  else
    return chromatin.basic(geometry);
}