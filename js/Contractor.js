/** @format */

const contractors = [
  {
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajesh@example.com",
    pastProjects: ["Bathroom Renovation", "Kitchen Remodeling"],
    rating : "4.5",
    img : "https://images.jdmagicbox.com/v2/comp/ranchi/c8/0651px651.x651.240214102530.m1c8/catalogue/brahm-vansh-construction-kamre-ranchi-road-construction-contractors-ddd6u1jkps-250.jpg"
  },
  {
    name: "Priya Sharma",
    phone: "9123456780",
    email: "priya@example.com",
    pastProjects: ["Living Room Painting", "Garden Deck"],
    rating : "4.2",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ynsm0PQWEm9_MNxqKmciMCIG9yEjQHhUbxJ96plnmZ2NBlpp6rDpGiukE8vRtUph5WQ&usqp=CAU"
  },
  {
    name: "Ankit Verma",
    phone: "9988776655",
    email: "ankit@example.com",
    pastProjects: ["Roof Repair", "Garage Setup"],
    rating : "3.5",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvsi2WNf9gZXRGa8ONI-dmJSK59AbxekjOVWhAbNPhZnsCHziJyxDK0r7rU-oMKY0YpsY&usqp=CAU"
  },
  {
    name: "Sunita Yadav",
    phone: "9765432109",
    email: "sunita@example.com",
    pastProjects: ["Basement Waterproofing", "Fence Installation"],
    rating : "4.3",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7NL6Fb_qFN7Czik4coBY8WlDUOim_lPuEqwVYH1TLuJGoEqW_26y-2fUwgKrJiFSudoY&usqp=CAU"
  },
  {
    name: "Amit Mehta",
    phone: "9845123786",
    email: "amit@example.com",
    pastProjects: ["Electrical Wiring", "Lighting Design"],
    rating : "3.1",
    img : "https://m.media-amazon.com/images/I/81XTeu4F6BL._SS1000_.jpg"
  },
  {
    name: "Neha Patil",
    phone: "9012345678",
    email: "neha@example.com",
    pastProjects: ["Floor Tiling", "Wall Plaster"],
    rating : "4.4",
    img : "https://images.jdmagicbox.com/comp/nagercoil/a8/9999p4652.4652.190313192559.m7a8/catalogue/modern-construction-nagercoil-ho-nagercoil-construction-companies-zb1gbzqe6m.jpg"
  },
  {
    name: "Vikram Singh",
    phone: "9834567890",
    email: "vikram@example.com",
    pastProjects: ["Modular Kitchen", "TV Unit Setup"],
    rating : "5.0",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnLwoWVCe2ojqVEZAe0YnkCqj54Jvn5NzlHveGnJ-_4uCXNzQ41OxQWjiF2h4TNvMfwH4&usqp=CAU"
  },
  {
    name: "Kiran Joshi",
    phone: "9112233445",
    email: "kiran@example.com",
    pastProjects: ["False Ceiling", "LED Panel Installation"],
    rating : "4.5",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMCwGM6zSazHhPCtK3PPLTT3svdnUJUIs--cuSlYYzVxVbCvG0gPpptXivfC67eQNupuY&usqp=CAU"
  },
  {
    name: "Deepa Nair",
    phone: "9090909090",
    email: "deepa@example.com",
    pastProjects: ["Paint Touchup", "Pest Control"],
    rating : "3.5",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM3j26Dq0Ff2uLpHc3PrFLzNHCRgz1b-Edv4BsfsIBWXowBxojOFpVhqVT3Wxs4PvqOl0&usqp=CAU"
  },
  {
    name: "Ravi Chauhan",
    phone: "9821345698",
    email: "ravi@example.com",
    pastProjects: ["Bathroom Plumbing", "Hot Water System"],
    rating : "2.5",
    img : "https://imgv2-2-f.scribdassets.com/img/document/258260343/149x198/969ec85065/1542896634?v=1"
  },
  {
    name: "Meena Agarwal",
    phone: "9988776655",
    email: "meena@example.com",
    pastProjects: ["Wall Art", "Decor Installation"],
    rating : "4.3",
    img : "https://imgv2-1-f.scribdassets.com/img/document/382996981/149x198/6b306fd063/1742237609?v=1"
  },
  {
    name: "Suresh Iyer",
    phone: "9867543210",
    email: "suresh@example.com",
    pastProjects: ["Carpentry Work", "Bookshelf Mounting"],
    rating : "4.4",
    img : "https://content.jdmagicbox.com/comp/thoothukudi/f7/9999px461.x461.210530173515.a8f7/catalogue/hike-india-construction-patemanagaram-thoothukudi-builders-6gtlb67cyg.jpg"
  },
  {
    name: "Komal Gupta",
    phone: "9786543210",
    email: "komal@example.com",
    pastProjects: ["Home Automation", "Smart Lighting"],
    rating : "4.5",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbYEujXlC102iwXfZhTSr7hwstipdjPLmRBLSqunf3s1x2mLVMdnOh4CPwncsOx-Ydt-4&usqp=CAU"
  },
  {
    name: "Arjun Rana",
    phone: "9811122233",
    email: "arjun@example.com",
    pastProjects: ["Driveway Paving", "Garage Setup"],
    rating : "3.5",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrjqn_32SzgNQ_Bg-Q8lFjMaFWNsaPXSGZ6hO9PpCoKuvfCor-DmbQJvc0h6GPe3RhXy4&usqp=CAU"
  },
  {
    name: "Shalini Das",
    phone: "9898989898",
    email: "shalini@example.com",
    pastProjects: ["Window Replacement", "Curtain Fitting"],
    rating : "4.1",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMNV3JZHU4t61rtP9Lllf5pMA0h-eY-iiYgRhZQ4D8CGUfS0dbLA6gSyf9C6NuA0bvSi8&usqp=CAU"
  },
];

let constructor = document.getElementById("constructor");
constructor.innerHTML = "";
contractors.forEach((ele) => {
    let bigDiv = document.createElement("div") 
    bigDiv.id = "bigDiv"
  let list = document.createElement("div");
  list.id= "list"
  list.innerHTML = `
    <h3>Name : ${ele.name}</h3>
    <h4>Mobile no : ${ele.phone}</h4>
    <h4>Email Id : ${ele.email}</h4>
    <h4>Rating : ${ele.rating}</h4>
    <h4>Expert : ${ele.pastProjects}</h4>
    `;
    let image = document.createElement("div")
    Image.id = "image"
    image.innerHTML = `
    <img src="${ele.img}"/>
    `

    bigDiv.appendChild(list);
    bigDiv.appendChild(image)
    constructor.appendChild(bigDiv)
});
