const messageTextArea = document.getElementById("messageTextArea");
const messageSendBtn = document.getElementById("messageSendBtn");

async function messageSend() {
  try {
    const message = messageTextArea.value;
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:3000/chat/sendMessage",
      {
        message: message,
      },
      { headers: { Authorization: token } }
    );
  } catch (error) {
    console.log("something went wrong");
  }
}

messageSendBtn.addEventListener("click", messageSend);