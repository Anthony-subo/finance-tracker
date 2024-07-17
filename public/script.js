const ctxBalance = document.getElementById('balanceChart').getContext('2d');
const ctxExpense = document.getElementById('expenseChart').getContext('2d');
const ctxAnnual = document.getElementById('annualGraph').getContext('2d');

const balanceChart = new Chart(ctxBalance, {
    type: 'pie',
    data: {
        labels: ['Remaining', 'Spent'],
        datasets: [{
            data: [1000, 0],
            backgroundColor: ['#4CAF50', '#F44336']
        }]
    },
    options: {}
});

const expenseChart = new Chart(ctxExpense, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: []
        }]
    },
    options: {}
});

const annualGraph = new Chart(ctxAnnual, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Expenses',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: '#F44336',
            fill: false
        }]
    },
    options: {}
});

document.getElementById('expenseForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = document.getElementById('expenseAmount').value;
    const expenseColor = document.getElementById('expenseColor').value;

    expenseChart.data.labels.push(expenseName);
    expenseChart.data.datasets[0].data.push(expenseAmount);
    expenseChart.data.datasets[0].backgroundColor.push(expenseColor);

    balanceChart.data.datasets[0].data[1] += Number(expenseAmount);
    balanceChart.data.datasets[0].data[0] -= Number(expenseAmount);

    expenseChart.update();
    balanceChart.update();
});

function logout() {
    document.cookie = 'token=; Max-Age=0';
    window.location.href = '/';
}
