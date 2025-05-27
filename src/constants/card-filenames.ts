export const imageCardFilenames = [
  "image-001.jpg","image-002.jpg","image-003.jpg","image-004.jpg","image-005.jpg","image-006.jpg","image-007.jpg","image-008.jpg","image-009.jpg","image-010.jpg","image-011.jpg","image-012.jpg","image-013.jpg","image-014.jpg","image-015.jpg","image-016.jpg","image-017.jpg","image-018.jpg","image-019.jpg","image-020.jpg","image-021.jpg","image-022.jpg","image-023.jpg","image-024.jpg","image-025.jpg","image-026.jpg","image-027.jpg","image-028.jpg","image-029.jpg","image-030.jpg","image-031.jpg","image-032.jpg","image-033.jpg","image-034.jpg","image-035.jpg","image-036.jpg","image-037.jpg","image-038.jpg","image-039.jpg","image-040.jpg","image-041.jpg","image-042.jpg","image-043.jpg","image-044.jpg","image-045.jpg","image-046.jpg","image-047.jpg","image-048.jpg","image-049.jpg","image-050.jpg","image-051.jpg","image-052.jpg","image-053.jpg","image-054.jpg","image-055.jpg","image-056.jpg","image-057.jpg","image-058.jpg","image-059.jpg","image-060.jpg","image-061.jpg","image-062.jpg","image-063.jpg","image-064.jpg","image-065.jpg","image-066.jpg","image-067.jpg","image-068.jpg","image-069.jpg","image-070.jpg","image-071.jpg","image-072.jpg","image-073.jpg","image-074.jpg","image-075.jpg","image-076.jpg"
];

export const wordCardFilenames = [
  "word-001.jpg","word-002.jpg","word-003.jpg","word-004.jpg","word-005.jpg","word-006.jpg","word-007.jpg","word-008.jpg","word-009.jpg","word-010.jpg","word-011.jpg","word-012.jpg","word-013.jpg","word-014.jpg","word-015.jpg","word-016.jpg","word-017.jpg","word-018.jpg","word-019.jpg","word-020.jpg","word-021.jpg","word-022.jpg","word-023.jpg","word-024.jpg","word-025.jpg","word-026.jpg","word-027.jpg","word-028.jpg","word-029.jpg","word-030.jpg","word-031.jpg","word-032.jpg","word-033.jpg","word-034.jpg","word-035.jpg","word-036.jpg","word-037.jpg","word-038.jpg","word-039.jpg","word-040.jpg","word-041.jpg","word-042.jpg","word-043.jpg","word-044.jpg","word-045.jpg","word-046.jpg","word-047.jpg","word-048.jpg","word-049.jpg","word-050.jpg","word-051.jpg","word-052.jpg","word-053.jpg","word-054.jpg","word-055.jpg","word-056.jpg","word-057.jpg","word-058.jpg","word-059.jpg","word-060.jpg","word-061.jpg","word-062.jpg","word-063.jpg","word-064.jpg","word-065.jpg","word-066.jpg","word-067.jpg","word-068.jpg","word-069.jpg","word-070.jpg","word-071.jpg","word-072.jpg","word-073.jpg","word-074.jpg","word-075.jpg","word-076.jpg","word-077.jpg","word-078.jpg","word-079.jpg","word-080.jpg","word-081.jpg","word-082.jpg","word-083.jpg","word-084.jpg","word-085.jpg","word-086.jpg","word-087.jpg","word-088.jpg"
];

function getRandomImageCardFilename() {
  const idx = Math.floor(Math.random() * imageCardFilenames.length);
  return imageCardFilenames[idx];
}
function getRandomWordCardFilename() {
  const idx = Math.floor(Math.random() * wordCardFilenames.length);
  return wordCardFilenames[idx];
}