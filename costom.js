"use strict";
// selecting elements
const inputContainer = document.getElementById("inputFormContainer");
const formCountdown = document.getElementById("countdownForm");
const dateInput = document.getElementById("datePicker");
const coundownDivEl = document.getElementById("coundownDiv");
let titleEl = document.getElementById("title");
const timeElements = document.querySelectorAll("span");
const resetBtnEl = document.getElementById("resetButton");
const completDivEl = document.getElementById("completeDiv");
const completDateEl = document.getElementById("completeDate");
const newCountdownEl = document.getElementById("newCountdown");
console.log(timeElements[0]);
const today = new Date().toISOString().split("T")[0];
console.log(today);
dateInput.setAttribute("min", today);
dateInput.innerHTML = today;

// * time values
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
let countdownValue = new Date();
const now = new Date().getTime();
const distance = countdownValue - now;
console.log(distance);
// * declaring empty variables
let countdownDate = "";
let countdownTitle = "";
formCountdown.addEventListener("submit", (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  timeElements[0].textContent = Math.floor(distance / day);
  timeElements[1].textContent = Math.floor((distance % day) / hour);
  timeElements[2].textContent = Math.floor((distance % hour) / minute);
  timeElements[3].textContent = Math.floor((distance % minute) / second);

  if (countdownTitle === "" || countdownDate === "") {
    alert("date or title is empty");
  } else {
    inputContainer.classList.add("hidden");
    coundownDivEl.classList.remove("hidden");
    titleEl.innerHTML = e.srcElement[0].value;
  }
});
