/** @format */

let url =
  "https://home-improvement-tracker-fb992-default-rtdb.firebaseio.com/Projects";

let ProjectBtn = document.getElementById("newProjectBtn");
ProjectBtn.addEventListener("click", () => {
  document.getElementById("form-div").style.display = "block";
  document.body.style.backgroundColor = "rgba(146, 143, 143, 0.48)";
});

let closeBtn = document.getElementById("closeBtn")
closeBtn.addEventListener("click",()=>{
  document.getElementById("form-div").style.display = "none";
  document.body.style.backgroundColor = "white";
})

// })

//form submit
let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", async () => {
  let image = document.getElementById("ref-image").value;
  let category = document.getElementById("category").value;
  let description = document.getElementById("description").value

  if (image === "" || category === "") {
    alert("please fill both file");
    return;
  }

let newProject = {image,category, description,dateTime : new Date().toLocaleString()};

await fetch(`${url}.json`,{
    method : "POST",
    headers: { "Content-Type": "application/json" },
    body : JSON.stringify(newProject)
})
 // Clear form
  document.getElementById("ref-image").value = "";
  document.getElementById("category").value = "";
  document.getElementById("form-div").style.display = "none";
  document.getElementById("description").value = "";
  document.body.style.backgroundColor = "";

  // Show updated data
  fetchData();

});
 

  // Fetch and display data
async function fetchData() {
  let res = await fetch(`${url}.json`);
  let data = await res.json();

  if (!data) return;

  let projectData = Object.entries(data).map(([id, design]) => {
    return { id, ...design };
  });

  let displayResult = document.getElementById("displayResult");
  displayResult.innerHTML = "";

  projectData.forEach((ele) => {
    let designCard = document.createElement("div");
    // designCard.id = ele.id;
    designCard.innerHTML = `
      <img src="${ele.image}" width="200" />
      <h3>Category - ${ele.category}</h3>
      <p><strong>Description:</strong> ${ele.description || "No description available"}</p>       <p>Date & Time - ${ele.dateTime || "Not Available"}</p>
       <a href="ManageTask.html?id=${ele.id}"><button id="detailBtn">Detail</button></a>
      <button id="deleteBtn" onclick="deleteCard('${ele.id}')">Delete</button>
    `;
    displayResult.appendChild(designCard);
  });
}



//delete card
async function deleteCard(id){

    // Remove from UI instantly
  let card = document.getElementById(id);
  if (card) card.remove();

    let res = await fetch(`${url}/${id}.json`,{
        method : "DELETE",
    });
    fetchData();
}

fetchData();
