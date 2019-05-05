console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  console.log(location);
  messageOne.textContent = "Loading...";

  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    console.log("response here", response.json);
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.restaurant;
      }
    });
  });
});
