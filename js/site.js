//get the values from the user
//controller function
function getValues() {
    //gets the value from the page
    let loanAmount = document.getElementById("loanAmount").value;
    let paymentAmount = document.getElementById("paymentAmount").value;
    let rateAmount = document.getElementById("rateAmount").value;

    //We need to validate our input
    //parse into Integers
    loanAmount = parseInt(loanAmount);
    paymentAmount = parseInt(paymentAmount);
    rateAmount = parseInt(rateAmount);

    if (Number.isInteger(loanAmount) && Number.isInteger(paymentAmount) && Number.isInteger(rateAmount)) {
        let monthlyPayment = totalMonthlyPayment(loanAmount, paymentAmount, rateAmount);
        //call calculatePayment
       let monthlyRow = calculatePayment(loanAmount, paymentAmount, rateAmount);
        //call display data by passing in the array
        displayData(monthlyRow, monthlyPayment, loanAmount);
    } else {
        alert("You must enter integers");
    }
}

function calculatePayment(loanAmount, paymentAmount, rateAmount) {
    let monthlyRow = [];
    let monthlyPayment = totalMonthlyPayment(loanAmount, paymentAmount, rateAmount);
    let remainingBalance = loanAmount;
    let interestPayment;
    let principalPayment;
    let totalInterest = 0;

    for(let i = 1; i <= paymentAmount; i++) {
        interestPayment = remainingBalance * rateAmount/1200;
        principalPayment = monthlyPayment - interestPayment;
        totalInterest += interestPayment;
        // using the exact principalPayment value to update the balance
        remainingBalance -= principalPayment; 
        // rounding the principal for display
        //monthlyRow.push(i, monthlyPayment, Math.round(principalPayment * 100) / 100 , Math.round(interestPayment * 100) / 100, Math.round(totalInterest * 100) / 100, Math.round(remainingBalance * 100) / 100);
        if (remainingBalance < 0)
        {
            remainingBalance = 0;
        }
        monthlyRow.push(i, monthlyPayment, principalPayment, interestPayment, totalInterest, remainingBalance);
        
    }

    return monthlyRow;
}


//calculates the total monthly payment
function totalMonthlyPayment(loanAmount, paymentAmount, rateAmount) {
    let monthlyPayment = (loanAmount * (rateAmount/1200)) / (1 - Math.pow((1 + rateAmount/1200), -paymentAmount));
    //monthlyPayment = Math.round(monthlyPayment * 100) / 100;
    return monthlyPayment;
}


//displays the data on the screen
function displayData(monthlyRow, monthlyPayment, loanAmount) {

    let monthlyPaymentText = document.getElementById("monthlyPaymentText");
    let totalPrincipalText = document.getElementById("totalPrincipal");
    let totalInterestText = document.getElementById("totalInterest");
    let totalRateText = document.getElementById("totalRate");

    //get the table body element from the page
    let tableBody = document.getElementById("results");

    //get the template row
    let templateRow = document.getElementById("rowTemplate");

    // Format the numbers
    let formattedMonthlyPayment = monthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    let formattedLoanAmount = loanAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    let formattedTotalInterest = monthlyRow[monthlyRow.length - 2].toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    let formattedTotalRate = (loanAmount + monthlyRow[monthlyRow.length - 2]).toLocaleString('en-US', { style: 'currency', currency: 'USD' });



     monthlyPaymentText.textContent = formattedMonthlyPayment;
     totalPrincipalText.textContent = formattedLoanAmount;
     totalInterestText.textContent = formattedTotalInterest;
     totalRateText.textContent = formattedTotalRate;
 
     //clear table first
     tableBody.innerHTML = "";

     for (let i = 0; i < monthlyRow.length; i += 6) {

        let tableRow = document.importNode(templateRow.content, true);

        //grab just the td and put into array
        let rowCols = tableRow.querySelectorAll("td");
       
        rowCols[0].textContent = monthlyRow[i];
        rowCols[1].textContent = monthlyRow[i+1].toFixed(2);
        rowCols[2].textContent = monthlyRow[i+2].toFixed(2);
        rowCols[3].textContent = monthlyRow[i+3].toFixed(2);
        rowCols[4].textContent = monthlyRow[i+4].toFixed(2);
        rowCols[5].textContent = monthlyRow[i+5].toFixed(2);
    

        tableBody.appendChild(tableRow);
     }
}