const display = document.getElementById("display");
function appendToDisplay(input) {
  display.value += input;
}
function clearDisplay() {
  display.value = "";
}
function calculate() {
  try {
    let result = eval(display.value);
    if (result === Infinity || result === -Infinity || isNaN(result)) {
      throw new Error("Invalid input");
    }
    display.value = result.toString();
    if (display.value.length > 15) {
      display.value = display.value.slice(0, 15) + "...";
    }
  } catch (error) {
    display.value = "Invalid input";
  }
}
function percentage() {
  try {
    let value = parseFloat(display.value);
    if (isNaN(value)) throw new Error("Invalid input");
    display.value = value / 100;
    if (display.value.length > 15) {
      display.value = display.value.slice(0, 15) + "...";
    }
  } catch (error) {
    display.value = "Invalid input";
  }
}
function deleteLast() {
  display.value = display.value.slice(0, -1);
}
function squareRoot() {
  try {
    let value = parseFloat(display.value);
    if (isNaN(value) || value < 0) throw new Error("Invalid input");
    display.value = Math.sqrt(value);
    if (display.value.length > 15) {
      display.value = display.value.slice(0, 15) + "...";
    }
  } catch (error) {
    display.value = "Invalid input";
  }
}
