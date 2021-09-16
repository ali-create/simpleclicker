"use strict";

const mainItem = document.querySelector("#item");
const scoreText = document.querySelector(".score");
const cooldownUpgrade = document.querySelector(".upgrade");
const cooldownPriceText = document.querySelector(".cooldownPrice");
const priceUpgrade = document.querySelector(".upgradePrice");
const pricePriceText = document.querySelector(".pointsPrice");
const settings = document.querySelector(".settings");
const darkMode = document.querySelector(".darkMode");

let soundVol = 0.5;
const mainItem_clickSFX = document.querySelector(".click_mainItemSFX");
const upgrade_failSFX = document.querySelector(".upgrade_failSFX");
const upgrade_successSFX = document.querySelector(".upgrade_successSFX");
const click_settingsSFX = document.querySelector(".click_settingsSFX");

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
    mainItem_clickSFX.load();
    mainItem_clickSFX.play();
    mainItem.classList.remove("on");
    mainItem.style.backgroundColor = "grey";
    mainItem.style.cursor = mainItem.style.cursor = "unset";

    setTimeout(function () {
      mainItem.style.left = `${random(40, 620, false)}px`;
      mainItem.style.top = `${random(40, 120, false)}px`;
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
    upgrade_successSFX.volume = soundVol;
    upgrade_successSFX.load();
    upgrade_successSFX.play();
    score = (score - cooldownPrice).toFixed(3);
    cooldownPrice = cooldownPrice * 1.2;
    cooldownPriceText.textContent = cooldownPrice.toFixed(3);
    scoreText.textContent = score;
    cooldown = cooldown - 10;
  } else {
    upgrade_failSFX.volume = soundVol;
    upgrade_failSFX.load();
    upgrade_failSFX.play();
  }
});

priceUpgrade.addEventListener("click", function () {
  if (score > pointsPrice) {
    upgrade_successSFX.volume = soundVol;
    upgrade_successSFX.load();
    upgrade_successSFX.play();
    score = (score - pointsPrice).toFixed(3);
    pointsPrice = pointsPrice * 2.4;
    pricePriceText.textContent = pointsPrice.toFixed(3);
    scoreText.textContent = score;
    pointsPerClick = pointsPerClick + pointsPerClick * 1.06;
  } else {
    upgrade_failSFX.volume = soundVol;
    upgrade_failSFX.load();
    upgrade_failSFX.play();
  }
});

settings.addEventListener("click", function () {
  click_settingsSFX.load();
  click_settingsSFX.volume = soundVol;
  click_settingsSFX.play();
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

document.querySelector(".volumeSFX").addEventListener("pointerup", function () {
  soundVol = document.querySelector(".volumeSFX").value / 100;
  mainItem_clickSFX.volume = soundVol;
  mainItem_clickSFX.load();
  mainItem_clickSFX.play();
});
