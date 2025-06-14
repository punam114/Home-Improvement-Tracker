function goToPage(){
    window.location.href = "DashboardPage.html"
}

let url = "https://home-improvement-tracker-fb992-default-rtdb.firebaseio.com/houseDesigns.json";

let designData = []

async function fetchData(){
  let res = await fetch(url);
  let data = await res.json();
  console.log(data)
  designData = [...data]
  displayData(data)
}

function displayData(data){
    let designBox = document.getElementById("designBox");
    designBox.innerHTML = "";

    data.forEach((ele)=>{
        let card = document.createElement("div")
        card.innerHTML = `
          <img src="${ele.image}" alt="${ele.designName}">
          <h3>Area - ${ele.areaName}</h3>
          <h4>Design - ${ele.designName}</h4>
          <h4>Budget - ${ele.budget}</h4>
        `
        designBox.appendChild(card)
    })
}

//debouncing for search 
let timer;
let searchArea = document.getElementById("searchArea");
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click",()=>{
    let searchVal = searchArea.value;
    let filterSearch = designData.filter((design) => 
        design.designName.toLowerCase().includes(searchVal.toLowerCase())
    )
    searchArea.value = "";
    clearTimeout(timer);

    timer = setTimeout(() => {
        displayData(filterSearch)
    },1000);

})

//sort on budget
let budget = document.getElementById("budget");

budget.addEventListener("change", () => {
    let sortVal = budget.value;
    console.log("Selected value:", sortVal); // Check what you are getting
    let sortBudget = [...designData];

    if (sortVal === "High to Low") {
        sortBudget.sort((a, b) => b.budget - a.budget);
    } else if (sortVal === "Low to High") {
        sortBudget.sort((a, b) => a.budget - b.budget);
    }

    console.log("Sorted Data:", sortBudget); // Check if sorting worked
    displayData(sortBudget);
});

//filter of area
let areas = document.getElementById("areas");
areas.addEventListener("change",()=>{
    let filterVal = areas.value;

let filteredArea = designData.filter((design) =>
  design.areaName.toLowerCase().includes(filterVal.toLowerCase())
)
displayData(filteredArea)
})


fetchData()