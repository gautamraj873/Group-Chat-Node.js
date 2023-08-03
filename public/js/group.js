const groupMembersBtn = document.getElementById("groupMembers");
const createGroupBtn = document.getElementById("createGroup");
const addToGroupBtn = document.getElementById("addToGroup");
const deleteFromGroupBtn = document.getElementById("deleteFromGroup");
const logoutBtn = document.getElementById("logout");
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
      { headers: { Authorization: token } }
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

async function deleteFromGroup() {
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
      "http://localhost:3000/group/deleteFromGroup",
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

async function groupMembers() {
  try {
    const chatBoxBody = document.getElementById("chatBoxBody");
    if (chatBoxBody.querySelector(".groupMembersDiv")) {
      const members = chatBoxBody.querySelectorAll(".groupMembersDiv");
      members.forEach((member) => {
        member.remove();
      });
    }
    const groupName = localStorage.getItem("groupName");
    if (!groupName || groupName == "") {
      return alert("Select the Group");
    }
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `http://localhost:3000/group/groupMembers/${groupName}`,
      { headers: { Authorization: token } }
    );
    res.data.users.forEach((user) => {
      const div = document.createElement("div");
      div.classList.add(
        "d-flex",
        "justify-content-center",
        "groupMembersDiv",
        "text-white"
      );
      const p = document.createElement("p");
      p.appendChild(document.createTextNode(`${user.name} is Member`));
      div.appendChild(p);
      chatBoxBody.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "http://localhost:3000";
}

groupMembersBtn.addEventListener("click", groupMembers);
createGroupBtn.addEventListener("click", createGroup);
addToGroupBtn.addEventListener("click", addToGroup);
deleteFromGroupBtn.addEventListener("click", deleteFromGroup);
logoutBtn.addEventListener("click", logout);
document.addEventListener("DOMContentLoaded", getGroups);