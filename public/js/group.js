const createGroupBtn = document.getElementById("createGroup");
const addToGroupBtn = document.getElementById("addToGroup");
const groups = document.getElementById("groups");

async function createGroup() {
  try {
    const groupName = prompt("Group Name");
    const members = [];
    let userInput;

    while (userInput !== "done") {
      userInput = prompt(
        `Enter the email Id of Users to Add! Please Enter Valid Email Id Otherwise User will not get Added. Type "done" when you finished!`
      );

      if (userInput !== "done") {
        members.push(userInput);
      }
    }

    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:3000/group/createGroup",
      {
        groupName: groupName,
        members: members,
      },
      {
        headers: { Authorization: token },
      }
    );

    alert(`${groupName} Created Successfully!`);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function getGroups() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/group/getGroups", {
      headers: { Authorization: token },
    });

    groups.innerHTML = "";

    res.data.groups.forEach((group) => {
      const li = document.createElement("li");
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const span = document.createElement("span");
      const p = document.createElement("p");

      div1.classList.add("d-flex", "bd-highlight");
      div2.className = "user_info";

      span.appendChild(document.createTextNode(group.name));
      p.appendChild(document.createTextNode(`${group.admin} is Admin`));

      div2.appendChild(span);
      div2.appendChild(p);

      div1.appendChild(div2);
      li.appendChild(div1);
      groups.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
}

async function addToGroup() {
  try {
    const groupName = prompt("Group Name");
    const members = [];
    let userInput;

    while (userInput !== "done") {
      userInput = prompt(
        `Enter the email Id of Users to Add! Please Enter Valid Email Id Otherwise User will not get Added. Type "done" when you finished!`
      );

      if (userInput !== "done") {
        members.push(userInput);
      }
    }

    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:3000/group/addToGroup",
      {
        groupName: groupName,
        members: members,
      },
      {
        headers: { Authorization: token },
      }
    );

    alert(res.data.message);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

createGroupBtn.addEventListener("click", createGroup);
addToGroupBtn.addEventListener("click", addToGroup);
document.addEventListener("DOMContentLoaded", getGroups);
