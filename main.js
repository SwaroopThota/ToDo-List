function addEvent() {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  if (title.length > 0) {
    if (localStorage.getItem("listJson") == null) {
      list = [];
      list.push([title, desc]);
      localStorage.setItem("listJson", JSON.stringify(list));
    } else {
      listStr = localStorage.getItem("listJson");
      list = JSON.parse(listStr);
      list.push([title, desc]);
      localStorage.setItem("listJson", JSON.stringify(list));
    }
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
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
        <tr ondblclick="done(this)">
        <th scope="row" class="user-select-none">${index + 1}</th>
        <td class="user-select-none">${element[0]}</td>
        <td class="user-select-none">${element[1]}</td>
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
