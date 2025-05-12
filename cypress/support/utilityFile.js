let lowercaseAlphabets = "qwertyuiopasdfghjklzxcvbnm";
let uppercaseAlphabets = lowercaseAlphabets.toUpperCase();
let allAlphabets = lowercaseAlphabets.concat(uppercaseAlphabets);
let symbols = "~!@#$%^&*()_+|}{\":?><,./';[]";
let numbers = "1234567890";
let mixed = allAlphabets.concat(symbols, numbers);

let randomProductName;
let randomProductPrice;
let totalPrice;

export function setRandomProductName(name) {
  randomProductName = name.trim();
}

export function getRandomProductName() {
  return randomProductName;
}

export function setProductCheckOutPrice(price) {
  randomProductPrice = Number(price.replace("$", "").trim());
}

export function getProductCheckOutPrice() {
  return randomProductPrice;
}

export function setProductOldPrice(price) {
  totalPrice = Number(price.replace("$", "").trim());
}

export function getProductOldPrice() {
  return totalPrice;
}

export function generateRandomString(size = 8) {
  let string = [];
  for (let i = 0; i < size; i++) {
    string.push(
      allAlphabets[Math.floor(Math.random() * (allAlphabets.length + 1))]
    );
  }
  return string.join("");
}

export function generateRandomNumber(size = 6) {
  let string = [];
  for (let i = 0; i < size; i++) {
    string.push(numbers[Math.floor(Math.random() * numbers.length + 1)]);
  }
  return string.join("");
}

export function generateRandomEmail() {
  return generateRandomString() + "@test.com";
}

export function generatePassword() {
  let string = [];
  string.push(
    uppercaseAlphabets[
      Math.floor(Math.random() * (uppercaseAlphabets.length + 1))
    ],
    lowercaseAlphabets[
      Math.floor(Math.random() * (lowercaseAlphabets.length + 1))
    ],
    numbers[Math.floor(Math.random() * (numbers.length + 1))],
    symbols[Math.floor(Math.random() * (symbols.length + 1))]
  );
  for (let i = 0; i < 8; i++) {
    string.push(mixed[Math.floor(Math.random() * (mixed.length + 1))]);
  }

  return string.join("");
}

export function generateRandomState(country) {
  if (country.toLowerCase() === "india") {
    let stateIndia = ["Bihar", "Goa", "Delhi", "Kerala", "Manipur", "Nagaland"];
    return stateIndia[Math.floor(Math.random() * stateIndia.length)];
  }
  if (country.toLowerCase() === "united states") {
    let stateUsa = ["Alaska", "Ohio", "Utah"];
    return stateUsa[Math.floor(Math.random() * stateUsa.length)];
  }
  if (country.toLowerCase() === "turkey") {
    let stateTurkey = ["Agri", "Duzce", "Kars"];
    return stateTurkey[Math.floor(Math.random() * stateTurkey.length)];
  }
}

export function generateRandomCountry() {
  let country = ["India", "United States", "Turkey"];
  return country[Math.floor(Math.random() * country.length)];
}
