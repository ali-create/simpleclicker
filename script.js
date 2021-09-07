"use strict";

const mainItem = document.querySelector("#item");
const scoreText = document.querySelector(".score");
const cooldownUpgrade = document.querySelector(".upgrade");
const cooldownPriceText = document.querySelector(".cooldownPrice");
const priceUpgrade = document.querySelector(".upgradePrice");
const pricePriceText = document.querySelector(".pointsPrice");
const settings = document.querySelector(".settings");
const darkMode = document.querySelector(".darkMode");

const random = function (min, max, trunc = false) {
  if (trunc === false) return Math.random() * (max - min) + min;
  else return Math.trunc(Math.random() * (max - min) + min);
};

let cooldownPrice = 1;
let pointsPrice = 1;
let score = 0;
let cooldown = 1000;
let pointsPerClick = 1;

const clickEvent = function () {
  if (Object.values(mainItem.classList).includes("on")) {
    mainItem.classList.remove("on");
    mainItem.style.backgroundColor = "grey";
    mainItem.style.cursor = mainItem.style.cursor = "unset";

    setTimeout(function () {
      mainItem.style.left = `${random(40, 620, false)}px`;
      mainItem.style.top = `${random(40, 620, false)}px`;
      score = +score + pointsPerClick;
      scoreText.textContent = (+score).toFixed(3);
      mainItem.classList.add("on");
      mainItem.style.backgroundColor = "red";
      mainItem.style.cursor = mainItem.style.cursor = "pointer";
    }, cooldown);
  }
};

mainItem.addEventListener("click", clickEvent);

cooldownUpgrade.addEventListener("click", function () {
  if (score > cooldownPrice) {
    score = (score - cooldownPrice).toFixed(3);
    cooldownPrice = cooldownPrice * 1.2;
    cooldownPriceText.textContent = cooldownPrice.toFixed(3);
    scoreText.textContent = score;
    cooldown = cooldown - 10;
  }
});

priceUpgrade.addEventListener("click", function () {
  if (score > pointsPrice) {
    score = (score - pointsPrice).toFixed(3);
    pointsPrice = pointsPrice * 2.4;
    pricePriceText.textContent = pointsPrice.toFixed(3);
    scoreText.textContent = score;
    pointsPerClick = pointsPerClick + pointsPerClick * 1.06;
  }
});

settings.addEventListener("click", function () {
  document.querySelector(".ppc").textContent = pointsPerClick;
  document.querySelector(".cooldownSettings").textContent = cooldown;

  document.querySelector(".overlay").classList.toggle("hidden");
  document.querySelector(".settingsModal").classList.toggle("hidden");
});
document.querySelector(".done").addEventListener("click", function () {
  document.querySelector(".overlay").classList.toggle("hidden");
  document.querySelector(".settingsModal").classList.toggle("hidden");

  let darkModeCheck = !darkMode.checked;
  if (darkModeCheck) {
    document.documentElement.style.setProperty("--black", "black");
    document.documentElement.style.setProperty("--white", "white");
    darkModeCheck = !darkModeCheck;
  } else {
    document.documentElement.style.setProperty("--white", "black");
    document.documentElement.style.setProperty("--black", "white");
    darkModeCheck = !darkModeCheck;
  }
});
