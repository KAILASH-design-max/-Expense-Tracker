// Sample JavaScript for handling transactions

let transactions = [];
let balance = 0;

const balanceDisplay = document.getElementById('balance');
const incomeDisplay = document.getElementById('money-plus');
const expenseDisplay = document.getElementById('money-minus');
const transactionList = document.getElementById('list');
const form = document.getElementById('form');

function updateDisplay() {
  const income = transactions
    .filter(trans => trans.amount > 0)
    .reduce((acc, trans) => acc + trans.amount, 0);
  const expense = transactions
    .filter(trans => trans.amount < 0)
    .reduce((acc, trans) => acc + trans.amount, 0);

  balance = income + expense;

  balanceDisplay.innerText = `₹${balance.toFixed(2)}`;
  incomeDisplay.innerText = `+₹${income.toFixed(2)}`;
  expenseDisplay.innerText = `-₹${Math.abs(expense).toFixed(2)}`;

  transactionList.innerHTML = '';
  transactions.forEach((trans, index) => {
    const li = document.createElement('li');
    li.className = trans.amount < 0 ? 'minus' : 'plus';
    li.innerHTML = `${trans.text} <span>₹${trans.amount.toFixed(2)}</span>
                    <button class="delete-btn" onclick="removeTransaction(${index})">x</button>`;
    transactionList.appendChild(li);
  });
}

function addTransaction(e) {
  e.preventDefault();
  const text = document.getElementById('text').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (text.trim() === '' || isNaN(amount)) {
    alert('Please enter valid text and amount.');
    return;
  }

  const transaction = { text, amount };
  transactions.push(transaction);
  updateDisplay();

  document.getElementById('text').value = '';
  document.getElementById('amount').value = '';
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  updateDisplay();
}

form.addEventListener('submit', addTransaction);
