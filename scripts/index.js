loginBttn.addEventListener("click", () => {
  let usernameInput = username.value;
  let passwordInput = password.value;

  console.log(usernameInput);
  console.log(passwordInput);

  if (usernameInput == "" && passwordInput == "") {
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "Please Enter Username/Password";
    console.log("im here");
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 1500);
  } else if (usernameInput == "") {
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "Please Enter Username";
    console.log("im here");
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 1500);
  } else if (passwordInput == "") {
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "Please Enter Password";
    console.log("im here");
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 1500);
  } else window.location.href = "./pages/expenseTracker.html";
});
