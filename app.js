    function saveToLocalStorage(event) {
        event.preventDefault();
        const amount = event.target.amount.value;
        const description = event.target.description.value;
        const category = event.target.category.value;
        // localStorage.setItem('amount',amount);
        // localStorage.setItem('description', description);
        // localStorage.setItem('category', category)
        const obj = {
            amount,
            description,
            category
        }

        console.log(obj.amount);
        console.log(obj.description);
        console.log(obj.category);
        console.log(obj);

        localStorage.setItem(obj.description, JSON.stringify(obj));
        console.log(JSON.stringify(obj));
        showNewExpenseOnScreen(obj)
    }

    function showNewExpenseOnScreen(expense){
        document.getElementById('amount').value = '';
        // let try = document.getElementById('amount').value = '';
        // console.log(try);
        console.log("--------------------------------------------------");
        document.getElementById('description').value = '';
        document.getElementById('category').value ='';
        // console.log(localStorage.getItem(expense.description))
        if(localStorage.getItem(expense.description) !== null){
            removeExpenseFromScreen(expense.description);
        }

        const parentNode = document.getElementById('listOfExpenses');
        const childHTML = `<li id=${expense.description}> ${expense.amount} - ${expense.description} - ${expense.category}
                                <button onclick=deleteExpense('${expense.description}')> Delete Expense </button>
                                <button onclick=editExpense('${expense.amount}','${expense.description}','${expense.category}')>Edit Expense </button>
                             </li>`

        parentNode.innerHTML = parentNode.innerHTML + childHTML;
    }

    //Edit Expense

    function editExpense(amount,description,category){

        document.getElementById('amount').value = amount;
        document.getElementById('description').value = description;
        document.getElementById('category').value =category;

        deleteExpense(description)
     }

    // deleteExpense

    function deleteExpense(description){
        console.log(description)
        localStorage.removeItem(description);
        removeExpenseFromScreen(description);

    }

    function removeExpenseFromScreen(description){
        const parentNode = document.getElementById('listOfExpenses');
        const childNodeToBeDeleted = document.getElementById(description);
        if(childNodeToBeDeleted) {
            parentNode.removeChild(childNodeToBeDeleted)
        }
    }
    window.addEventListener("DOMContentLoaded",load);
    function load(){
        const localStorageObj = localStorage;
        console.log(localStorageObj);
        const localstoragekeys  = Object.keys(localStorageObj)
        console.log(localstoragekeys);

        for(var i =0; i< localstoragekeys.length; i++){
            const key = localstoragekeys[i]
            const userExpensesString = localStorageObj[key];
            const userExpensesObj = JSON.parse(userExpensesString);
            showNewExpenseOnScreen(userExpensesObj);
        }
    };
