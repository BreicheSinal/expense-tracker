let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

addBttn.addEventListener("click", addExpense);
function addExpense() {
  const dateInput = date.value;
  const typeInput = type.value;
  const nameInput = name.value;
  const amountInput = amount.value;
  const noteInput = note.value;

  if (!dateInput || !nameInput || !amountInput || !nameInput) {
    alert("PLEASE FILL ALL FIELDS");
  } else {
    transactions.push({
      dateInput,
      typeInput,
      nameInput,
      amountInput,
      noteInput,
    });
    console.log(transactions);
    displayTransaction();
    saveTransactions();
  }
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function displayTransaction() {
  // RESET LIST
  transactionsList.innerHTML = "";

  // ADD ALL TRANSACTIONS
  transactions.forEach((transaction, id) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${transaction.dateInput}</td>
      <td>${transaction.typeInput}</td>
      <td>${transaction.nameInput}</td>
      <td>${transaction.amountInput}</td>
      <td>${transaction.noteInput}</td>
      <td><button class="tableBttn full-width" onclick="editTransaction(${id})">Edit</button></td>
      <td><button class="tableBttn full-width" onclick="deleteTransaction(${id})">Delete</button></td>
      `;
    transactionsList.appendChild(row);
    //console.log(transactions);
  });
  totalBudget();
}

function deleteTransaction(id) {
  transactions.splice(id, 1);
  saveTransactions();
  displayTransaction();
  totalBudget();
}

function editTransaction(id) {
  const transaction = transactions[id];

  document.getElementById("dateTransaction").value = transaction.dateInput;
  document.getElementById("typeTransaction").value = transaction.typeInput;
  document.getElementById("nameTransaction").value = transaction.nameInput;
  document.getElementById("amountTransaction").value = transaction.amountInput;
  document.getElementById("noteTransaction").value = transaction.noteInput;

  deleteTransaction(id);
}

function totalBudget() {
  let totalTransactions = 0;

  transactions.forEach((transaction) => {
    let input = Number(transaction.amountInput);
    totalTransactions += input;
    //console.log(totalTransactions);

    total.innerHTML = totalTransactions;
  });
}

function displayfiltered(filteredTransactions) {
  // RESET LIST
  transactionsList.innerHTML = "";
  console.log(filteredTransactions);

  // ADD ALL TRANSACTIONS
  filteredTransactions.forEach((transaction, id) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${transaction.dateInput}</td>
      <td>${transaction.typeInput}</td>
      <td>${transaction.nameInput}</td>
      <td>${transaction.amountInput}</td>
      <td>${transaction.noteInput}</td>
      <td><button class="tableBttn full-width" onclick="editTransaction(${id})">Edit</button></td>
      <td><button class="tableBttn full-width" onclick="deleteTransaction(${id})">Delete</button></td>
      `;
    transactionsList.appendChild(row);
    //console.log(transactions);
  });
  totalBudget();
}

applyBttn.addEventListener("click", () => {
  const typeFilter = filterType.value;
  const priceFilter = filterPrice.value;

  let filteredTransactions = transactions;
  console.log(filteredTransactions);
  if (typeFilter == "All")
    filteredTransactions = checkType(0, filteredTransactions);
  else if (typeFilter == "Income")
    filteredTransactions = checkType(1, filteredTransactions);
  else filteredTransactions = checkType(2, filteredTransactions);

  if (priceFilter == "None")
    filteredTransactions = checkPrice(0, filteredTransactions);
  else if (priceFilter == "Minimum")
    filteredTransactions = checkPrice(1, filteredTransactions);
  else if (priceFilter == "Maximum")
    filteredTransactions = checkPrice(2, filteredTransactions);

  console.log(filteredTransactions);
  displayfiltered(filteredTransactions);
});

// ARRAY FILTER
function checkType(id, transactions) {
  return transactions.filter((transaction) => {
    if (id == 0) return true;
    if (id == 1) return transaction.typeInput === "income";
    if (id == 2) return transaction.typeInput === "expense";
  });
}

// ARRAY SORT
function checkPrice(id, transactions) {
  let sortedTransactions = [...transactions];

  if (id == 1) {
    sortedTransactions.sort((a, b) => a.amountInput - b.amountInput);
  } else if (id == 2) {
    sortedTransactions.sort((a, b) => b.amountInput - a.amountInput);
  }

  return sortedTransactions;
}

function checkDate() {}

// DISPLAYS TRANSACTION ON RELOAD
displayTransaction();
//totalBudget();
//console.log(transactions);
//localStorage.clear();
