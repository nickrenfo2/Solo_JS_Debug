// ! ! !
// Three Bugs
// array passed into CalculateSTI was the entire array of arrays. Fixed so that it will pass in only one array at a time.
// fixed getBaseSTI so that bonus returned is a positive number
// Fixed bug allowing a negative bonus for poorly rated and well paid employees
// Rounded bonus and salary to the nearest whole dollar


var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	array[i] = calculateSTI(array[i]);
 	newEl = document.createElement('li');
    var textInfo =  prettyText(array[i]);
    newText = document.createTextNode(textInfo);
	newEl.appendChild(newText);
	position.appendChild(newEl);
}

function prettyText(arr) {
    var text = '';
    var textclass = '';
    for (var i=0;i<arr.length;i++) {
        console.log('text1:'+text);
        if (i!=0) 
            text += ", ";
        
        text += arr[i];
        console.log('text2:'+text);
    }
    return text;
}

function calculateSTI(array){
  var newArray = [];

  newArray[0] = array[0];
  var employeeNumber = array[1];
  var baseSalary = parseInt(array[2]);
  var reviewScore = array[3];
//console.log("calcSTI: Emp#"+employeeNumber+"|baseSal:"+baseSalary+"|rate:"+reviewScore);
  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  } else if (bonus < 0) {
    bonus = 0;
  }

  newArray[1] = bonus;
  newArray[2] = Math.round(baseSalary * (1.0 + bonus));
  newArray[3] = Math.round(baseSalary * bonus);
  console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  return newArray;
}

function getBaseSTI(reviewScore){
  var basePercent = 0;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  return basePercent;
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}