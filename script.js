const date = new Date();
const curDay = date.getDate();
const curMonth = date.getMonth()+1;
const curYear = date.getFullYear();
window.onload = function() {
    
    document.getElementById("button").addEventListener("click", pressCalc);
    // today = [date.getDate(), date.getMonth()+1, date.getFullYear()];
    
    // console.log(today)
    // console.log(monthMap[12])
}

const monthMap = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}
function pressCalc() {
    var day = parseInt(document.getElementById("input-day").value);
    var month = parseInt(document.getElementById("input-month").value);
    var year = parseInt(document.getElementById("input-year").value);

    ans = checkValid(day, month, year);
    if(ans[0]) {
        document.getElementById("answer-year").innerText = ans[3];
        document.getElementById("answer-month").innerText = ans[2];
        document.getElementById("answer-day").innerText = ans[1];

        const headers = document.getElementsByClassName('date-header');
        const inputs = document.getElementsByClassName('input');
        for(let i = 0; i < headers.length; i++) {
            let header = headers[i];
            let input = inputs[i];
            header.style.color = "gray";
            input.style.borderColor = "lightgray";
        }
    }
    else {
        document.getElementById("answer-year").innerText = "--";
        document.getElementById("answer-month").innerText = "--";
        document.getElementById("answer-day").innerText = "--";

        const headers = document.getElementsByClassName('date-header');
        const inputs = document.getElementsByClassName('input');
        for(let i = 0; i < headers.length; i++) {
            let header = headers[i];
            let input = inputs[i];
            header.style.color = "red";
            input.style.borderColor = "red";
        }

    }
}

function checkValid(day, month, year) {
    var valid = true;
    // console.log(year)
    if(isNaN(year)){
        valid = false;
        document.getElementById('invalid-year').innerText = "This field is required"
    }
    else {
        if(!(year > 1900 && year <= curYear)) {
            document.getElementById("invalid-year").innerText = "Must be a valid year";
            valid = false;
        }
        else {
            document.getElementById("invalid-year").innerText = "";
        }
    }
    

    if(isNaN(month)){
        valid = false;
        document.getElementById('invalid-month').innerText = "This field is required"
    }
    else {
        if(!(month > 0 && month <= 12)){
            document.getElementById("invalid-month").innerText = "Must be a valid month";
            valid = false;
        }
        else {
            document.getElementById("invalid-month").innerText = "";
        }
    }
    

    if(isNaN(day)){
        valid = false;
        document.getElementById('invalid-day').innerText = "This field is required";
    }
    if(day > 0 && day <= 31){
        if(day > monthMap[month]){
            if(checkLeap(year) && day === 29) console.log("leap feb 29")
            else {
                valid = false;
                document.getElementById('invalid-day').innerText = "Must be a valid date";
            }
        }
        else {
            document.getElementById("invalid-day").innerText = "";
        }
    }
    else {
        document.getElementById("invalid-day").innerText = "Must be a valid day";
    }

    const date1 = new Date(curYear, curMonth, curDay);
    const date2 = new Date(year, month, day);
    const diff = new Date(date1.getTime() - date2.getTime());
    day = diff.getUTCDate() - 1;
    month = diff.getUTCMonth();
    year = diff.getUTCFullYear() - 1970;

    if(year < 0) {
        valid = false;
        document.getElementById('invalid-year').innerText = "Must be in the past"
    }
    return [valid, day, month, year];
}

function checkLeap(year) {
    if(year % 4 === 0) {
        if(year % 100 === 0) {
            if(year % 400 === 0) {
                return true;
            }
            else return false;
        }
        else return true;
    }
    else return false;
}