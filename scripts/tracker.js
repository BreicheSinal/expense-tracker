let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

addBttn.addEventListener("click", addExpense);
function addExpense() {
  const dateInput = date.value;
  const typeInput = type.value;
  const nameInput = name.value;
  const amountInput = amount.value;
  const noteInput = note.value;

  if (!dateInput || !nameInput || !amountInput || !nameInput) {
    alert("PLEAE FILL ALL FIELDS");
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
  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${transaction.dateInput}</td>
      <td>${transaction.typeInput}</td>
      <td>${transaction.nameInput}</td>
      <td>${transaction.amountInput}</td>
      <td>${transaction.noteInput}</td>
      `;
    transactionsList.appendChild(row);
    console.log(transactions);
  });
}

//console.log(transactions);
//localStorage.clear();
