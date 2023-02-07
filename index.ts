const populationOption = document.getElementById("left-country") as HTMLDivElement;

const leftCountry = document.getElementById("left-country") as HTMLDivElement;
const leftValue = document.getElementById("left-value") as HTMLDivElement;

const rightCountry = document.getElementById("right-country") as HTMLDivElement;
const rightPop = document.getElementById("right-population") as HTMLDivElement;

const result = document.getElementById("result") as HTMLDivElement;
const streak = document.getElementById("streak") as HTMLDivElement;

let countriesList: {country: string, population: number, expectancy: number, co2PerCapita2020: number}[];
let chosenProperty: string;
let leftIndex: number;
let rightIndex: number;
let currentStreak: number;


function main() {

}

fetch("./countriesdata.json")
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    countriesList = data;
    leftIndex = getRandomInt(countriesList.length);
    rightIndex = getRandomInt(countriesList.length);
    currentStreak = 0;
    while (leftIndex == rightIndex) {
      leftIndex = getRandomInt(countriesList.length);
    }
  });

  function chooseCategory() {
    event?.preventDefault();
    const select = document.getElementById("category") as HTMLSelectElement;
    const selectedOption = select.options[select.selectedIndex].value;
    if (selectedOption == "population") {
      chosenProperty = "population"
    } else if (selectedOption == "life-expectancy") {
      chosenProperty = "expectancy"
    } else if (selectedOption == "emissions") {
      chosenProperty = "co2PerCapita2020"
        while (!countriesList[leftIndex].hasOwnProperty('co2PerCapita2020')) {
          leftIndex = getRandomInt(countriesList.length);
        }
        while (!countriesList[rightIndex].hasOwnProperty('co2PerCapita2020')) {
          rightIndex = getRandomInt(countriesList.length);
        }
    }
    placeOptions(chosenProperty);
  }
  

function placeOptions(chosen:string) {
  result.textContent = "";
  leftCountry.textContent = countriesList[leftIndex].country;
  leftValue.textContent = countriesList[leftIndex][chosen].toLocaleString("en-US");
  rightCountry.textContent = countriesList[rightIndex].country;
}

function compareAnswers(button:HTMLButtonElement) {

  let countryRight: string = countriesList[rightIndex].country;
  let valLeft: number = countriesList[leftIndex][chosenProperty];
  let valRight: number = countriesList[rightIndex][chosenProperty];

  if (button.id === "more" && valLeft < valRight || button.id === "less" && valLeft > valRight) {
    result.textContent = `Correct! ${countryRight}: ${valRight.toLocaleString("en-US")}`
    leftIndex = rightIndex;
    rightIndex = getRandomInt(countriesList.length);
    currentStreak++;
    streak.textContent = `Streak: ${currentStreak.toLocaleString()}`;
  } else {
    result.textContent = `Wrong! ${countryRight}: ${valRight.toLocaleString("en-US")}`
    currentStreak = 0;
    streak.textContent = `Streak: ${currentStreak.toLocaleString()}`;
    leftIndex = getRandomInt(countriesList.length);
    rightIndex = getRandomInt(countriesList.length);
  }

  while (!countriesList[leftIndex].hasOwnProperty('co2PerCapita2020')) {
    leftIndex = getRandomInt(countriesList.length);
  }
  while (!countriesList[rightIndex].hasOwnProperty('co2PerCapita2020')) {
    rightIndex = getRandomInt(countriesList.length);
  }


  setTimeout(() => {
    placeOptions(chosenProperty);
  }, 2000);
}

function getRandomInt(max:number) {
  return Math.floor(Math.random()*max);
}


