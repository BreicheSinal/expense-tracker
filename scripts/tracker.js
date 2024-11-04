let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// NOTE FILTER FUNCTION
filterNote.addEventListener("change", function () {
  const noteInput = filterNote.value.toUpperCase();

  let filtered = [];
  transactions.forEach((transaction) => {
    let notes = transaction.noteInput
      ? transaction.noteInput.toUpperCase()
      : "";
    if (notes.includes(noteInput)) filtered.push(transaction);
    else displayTransaction(transactions);
  });

  displayfiltered(filtered);
});

addBttn.addEventListener("click", addExpense);

// ADD TRANSACTION FUNCTION (INCOME - EXPENSE)
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
    displayTransaction();
    saveTransactions();
  }
}

// SAVING TRANSACTION FUNCTION
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// DISPLAYING TRANSACTION FUNCTION
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
  });
  totalBudget(transactions);
}

// DELETING TRANSACTION FUNCTION
function deleteTransaction(id) {
  transactions.splice(id, 1);
  saveTransactions();
  displayTransaction();
  totalBudget(transactions);
}

// EDITING A TRANSACTION FUNCTION
function editTransaction(id) {
  const transaction = transactions[id];

  document.getElementById("dateTransaction").value = transaction.dateInput;
  document.getElementById("typeTransaction").value = transaction.typeInput;
  document.getElementById("nameTransaction").value = transaction.nameInput;
  document.getElementById("amountTransaction").value = transaction.amountInput;
  document.getElementById("noteTransaction").value = transaction.noteInput;

  deleteTransaction(id);
}

// TOTAL BUDGET FUNCTION (INCOME - EXPENSE)
function totalBudget(transactions) {
  let totalTransactions = 0;
  let expense = 0;
  let income = 0;

  if (transactions.length === 0) {
    total.innerHTML = "$ 0";
  } else {
    transactions.forEach((transaction) => {
      if (transaction.typeInput === "Expense") {
        expense += transaction.amountInput;
      } else if (transaction.typeInput === "Income") {
        income += transaction.amountInput;
      }
    });

    totalTransactions = income - expense;

    total.innerHTML = `$ ${totalTransactions.toLocaleString()}`;
  }
}

// DISPLAYING TRANSACTION AFTER APPLYINF FILTERS
function displayfiltered(filteredTransaction) {
  // RESET LIST
  transactionsList.innerHTML = "";

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
  });
  totalBudget(filteredTransaction);
}

// EVENT LISTENER FOR APPLY FILTERS BUTTON
applyBttn.addEventListener("click", () => {
  const typeFilter = filterType.value;
  const priceFilter = filterPrice.value;
  const dateFilter = filterDate.value;

  let filteredTransactions = transactions;

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

  if (dateFilter == "None")
    filteredTransactions = checkDate(0, filteredTransactions);
  else if (dateFilter == "Earliest")
    filteredTransactions = checkDate(1, filteredTransactions);
  else if (dateFilter == "Latest")
    filteredTransactions = checkDate(2, filteredTransactions);

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
}

// DISPLAYS TRANSACTION ON RELOAD
displayTransaction();
