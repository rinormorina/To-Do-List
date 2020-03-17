// Select the DOM

const refresh = document.querySelector(".refresh");
const date = document.querySelector(".date");
const list_item = document.querySelector("#list");
const input = document.querySelector("#input");

// Set classes names

const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "lineThrough";


// Set input variables

let values = [], id = 0;

// Variable for local storage

let localData = localStorage.getItem("toDO");

// Save in localstorage

localStorage.setItem("toDO", JSON.stringify(values));


if(localData){
    values = JSON.parse(localData);
    id = values.length;
    loadValues(values);
} else{
    values = [];
    id = 0;
}

function loadValues(array){
    array.forEach(function (item){
        todoList(item.name, item.id, item.done, item.trash);
    });
}
// DATE

const options = {weekday : "long", month: "long", day: "numeric"}
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-UK", options);

// To do list

function todoList (toDO, id, done, trash){

    if(trash){
        return;
    }

    const DONE = done ? check : uncheck;
    const LINE = done ? lineThrough : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDO}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                 ` 
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
const toDO = input.value;

if(toDO){
    todoList(toDO, id, false, false);
    
     values.push ({
         name : toDO,
         id : id,
         done : false,
         trash : false
     });
     
     localStorage.setItem("toDO", JSON.stringify(values));

     id++;
     
     
}{
    input.value = "";
}

    }
});


// Give values ToDO
function activeToDO(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);

    values[element.id].done = values[element.id].done ? false : true;

}

function trash(element){
     element.parentNode.parentNode.removeChild(element.parentNode);
     values[element.id].trash = true;

}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementRole = element.attributes.job.value;

    if(elementRole == "complete"){
        activeToDO(element);
    }else if(elementRole == "delete"){
        trash(element); 
    }
    localStorage.setItem("toDO", JSON.stringify(values));

});

// Refresh the inputs
refresh.addEventListener("click", function(values, id){

    localStorage.clear();
    location.reload();
});