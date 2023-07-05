import gpt from "./assets/gpt.svg";
import person from "./assets/user.svg";

const form = document.querySelector("form");
const chats = document.querySelector("#chats");

setTimeout(() => {
  alert(
    "hi unfortunately Cooler chatgpt doesnot function anymore due to api owner changing it to a paid api only. i guess you can go use chatgpt instead."
  );
}, 3000);

let loading;

function loader(element) {
  element.textContent = "";

  loading = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 30);
}

function chatPattern(isAi, value, Id) {
  return `
    <div class="${isAi ? "bot" : "user"}">
          ${isAi ? "<pre>" : ""}
          <img src="${isAi ? gpt : person}" alt="${isAi ? "bot" : "user"}" />
          <p id="${Id}">${value}</p>
          ${isAi ? "</pre>" : ""}
        </div>
    `;
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  chats.innerHTML += chatPattern(false, data.get("message"));
  const uniqueId = generateUniqueId();
  chats.innerHTML += chatPattern(true, " ", uniqueId);
  const newMessage = document.getElementById(uniqueId);
  form.reset();
  loader(newMessage);
  const response = await fetch("https://chatpgtclone.onrender.com/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message: data.get("message") }),
  });

  clearInterval(loading);
  newMessage.innerHTML = "";
  chats.scrollTop = chats.scrollHeight + 20;

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.ai.trim();
    typeText(newMessage, parsedData);
  } else {
    const err = await response.text();
    newMessage.innerHTML = "Something went wrong";
    alert(err);
  }
};

form.addEventListener("submit", handleSubmit);

form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
