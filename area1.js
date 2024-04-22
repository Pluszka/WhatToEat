const products = [
    "Kawa",
    "4",
    "5",
    "6",
    "Jajka",
    "7",
    "8","9",
    "00",
    "000",
    "0000",
    "3",
    "Masło",
    "Cukier","Kawa",
    "00000",
    "Chle000b",
    "Mlek000o",
    "2",
    "Masło",
    "Cuki0er","Ka0wa",
    "Herba0ta",
    "Chleb",
    "Mleko",
    "1",
    "Masło",
    "Cukier","K0awa",
    "Herbata",
    "Ch0leb",
    "Mle0ko",
    "Jaj0ka",
    "Ma0sło",
    "C0ukier",
    "Masło",
    "Cuki0er","Ka0wa",
    "Herba0ta",
    "Chleb",
    "Mleko",
    "1",
    "Masło",
    "Cukier","K0awa",
    "Herbata",
    "Ch0leb",
    "Mle0ko",
    "Jaj0ka",,
    "Masło",
    "Cuki0er","Ka0wa",
    "Herba0ta",
    "Chleb",
    "Mleko",
    "1",
    "Masło",
    "Cukier","K0awa",
    "Herbata",
    "Ch0leb",
    "Mle0ko",
    "Jaj0ka",,
    "Masło",
    "Cuki0er","Ka0wa",
    "Herba0ta",
    "Chleb",
    "Mleko",
    "1",
    "Masło",
    "Cukier","K0awa",
    "Herbata",
    "Ch0leb",
    "Mle0ko",
    "Jaj0ka",,
    "Masło",
    "Cuki0er","Ka0wa",
    "Herba0ta",
    "Chleb",
    "Mleko",
    "1",
    "Masło",
    "Cukier","K0awa",
    "Herbata",
    "Ch0leb",
    "Mle0ko",
    "Jaj0ka",
  ];

 
  const productList = document.getElementById("product-list");
  
  const productCountDiv = document.getElementById("product-count");

  
  const clickInfo = {};

  
  function handleClick(event) {
    const clickedItem = event.target;
    const productName = clickedItem.textContent;

    
    if (clickInfo[productName]) {
   
      clickedItem.classList.remove("clicked");
      
      delete clickInfo[productName];
    } else {
    
      clickedItem.classList.add("clicked");
  
      clickInfo[productName] = true;
    }

 
    productCountDiv.textContent = `Ilość wybranych produktów: ${Object.keys(clickInfo).length}`;

   
    if (clickedItem.classList.contains("framed")) {
      clickedItem.classList.remove("framed");
    } else {
      clickedItem.classList.add("framed");
    }

   
    if (clickedItem.classList.contains("green-bordered")) {
      clickedItem.classList.remove("green-bordered");
    } else {
      clickedItem.classList.add("green-bordered");
    }
  }

  
  function handleMouseOver(event) {
    const hoveredItem = event.target;
    hoveredItem.classList.add("highlighted");
  }

 
  function handleMouseOut(event) {
    const hoveredItem = event.target;
    hoveredItem.classList.remove("highlighted");
  }

 
  products.forEach(product => {
    const listItem = document.createElement("li");
    listItem.textContent = product;
    productList.appendChild(listItem);

   
    listItem.addEventListener("click", handleClick);

    
    listItem.addEventListener("mouseover", handleMouseOver);
    listItem.addEventListener("mouseout", handleMouseOut);
  });