if(localStorage.getItem("listJson")==null)
localStorage.setItem("listJson","");
list=[]
function addTask() {
  let input = document.getElementById("title");
  if (input.value.length > 0) {
      listStr = localStorage.getItem("listJson");
      if(listStr!="")
      list = JSON.parse(listStr);
    list.push({
      name: input.value,
      completed:false
    });
    localStorage.setItem("listJson", JSON.stringify(list));
    input.value = "";
    updateList();
  }
}
function updateList() {
    listStr = localStorage.getItem("listJson");
    if(listStr!="")
    list = JSON.parse(listStr);
    let str = '<li class="list-group-item active fs-4 text-center" aria-current="true">Tasks</li>';
    if(list.length==0){
      str+='<li class="list-group-item text-muted">No tasks to do.</li>';
    }else{
    list.forEach((element, index) => {
      str += `<li class="list-group-item list-group-item-action user-select-none`;
      str += (element.completed)? ` text-decoration-line-through`:` `;
      str +=`"  onclick="done(${index})" >${index+1}. ${element.name}</li>`;
    });
  }
    document.getElementById("taskList").innerHTML= str;
}
function done(index) {
    listStr = localStorage.getItem("listJson");
    list = JSON.parse(listStr);
    list[index].completed=!list[index].completed;
    localStorage.setItem("listJson", JSON.stringify(list));
    updateList();
}
function onEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
}
function clearCompleted(){
    listStr = localStorage.getItem("listJson");
    list = JSON.parse(listStr);
    list=list.filter((ele)=>{
      if(!ele.completed) return ele;
    });
    localStorage.setItem("listJson", JSON.stringify(list));
    updateList();
}
