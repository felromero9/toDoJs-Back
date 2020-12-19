const service = new ToDoServiceMock();

service.getAll();


// Select the elements
const clear = document.querySelector('.clear');
const date = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes names
const check = 'fa-check-circle';
const uncheck = 'fa-circle-thin';
const lineTrough = 'lineThrough';

// Show date
const options = {
  weekDay: "long",
  month: "short",
  day: "numeric"
}
const today = new Date();

console.log(today.toLocaleDateString("en-US", options));

date.innerHTML = today.toLocaleDateString("en-US", options);


let LIST, id;

// get item from local Storage
let data = localStorage.getItem("TODO");

const loadList = array => {
  array.forEach(element => {
    addToDo(element.name, element.id, element.done, element.deleted);

  });

}

//to do
const addToDo = (toDo, id, done, deleted) => {

  if (deleted) {
    return;
  }

  const DONE = done ? check : uncheck;
  const LINE = done ? lineThrough : "";

  const item = `
    <li class="item">
      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}"> ${toDo} </p>
      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
  `
  const position = 'beforeend';

  list.insertAdjacentHTML(position, item);

}
//addToDo('test', 1, true, false);

class Renderer {
  constructor(service) {
    this.service = service;
    this.list = [];
  }

  renderToDo(todo) {
    if (todo.deleted) {
      return '';
    }

    const DONE = todo.done ? check : uncheck;
    const LINE = todo.done ? lineThrough : "";

    const item = `
      <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${todo.id}"></i>
          <p class="text ${LINE}"> ${todo.toDo} </p>
        <i class="fa fa-trash-o de" job="delete" id="${todo.id}"></i>
      </li>
    `;

    return item;
  }

  render() {
    let result = [];

    for (const todo of this.list) {
      result.push(this.renderToDo(todo));
    }

    list.innerHTML = result.join('');
  }
}

// Add item with enter key
document.addEventListener('keyup', (even) => {
  if (event.keyCode == 13) {
    const toDo = input.value;

    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        deleted: false
      });
      // add item to local Storage
      localStorage.setItem('TODO', JSON.stringify(LIST));
      id++;

    }

    input.value = ''; // clear the input
  }
})

const completeToDo = element => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector('.text').classList.toggle(lineTrough);

  LIST[element.id].done = LIST[element.id].done ? false : true;

}


const removeToDo = element => {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].deleted = true;

}

// target the items created
list.addEventListener("click", (event) => {
  const element = event.target; // return the clicked element inside the list
  const elementJob = element.attributes.job.value; // complete or deleted

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  };
  // add item to local Storage
  localStorage.setItem('TODO', JSON.stringify(LIST));

})

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.lenght; // set the id to the last one in the list
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

// Inicio del archivo

// target the items created
list.addEventListener("click", (event) => { });

const service = new ToDoServiceMock();
const renderer = new Renderer(service);

renderer.render();