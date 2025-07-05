"use strict";
//Get DOM elements for our TS
const expType = document.getElementById('expense-type');
const expDesc = document.getElementById('desc');
const expAmt = document.getElementById('amount');
const addExpBtn = document.querySelector('.add-expense-btn');
//Div containers for expenses list
const debitDiv = document.querySelector('.expense-debit-item-container');
const creditDiv = document.querySelector('.expense-credit-item-container');
//Total amoutn div
const totalAmtDiv = document.querySelector('.total-expense-amount');
//Arr to store expenses
let expenseItems = [];
//Store balance + total amount of expenses
let totalAmount = 0;
class Expense {
    constructor(type, desc, amount) {
        this.id = 0;
        this.type = 'debit';
        this.description = '';
        this.amount = 0;
        this.type = type;
        this.description = desc;
        this.amount = amount;
        this.id = ++Expense.currentId;
    }
}
function displayExpenseItems() {
    creditDiv.innerHTML = '';
    debitDiv.innerHTML = '';
    for (let i = 0; i < expenseItems.length; i++) {
        let expItem = expenseItems[i];
        let containerDiv = expItem.type === 'credit' ? creditDiv : debitDiv;
        let cssClass = expItem.type === 'credit' ? 'credit-item' : 'debit-item';
        let template = `
        <div class="${cssClass}">
            <div class="exp-desc">${expItem.description}</div>
            <div class="exp-amt">${expItem.amount}</div>
            <div class="exp-delete">
                <button class="delete-expense" onclick="deleteExpense(${expItem.id})">X</button>
            </div>
        `;
        containerDiv.insertAdjacentHTML('beforeend', template);
    }
}
function calculateTotal() {
    return expenseItems.reduce((total, exp) => {
        let amount = exp.amount;
        if (exp.type === 'debit') {
            amount = -amount;
        }
        total += amount;
        return total;
    }, 0);
}
;
function showTotal() {
    totalAmtDiv.textContent = totalAmount.toString();
}
addExpBtn.addEventListener('click', function (event) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    let type = expType.value === 'credit' ? 'credit' : 'debit';
    const exp = new Expense(type, expDesc.value, +expAmt.value);
    //Add expense to the arr
    expenseItems.push(exp);
    //display the elements in list in propert div containers
    displayExpenseItems();
    //Calculate total amount
    totalAmount = calculateTotal();
    //Display total
    showTotal();
});
function deleteExpense(id) {
    const exp = expenseItems.find((element) => {
        return element.id === id;
    });
    let index = expenseItems.indexOf(exp);
    expenseItems.splice(index, 1);
    displayExpenseItems();
    totalAmount = calculateTotal();
    showTotal();
}
