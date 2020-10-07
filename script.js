const dateElement=document.getElementById('date');
const input = document.getElementById("input");
const list = document.getElementById("list");
const clear= document.querySelector('.clear')
const addbutton=document.getElementById('add-button')
const CHECK = "fa-check-circle";
const UNCHECK ="fa-circle" ;
const LINE_THROUGH = "lineThrough";

let LIST,id;

const today=new Date()

const options = {weekday : "long", month:"short", day:"numeric"};
dateElement.innerHTML=today.toLocaleDateString("en-US" , options)

let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addtoDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

function addtoDo(todo,id,done,trash){
    if (trash) {return ; }

    const DONE= done ? CHECK : UNCHECK;
    const LINE= done ? LINE_THROUGH: "";
    const item= 
    `<li class="item">
    <i class="far ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${todo}</p>
        <i class="fa fas fa-trash de" job="delete" id="${id}"></i> 
    </li>`

    const position="beforeend";

    list.insertAdjacentHTML(position, item);
}

addbutton.addEventListener('click',function(){
    const todo=input.value;
    if(todo){
        addtoDo(todo,id,false,false)
        LIST.push({
            name:todo,
            id:id,
            done:false,
            trash:false
        })
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
    }
    input.value='';
})

function complete(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LIST[element.id].done=LIST[element.id].done ? false:true;
}

function remove(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    element.addEventListener('LIST[element.id].trash = true;')

}


list.addEventListener('click',function(event){
    const element=event.target;
    const elementJOB=element.attributes.job.value;
    if(elementJOB=="complete"){
        complete(element)
    }else if(elementJOB=="delete"){
        remove(element)
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
})
