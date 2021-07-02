if (localStorage.getItem("listJson") == null)
  localStorage.setItem("listJson", "");
let list = [{name: "Learn Java",completed: false},{name: "Attend Classes",completed: false},{name: "Go to market",completed: true}];
let listStr = localStorage.getItem("listJson");
if (listStr != "") list = JSON.parse(listStr);
function addTask() {
  let input = document.getElementById("title");
  if (input.value.length > 0) {
    list.push({
      name: input.value,
      completed: false,
    });
    localStorage.setItem("listJson", JSON.stringify(list));
    input.value = "";
    updateList();
  }
}
function updateList() {
  let str ='<li class="list-group-item active fs-4 text-center" aria-current="true">Tasks</li>';
  if (list.length == 0) {
    str += '<li class="list-group-item text-muted">No tasks to do.</li>';
  }
  else {
    list.forEach((element, index) => {
      str += `<li class="list-group-item list-group-item-action d-flex`;
      str += (element.completed)?` bg-success`:``;
      str +=`"><p style="cursor: pointer !important;" class="m-0 user-select-none`;
      str += (element.completed)?` text-decoration-line-through`:``;
      str +=`" onclick="done(${index})">${index + 1}. ${element.name}</p> <button type="button" class="btn-close d-block ms-auto" aria-label="Close" onclick="deleteTask(${index})"></button></li>`;
    });
  }
  document.getElementById("taskList").innerHTML = str;
}
function done(index) {
  list[index].completed = !list[index].completed;
  localStorage.setItem("listJson", JSON.stringify(list));
  updateList();
}
function onEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
}
function deleteTask(index) {
    list.splice(index,1);
    localStorage.setItem("listJson", JSON.stringify(list));
    updateList();
}
