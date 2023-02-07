var populationOption = document.getElementById("left-country");
var leftCountry = document.getElementById("left-country");
var leftValue = document.getElementById("left-value");
var rightCountry = document.getElementById("right-country");
var rightPop = document.getElementById("right-population");
var result = document.getElementById("result");
var streak = document.getElementById("streak");
var countriesList;
var chosenProperty;
var leftIndex;
var rightIndex;
var currentStreak;
function main() {
}
fetch("./countriesdata.json")
    .then(function (resp) {
    return resp.json();
})
    .then(function (data) {
    countriesList = data;
    leftIndex = getRandomInt(countriesList.length);
    rightIndex = getRandomInt(countriesList.length);
    currentStreak = 0;
    while (leftIndex == rightIndex) {
        leftIndex = getRandomInt(countriesList.length);
    }
});
function chooseCategory() {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    var select = document.getElementById("category");
    var selectedOption = select.options[select.selectedIndex].value;
    if (selectedOption == "population") {
        chosenProperty = "population";
    }
    else if (selectedOption == "life-expectancy") {
        chosenProperty = "expectancy";
    }
    else if (selectedOption == "emissions") {
        chosenProperty = "co2PerCapita2020";
        while (!countriesList[leftIndex].hasOwnProperty('co2PerCapita2020')) {
            leftIndex = getRandomInt(countriesList.length);
        }
        while (!countriesList[rightIndex].hasOwnProperty('co2PerCapita2020')) {
            rightIndex = getRandomInt(countriesList.length);
        }
    }
    placeOptions(chosenProperty);
}
function placeOptions(chosen) {
    result.textContent = "";
    leftCountry.textContent = countriesList[leftIndex].country;
    leftValue.textContent = countriesList[leftIndex][chosen].toLocaleString("en-US");
    rightCountry.textContent = countriesList[rightIndex].country;
}
function compareAnswers(button) {
    var countryRight = countriesList[rightIndex].country;
    var valLeft = countriesList[leftIndex][chosenProperty];
    var valRight = countriesList[rightIndex][chosenProperty];
    if (button.id === "more" && valLeft < valRight || button.id === "less" && valLeft > valRight) {
        result.textContent = "Correct! ".concat(countryRight, ": ").concat(valRight.toLocaleString("en-US"));
        leftIndex = rightIndex;
        rightIndex = getRandomInt(countriesList.length);
        currentStreak++;
        streak.textContent = "Streak: ".concat(currentStreak.toLocaleString());
    }
    else {
        result.textContent = "Wrong! ".concat(countryRight, ": ").concat(valRight.toLocaleString("en-US"));
        currentStreak = 0;
        streak.textContent = "Streak: ".concat(currentStreak.toLocaleString());
        leftIndex = getRandomInt(countriesList.length);
        rightIndex = getRandomInt(countriesList.length);
    }
    while (!countriesList[leftIndex].hasOwnProperty('co2PerCapita2020')) {
        leftIndex = getRandomInt(countriesList.length);
    }
    while (!countriesList[rightIndex].hasOwnProperty('co2PerCapita2020')) {
        rightIndex = getRandomInt(countriesList.length);
    }
    setTimeout(function () {
        placeOptions(chosenProperty);
    }, 2000);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
