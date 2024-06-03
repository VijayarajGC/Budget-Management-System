let transactions = [];

function addTransaction() {
    const description = document.getElementById('transaction-description').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const type = document.getElementById('transaction-type').value;

    if (description.trim() === '' || isNaN(amount)) {
        alert('Please enter valid description and amount.');
        return;
    }

    const transaction = {
        description,
        amount,
        type
    };

    transactions.push(transaction);
    updateTransactionsList();
    updateBudgetSummary();
}

function updateTransactionsList() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const item = document.createElement('li');
        item.textContent = `${transaction.description}: ${transaction.amount.toFixed(2)}`; // INR currency symbol
        transactionList.appendChild(item);
    });
}

function updateBudgetSummary() {
    const incomeAmount = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expensesAmount = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const remainingAmount = incomeAmount - expensesAmount;

    document.getElementById('income-amount').innerHTML = `${incomeAmount.toFixed(2)}`; // INR currency symbol
    document.getElementById('expenses-amount').innerHTML = `${expensesAmount.toFixed(2)}`; // INR currency symbol
    document.getElementById('remaining-amount').innerHTML = `${remainingAmount.toFixed(2)}`; // INR currency symbol
}
