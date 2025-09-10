/** @format */

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let url ="https://home-improvement-tracker-fb992-default-rtdb.firebaseio.com/Projects";

////////////////////////////////////////////////////////////////////

//display images
let inputs = document.querySelectorAll(".image-input");

inputs.forEach((input, index) => {
  input.addEventListener("change", async function () {
    let file = this.files[0];

    if (file) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        // Find the corresponding preview image in the same container
        const preview = this.parentElement.querySelector(".preview");
        preview.src = reader.result;
        preview.style.display = "block";
      });
      reader.readAsDataURL(file);
    }
    //set it to firebase

    

  });
});
//display images

////////////////////////////////////////////////////////////////////

//fetch data which is taken from previous page
let Idcategory, Idbudget, IddateTime, Iddescription, IdendDate, Idimage;

async function showDetail() {
  if (id) {
    let res = await fetch(`${url}/${id}.json`);
    let data = await res.json();
    // console.log(data);
    if (data && data.budget) {
      Idcategory = data.category;
      Idbudget = data.budget;
      projectBudget = Idbudget;
      IddateTime = data.dateTime;
      Iddescription = data.description;
      IdendDate = data.endDate;
    }
    console.log(data)
    displayData(data);
    showBudgetTable(Idbudget); // call budget table (it will now handle the final budget display)
  } else {
    alert("ID not found!");
  }
}
////////////////////////////////////////////////////////////////////

//display category after image
function displayData(Data) {
  let DetailPage = document.getElementById("DetailPage");
  DetailPage.innerHTML = "";

  // card design
  let card = document.createElement("div");
  card.innerHTML = `
    <h4>${Data.category} Design</h4>
  `;
  DetailPage.appendChild(card);
}
//display category after image


////////////////////////////////////////////////////////////////////

// working on task page

let addTask = document.getElementById("addTask");
let addDes = document.getElementById("addDes");
let addBtn = document.getElementById("addBtn");

let taskData = [];

