let expenses = [];

function handleFormSubmit(event) {
    event.preventDefault();
    const categoryInput = document.getElementById('category');
    const amountInput = document.getElementById('amount');
    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value);

    // Validation
    if (!category) {
        alert('Please select a category.');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Amount must be a positive number.');
        return;
    }

    expenses.push({ category, amount });

    renderExpenses();
    renderTotals();

    event.target.reset();
}

function renderExpenses() {
    const tbody = document.querySelector("section:nth-of-type(2) tbody");
    tbody.innerHTML = "";
    expenses.forEach(exp => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${new Date().toLocaleDateString()}</td>
            <td>${exp.category}</td>
            <td>${exp.amount.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

function renderTotals() {
    const totals = {};
    expenses.forEach(exp => {
        totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
    });

    const tbody = document.querySelector("section:nth-of-type(3) tbody");
    tbody.innerHTML = "";
    for (const [category, amount] of Object.entries(totals)) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${category}</td><td>${amount.toFixed(2)}</td>`;
        tbody.appendChild(row);
    }
}

document.getElementById("expense-form").addEventListener("submit", handleFormSubmit);