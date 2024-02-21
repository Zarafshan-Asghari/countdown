"use strict";
// section 1 elements
const inputContainer = document.getElementById("inputFormContainer");
const countForm = document.getElementById("countdownForm");
const datePickerInput = document.getElementById("datePicker");

// section 2 elements
const countdownSection = document.getElementById("coundownDiv");
let title = document.getElementById("title");
const TimeElements = document.querySelectorAll("span"); // Array containes 4 element
const resetBtn = document.getElementById("resetButton");
// 3 complet section elements
const complet = document.getElementById("completeDiv");
const completDate = document.getElementById("completeDate");
const newCountdown = document.getElementById("newCountdown");

// todays date in isostring split it to show without time,hour,min,milisec
const todaysDate = new Date().toISOString().split("T")[0];
datePickerInput.setAttribute("min", todaysDate);

// Declaring times value
const seconds = 1000;
const minutes = 60 * seconds;
const hours = 60 * minutes;
const days = 24 * hours;

// let count = "";
let countdownDate = "";
let countdownTitle = "";
let countdownValue = new Date();
let coundownActive;
let saveCountdown;

// manipulating countdown
function updateDom() {
  coundownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    // hide input container
    inputContainer.classList.add("hidden");
    // if coundown finished
    if (distance < 0) {
      clearInterval(coundownActive);
      countdownSection.classList.add("hidden");
      complet.classList.remove("hidden");
      completDate.innerHTML = countdownDate;
    } else {
      // countdown in progress
      TimeElements[0].textContent = Math.floor(distance / days);
      TimeElements[1].textContent = Math.floor((distance % days) / hours);
      TimeElements[2].textContent = Math.floor((distance % hours) / minutes);
      TimeElements[3].textContent = Math.floor((distance % minutes) / seconds);

      // show countdown container
      countdownSection.classList.remove("hidden");
    }
  }, seconds);
}
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  title.innerHTML = countdownTitle;
  if (countdownDate === "" || countdownTitle === "") {
    alert("the date or title should not be empty");
  } else {
    // current Date
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }

  // save data after closeing browser
  saveCountdown = {
    date: countdownDate,
    title: countdownTitle,
  };
  localStorage.setItem("myCountdown", JSON.stringify(saveCountdown));
}
// to reset countdown---------------------------------------------------------
function reset() {
  // stop countdown
  clearInterval(coundownActive);
  // RESET values
  countdownDate = "";
  countdownTitle = "";
  // to hide countdown container
  countdownSection.classList.add("hidden");
  // to show input container
  inputContainer.classList.remove("hidden");
  // to hide complet
  complet.classList.add("hidden");
  // to remove localstorage
  localStorage.removeItem("myCountdown");
}
// -----------------------------------------------------------------------------
function restoreCountdown() {
  // if countdown was available
  if (localStorage.getItem("myCountdown")) {
    inputContainer.classList.add("hidden");
    saveCountdown = JSON.parse(localStorage.getItem("myCountdown"));
    countdownDate = saveCountdown.date;
    // BUG
    // countdownTitle = saveCountdown.title;
    title.innerHTML = saveCountdown.title;

    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}
countForm.addEventListener("submit", updateCountdown);
resetBtn.addEventListener("click", reset);
newCountdown.addEventListener("click", reset);

// load if data was availible
restoreCountdown();
