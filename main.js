function addEvent() {
  let title = document.getElementById("title").value;
  if (title.length > 0) {
    if (localStorage.getItem("listJson") == null) {
      list = [];
      list.push([title]);
      localStorage.setItem("listJson", JSON.stringify(list));
    } else {
      listStr = localStorage.getItem("listJson");
      list = JSON.parse(listStr);
      list.push([title]);
      localStorage.setItem("listJson", JSON.stringify(list));
    }
    document.getElementById("title").value = "";
    updateList();
  }
}

function updateList() {
  if (localStorage.getItem("listJson") != null) {
    listStr = localStorage.getItem("listJson");
    list = JSON.parse(listStr);
    let str = "";
    list.forEach((element, index) => {
      str += `
        <tr onclick="done(this)">
        <th scope="row" class="user-select-none w-25">${index + 1}</th>
        <td class="user-select-none w-50 text-break">${element}</td>
        <td class="user-select-none"><button class="btn btn-primary mx-2" onclick="deleteEvent(${index})">Delete</button></td>
      </tr>
        `;
    });
    document.getElementById("tableBody").innerHTML = str;
  }
}

function deleteEvent(index) {
  console.log("deleting");
  if (localStorage.getItem("listJson") != null) {
    listStr = localStorage.getItem("listJson");
    list = JSON.parse(listStr);
    list.splice(index, 1);
    localStorage.setItem("listJson", JSON.stringify(list));
    updateList();
  }
}

function clearList() {
  if (localStorage.getItem("listJson") != null) {
    listStr = localStorage.getItem("listJson");
    list = JSON.parse(listStr);
    if (list.length != 0) {
      if (confirm("Do you want to clear the list?")) {
        list.splice(0, list.length);
        localStorage.setItem("listJson", JSON.stringify(list));
        updateList();
      }
    }
  }
}
function done(tr) {
  tr.classList.toggle("text-decoration-line-through");
}
function onEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addTask").click();
  }
}