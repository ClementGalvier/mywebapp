function sayHello() {
  let name = document.getElementById("nameInput").value;
  let greeting = document.getElementById("greeting");

  if (name.trim() === "") {
    greeting.textContent = "Please enter your name!";
  } else {
    greeting.textContent = "Hello, " + name + "! Nice to meet you.";
  }
}
