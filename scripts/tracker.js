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
    const row1 = document.createElement("tr");
    const row2 = document.createElement("tr");

    row1.innerHTML = `
      <td>${transaction.dateInput}</td>
      <td>${transaction.typeInput}</td>
      <td>${transaction.nameInput}</td>
      <td>$ ${Number(transaction.amountInput).toLocaleString()}</td>
      <td>${transaction.noteInput}</td>
      <td><button class="tableBttn edit full-width" onclick="editTransaction(${id})"> <img src="/assets/icons/edit.png" width="20px" height="20px"/> </button></td>
      <td><button class="tableBttn delete full-width" onclick="deleteTransaction(${id})"> <img src="/assets/icons/delete.png" width="20px" height="20px"/> </button></td>
    `;

    row2.innerHTML = `
      <td colspan="7"><hr class="colorHr"></td>
    `;

    transactionsList.appendChild(row2);
    transactionsList.appendChild(row1);
    //console.log(transactions);
  });
  totalBudget(transactions);
}

function deleteTransaction(id) {
  transactions.splice(id, 1);
  saveTransactions();
  displayTransaction();
  totalBudget(transactions);
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

function totalBudget(transactions) {
  let totalTransactions = 0;

  if (transactions.length == 0) total.innerHTML = "$ 0";
  else {
    transactions.forEach((transaction) => {
      let input = Number(transaction.amountInput);
      totalTransactions += input;
      //console.log(totalTransactions);

      // toLocalString to add commas
      total.innerHTML = `$ ${totalTransactions.toLocaleString()}`;
    });
  }
}

function displayfiltered(filteredTransaction) {
  // RESET LIST
  transactionsList.innerHTML = "";
  console.log(filteredTransaction);

  // ADD ALL TRANSACTIONS
  filteredTransaction.forEach((transaction, id) => {
    const row1 = document.createElement("tr");
    const row2 = document.createElement("tr");

    row1.innerHTML = `
      <td>${transaction.dateInput}</td>
      <td>${transaction.typeInput}</td>
      <td>${transaction.nameInput}</td>
      <td>$ ${Number(transaction.amountInput).toLocaleString()}</td>
      <td>${transaction.noteInput}</td>
      <td><button class="tableBttn edit full-width" onclick="editTransaction(${id})"> <img src="/assets/icons/edit.png" width="20px" height="20px"/> </button></td>
      <td><button class="tableBttn delete full-width" onclick="deleteTransaction(${id})"> <img src="/assets/icons/delete.png" width="20px" height="20px"/> </button></td>
      `;

    row2.innerHTML = `
      <td colspan="7"><hr class="colorHr"></td>
    `;

    transactionsList.appendChild(row2);
    transactionsList.appendChild(row1);

    //console.log(transactions);
  });
  totalBudget(filteredTransaction);
}

applyBttn.addEventListener("click", () => {
  const typeFilter = filterType.value;
  const priceFilter = filterPrice.value;
  const dateFilter = filterDate.value;

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

  if (dateFilter == "None")
    filteredTransactions = checkDate(0, filteredTransactions);
  else if (dateFilter == "Earliest")
    filteredTransactions = checkDate(1, filteredTransactions);
  else if (dateFilter == "Latest")
    filteredTransactions = checkDate(2, filteredTransactions);

  console.log(filteredTransactions); //problem in checkDate

  displayfiltered(filteredTransactions);
});

// ARRAY FILTER
function checkType(id, transactions) {
  return transactions.filter((transaction) => {
    if (id == 0) return true;
    if (id == 1) return transaction.typeInput === "Income";
    if (id == 2) return transaction.typeInput === "Expense";
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

// ARRAY SORT
function checkDate(id, transactions) {
  if (id === 0) return transactions;

  let sortedTransactions = [...transactions];

  if (id === 1) {
    return sortedTransactions.sort((a, b) =>
      a.dateInput.localeCompare(b.dateInput)
    );
  } else if (id === 2) {
    return sortedTransactions.sort((b, a) =>
      a.dateInput.localeCompare(b.dateInput)
    );
  }

  console.log(sortedTransactions);
}

// DISPLAYS TRANSACTION ON RELOAD
displayTransaction();
//totalBudget();
//console.log(transactions);
//localStorage.clear();
