const title = document.querySelector("#title");
const description = document.querySelector("#description");
const form = document.querySelector("form");
const container = document.querySelector(".container");


const tasks =localStorage.getItem("alltasks")  
?  JSON.parse(localStorage.getItem("alltasks"))
: [];

showAllTasks();

function showAllTasks(){
    tasks.forEach((objValue,objIndex)=>{
        const div = document.createElement("div");
        div.setAttribute("class","task");

        const innerDiv = document.createElement("div");
        div.append(innerDiv);

        const p = document.createElement("p");
        p.innerText = objValue.title;
        innerDiv.append(p)
        const span = document.createElement("span");
        span.innerText = objValue.description;
        innerDiv.append(span);

        const btn = document.createElement("button");
        btn.setAttribute("class","deleteBtn");
        btn.innerText = "-";
        btn.addEventListener("click",()=>{
            removeAllTasks(); // first remove all tasks
            tasks.splice(objIndex,1); //delete from array
            localStorage.setItem("alltasks",JSON.stringify(tasks));
            showAllTasks(); //show the array
        })

        div.append(btn);
        container.append(div);
    });
};

function removeAllTasks(){
    tasks.forEach((objValue)=>{
        const div = document.querySelector(".task");
        div.remove();        
    });
};

form.addEventListener("submit",function(evt){
    evt.preventDefault();
    removeAllTasks();  //remove previous tasks
    tasks.push({
        title:title.value,
        description:description.value 
    });      //push all tasks
    localStorage.setItem("alltasks",JSON.stringify(tasks));// store in Local storage to prevent loss due to refresh
    title.value = "";
    description.value = "";
    showAllTasks();   //show them
})