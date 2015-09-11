// ! ! !
// Three Bugs
// array passed into CalculateSTI was the entire array of arrays. Fixed so that it will pass in only one array at a time.
// fixed getBaseSTI so that bonus returned is a positive number
// Fixed bug allowing a negative bonus for poorly rated and well paid employees
// Rounded bonus and salary to the nearest whole dollar


function hire(emp) {
    this.name=emp[0];
    this.id=emp[1];
    this.salary=emp[2];
    this.rating=emp[3];
}

var atticus = {
    name:   "Atticus", 
    id:     "2405", 
    salary: "47000", 
    rating: 3
};
var jem = {
    name:   "Jem",
    id:     "62347",
    salary: "63500", 
    rating:  4
};
var boo = {
    name:"Boo", 
    id:"11435", 
    salary:"54000", 
    rating:3
};
var scout = {
    name:"Scout", 
    id:"6243", 
    salary:"74750", 
    rating:5};

//var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];


//
//var atticus = {};
//var jem     = {};
//var boo    = {};
//var scout  = {};
//
//atticus = hire(arrayAtticus);
//jem     = hire(arrayJem);
//boo     = hire(arrayBoo);
//scout   = hire(arrayScout);

array = [atticus, jem, boo, scout];

console.log("dudes: "+array);

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
//
function prettyText(arr) {
    var text = '';
    for (var key in arr) {
        console.log('text1:'+text);
        if (key!='name') 
            text += ", ";
        
        text += arr[key];
        console.log('text2:'+text);
    }
    return text;
}

function calculateSTI(emp){
  var newObj = {};

  newObj.name = emp.name;
  var employeeNumber = emp.id;
  var baseSalary = parseInt(emp.salary);
  var reviewScore = emp.rating;
    console.log(employeeNumber+"|"+baseSalary+"|"+reviewScore);
//console.log("calcSTI: Emp#"+employeeNumber+"|baseSal:"+baseSalary+"|rate:"+reviewScore);
  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  } else if (bonus < 0) {
    bonus = 0;
  }

  newObj.bonusPct = bonus;
  newObj.totalAnnualCompensation = Math.round(baseSalary * (1.0 + bonus));
  newObj.bonusDol = Math.round(baseSalary * bonus);
  //console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  return newObj;
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