addBtn.addEventListener("click", async () => {
  let addTaskVal = addTask.value;
  let addDesVal = addDes.value;
  if (!addTaskVal || !addDesVal) {
    alert("Add Task and Description Both");
    return;
  }

  //save to firebase
  let allTasks = {
    taskNo: taskData.length + 1, // subtract 1 because we already incremented
    task: addTaskVal,
    description: addDesVal,
    status: "pending",
  };

  await fetch(`${url}/${id}/tasks.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(allTasks),
  });

  addTask.value = "";
  addDes.value = "";

  fetchData();
});

//function for fetch and display Data
async function fetchData() {
  let res = await fetch(`${url}/${id}/tasks.json`);
  let data = await res.json();
  console.log(data);

  taskData = Object.entries(data).map(([id, task]) => {
    return { id, ...task };
  });
  console.log(taskData);

  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

    let completedCount = 0; //Declare outside so we can count accurately


  taskData.forEach((ele) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${ele.taskNo}</td>
      <td>${ele.task}</td>
      <td>${ele.description}</td>
   `;

    //create td element for status
    // Create statusCell and set from Firebase data
    let statusCell = document.createElement("td");
    statusCell.innerText = ele.status === "Completed" ? "Completed" : "Pending";

    // Create checkbox and set checked based on status
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = ele.status === "Completed";

    // Update initial count if already completed
    if (checkbox.checked) completedCount++;

    //  Add checkbox event listener
    checkbox.addEventListener("change", async () => {
      let newStatus = checkbox.checked ? "Completed" : "Pending";
      statusCell.innerText = newStatus;

      //  Update status in Firebase
      await fetch(`${url}/${id}/tasks/${ele.id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      //  Recalculate after change
      fetchData(); // Or call updateCheckedCount() after setting new status in taskData
    });

    ////////////////////
    row.appendChild(statusCell);
    let checkboxCell = document.createElement("td");
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    tbody.appendChild(row);
  });

  // Update Percentage After DOM is ready
  function updateCheckedCount() {
    let totalCount = taskData.length;
    let percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    let showCount = document.getElementById("showCount");
    showCount.innerText = `Completed Tasks: ${Math.floor(percentage)}%`;

    let showPercent = document.getElementById("showPercent");
    showPercent.style.width = `${percentage}%`

  }

    updateCheckedCount();
}

fetchData();
showDetail();


//budget

//fetch material data
let MaterialRates =
  "https://home-improvement-tracker-fb992-default-rtdb.firebaseio.com/MaterialRates";

let materialData = {};
async function fetchMaterial() {
  let res = await fetch(`${MaterialRates}.json`);
  let data = await res.json();
  materialData = data;
  console.log(materialData);
}

fetchMaterial();


//set materialBudget in firebase
let BudgetUrl = `https://home-improvement-tracker-fb992-default-rtdb.firebaseio.com/Projects/${id}/Budget`;


function displayMaterial() {
  let selectMaterial = document.getElementById("selectMaterial");
  let materialQuantity = document.getElementById("materialQuantity");
  
  //update placeholder
  selectMaterial.addEventListener("change", () => {
    let selected = selectMaterial.value;
    if (materialData[selected]) {
      materialQuantity.placeholder = `Quantity in ${materialData[selected].unit}`;
    } else {
      materialQuantity.placeholder = "Enter Quantity";
    }
  });

  let addMaterial = document.getElementById("addMaterial");
  addMaterial.addEventListener("click", async () => {
    let selected = selectMaterial.value;
    let material = selected;
    let rate = materialData[`${selected}`].rate;
    let quantity = Number(materialQuantity.value);
    let total = rate * quantity;


    console.log(material, rate, quantity, total);

    let budgetData = { selected, material, rate, quantity, total };

    await fetch(`${BudgetUrl}.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budgetData),
    });

   // Fetch and display updated data
    showBudgetTable(projectBudget);

    // Clear input fields
    materialQuantity.value = "";
  });
}

// Fetch and display all budget data in a table

async function showBudgetTable(projectBudget){
     let res = await fetch(`${BudgetUrl}.json`);
    let data = await res.json();
    console.log(data)

    let Budget  = Object.entries(data).map(([id,budgetdata])=>{
        return {id,...budgetdata}
    })


     let tbody = document.querySelector("#materialTable tbody");
      tbody.innerHTML = "";
      let list = 1;
   Budget.forEach((item) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${list++}</td>
      <td>${item.material}</td>
      <td>${item.rate}</td>
      <td>${item.quantity}</td>
      <td>${item.total}</td>
    `;
    tbody.appendChild(row);

  });


let totalBudgetUsed = Budget.reduce((acc, item) => acc + Number(item.total), 0);
console.log("Total Budget:", totalBudgetUsed);

 budCal(projectBudget, totalBudgetUsed);

}

function budCal(budgetFromProject, budgetUsed) {
  let finalBudget = document.getElementById("finalBudget");
  finalBudget.innerHTML = "";

let finalAmount = budgetFromProject - budgetUsed

  let h2 = document.createElement("h2");

  if(finalAmount >= 0){
    h2.innerText = `Total Budget Left: ₹${finalAmount}`;
   finalBudget.appendChild(h2);
    finalBudget.style.backgroundColor= "#3be96c"
  }
  else{
   h2.innerText = `Over Budget: ₹${finalAmount}`;
   finalBudget.appendChild(h2);
    finalBudget.style.backgroundColor= "red"
  }
}

displayMaterial();

//download function
function downloadPDF() {
  const element = document.body; // OR use a div like document.getElementById("mainContent")

  const opt = {
    margin:       0.2,
    filename:     'project-page.pdf',
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  {
      scale: 2,
      useCORS: true, // ✅ This enables image loading
      allowTaint: true,
      scrollY: 0
    },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}

