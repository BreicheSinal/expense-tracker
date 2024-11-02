let transactions = [];

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
    saveTransactions();
  }
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//console.log(transactions);
