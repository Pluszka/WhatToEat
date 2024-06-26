const tableContainer = document.getElementById("table-container");
const dania = [
  {
    image: "assets/burgery.jpg",
    title: "test",
    subtext: "This is a subtext for test",
    subtext1: "This is a subtext for test",
    subtext2: "This is a subtext for test",
    
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

const createPictureContainer = (danie) => {
  const pictureContainer = document.createElement("div");
  pictureContainer.classList.add("picture-container");

  const img = document.createElement("img");
  img.src = danie.image;
  img.alt = danie.title;
  pictureContainer.appendChild(img);

  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = danie.title;
  pictureContainer.appendChild(title);
  
  const subtext = document.createElement("div");
  subtext.classList.add("subtext");
  subtext.textContent = danie.subtext;
  pictureContainer.appendChild(subtext);

  const subtext1 = document.createElement("div");
  subtext1.classList.add("subtext1");
  subtext1.textContent = danie.subtext1;
  pictureContainer.appendChild(subtext1);

  const subtext2 = document.createElement("div");
  subtext2.classList.add("subtext2");
  subtext2.textContent = danie.subtext2;
  pictureContainer.appendChild(subtext2)

  return pictureContainer;
};

const numRows = Math.ceil(dania.length / 2);
const numCols = Math.max(2, dania.length);
const table = createTable(numRows, numCols);

for (let i = 0; i < dania.length; i++) {
  const row = Math.floor(i / numCols);
  const col = i % numCols;
  table[row][col] = createPictureContainer(dania[i]);
}

table.forEach((row) => {
  row.forEach((cell) => {
    if (cell) {
      tableContainer.appendChild(cell);
    }
  });
});