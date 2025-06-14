/** @format */

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let url = "https://home-improvement-tracker-fb992-default-rtdb.firebaseio.com/Projects";


//fetch data which is taken from previous page
async function showDetail() {
  if (id) {
    let res = await fetch(`${url}/${id}.json`);
    let data = await res.json();
    displayData(data);
    displayTasks(data.tasks || []);
    
} else {
    alert("ID not found!");
}
}

function displayData(DetailData) {
  let DetailPage = document.getElementById("DetailPage");
  DetailPage.innerHTML = "";

  // card design
  let card = document.createElement("div");
  card.innerHTML = `
    <img src="${DetailData.image}" width="400px" />
    <h4>${DetailData.category} Design</h4>
  `;
  DetailPage.appendChild(card);
}

//display all tasks
function displayTasks(tasks) {
  let taskTable = document.getElementById("taskTable");
  taskTable.innerHTML = "";

  if (tasks.length === 0) {
    taskTable.innerHTML = "<p>No tasks added yet.</p>";
    return;
  }

  //calculate completion percentage
  let completedCount = tasks.filter((task) => task.status === "Done").length;
  let totalCount = tasks.length;
  let percentage = Math.round((completedCount / totalCount) * 100);


  let displayStatus = document.createElement("div");
  displayStatus.id ="displayStatus"
  displayStatus.style.marginBottom = "10px";
  displayStatus.innerHTML = `<strong>Project Completion: ${percentage}%</strong>`;
if(`${percentage}` == 100){
    alert("100% task completed");
    
}

  taskTable.appendChild(displayStatus);

  //task table
  let table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Task No.</th>
        <th>Task</th>
        <th>Status</th>
        <th>Mark as Done</th>
      </tr>
    </thead>
    <tbody>
      ${tasks
        .map(
          (task, index) => `
        <tr>
          <td>Task ${index + 1}</td>
          <td>${task.title}</td>
          <td class="status-text">${
            task.status === "Done" ? "Completed" : "Pending"
          }</td>
          <td><input type="checkbox" data-index="${index}" ${
            task.status === "Done" ? "checked" : ""
          } /></td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;
  taskTable.appendChild(table);

  // checkbox event listeners
  let checkboxes = taskTable.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", async function () {
      let index = this.getAttribute("data-index");
      tasks[index].status = this.checked ? "Done" : "Pending";

      await fetch(`${url}/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: tasks }),
      });

      displayTasks(tasks); // Refresh UI
     
    });
  });
}

// Add new task and save to Firebase
document.getElementById("addTask").addEventListener("click", async () => {
  let input = document.getElementById("InputTast").value;
  if (!input) return alert("Please enter a task");

  // Get existing project data
  let res = await fetch(`${url}/${id}.json`);
  let data = await res.json();

  let existingTasks = data.tasks || [];

  // Add new task
  let newTask = { title: input, status: "Pending" };
  existingTasks.push(newTask);

  // update firebase
  await fetch(`${url}/${id}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tasks: existingTasks }),
  });

  displayTasks(existingTasks);

  document.getElementById("InputTast").value = "";
});

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
let BudgetUrl = `https://home-improvement-tracker-fb992-default-rtdb.firebaseio.com/Projects/${id}/budget`;


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
    showBudgetTable();

    // Clear input fields
    materialQuantity.value = "";
  });
}

// Fetch and display all budget data in a table
async function showBudgetTable(){
     let res = await fetch(`${BudgetUrl}.json`);
    let data = await res.json();
    console.log(data)

    let budget  = Object.entries(data).map(([id,budgetdata])=>{
        return {id,...budgetdata}
    })

     let tbody = document.querySelector("#materialTable tbody");
      tbody.innerHTML = "";
      let list = 1;
   budget.forEach((item) => {
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
let totalBudget = budget.reduce((acc, item) => acc + Number(item.total), 0);
console.log("Total Budget:", totalBudget);

let finalBudget = document.getElementById("finalBudget");
finalBudget.innerHTML="";  
let h2 = document.createElement("h2");
h2.innerText = `Total Budget:${totalBudget}`
finalBudget.appendChild(h2)
  
}
showBudgetTable();
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

