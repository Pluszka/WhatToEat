const tableContainer = document.getElementById("table-container");
const songs = [
  {
    image: "food1.jpg",
    title: "Food 1",
  },
  {
    image: "food2.jpg",
    title: "Food 2",
  },
  {
    image: "food4.jpg",
    title: "Food 4",
  },
  {
    image: "food3.jpg",
    title: "Food 3",
  },
  {
    image: "food5.jpg",
    title: "Food 5",
  },
  {
    image: "food7.jpg",
    title: "Food 7",
  },
  {
    image: "food8.jpg",
    title: "Food 8",
  },
  {
    image: "food8.jpg",
    title: "Food 8",
  },
  {
    image: "food8.jpg",
    title: "Food 8",
  },
  {
    image: "food8.jpg",
    title: "Food 8",
  },
  {
    image: "food8.jpg",
    title: "Food 8",
  },
  {
    image: "food8.jpg",
    title: "Food 8",
  },
  {
    image: "food8.jpg",
    title: "Food 8",
  },

];

const createTable = (rows, cols) => {
  const table = [];
  for (let i = 0; i < rows; i++) {
    table.push([]);
    for (let j = 0; j < cols; j++) {
      table[i].push(null);
    }
  }
  return table;
};

const createPictureContainer = (song) => {
  const pictureContainer = document.createElement("div");
  pictureContainer.classList.add("picture-container");

  const img = document.createElement("img");
  img.src = song.image;
  img.alt = song.title;
  pictureContainer.appendChild(img);

  return pictureContainer;
};

const numRows = Math.ceil(songs.length / 2);
const numCols = Math.max(2, songs.length);
const table = createTable(numRows, numCols);

for (let i = 0; i < songs.length; i++) {
  const row = Math.floor(i / numCols);
  const col = i % numCols;
  table[row][col] = createPictureContainer(songs[i]);
}

table.forEach((row) => {
  row.forEach((cell) => {
    if (cell) {
      tableContainer.appendChild(cell);
    }
  });
});