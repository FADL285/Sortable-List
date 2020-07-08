const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Bernard Arnault',
  'Mark Zuckerberg',
  'Warren Buffett',
  'Larry Ellison',
  'Steve Ballmer',
  'Larry Page',
  'Amancio Ortega',
  'Sergey Brin',
];

const listItems = [];

let dragStartIndex;

// shuffle richest person array

function shuffle(array) {
  const newArray = [...array];
  return newArray.sort(() => Math.random() - 0.5);
}

// creat List items & insert them into DOM

createList();

function createList() {
  const items = document.createDocumentFragment();
  for (const [index, person] of shuffle(richestPeople).entries()) {
    const listItem = document.createElement('li');

    listItem.setAttribute('data-index', index);

    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

    listItems.push(listItem);

    items.appendChild(listItem);
  }

  draggableList.appendChild(items);

  addEventListeners();
}

// Event Listeners
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

// Drag Functions
function dragStart() {
  // console.log('dragStart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  // console.log(dragStartIndex);
}

function dragEnter() {
  // console.log('dragEnter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('dragLeave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('dragOver');
  e.preventDefault();
}

function dragDrop() {
  // console.log('dragDrop');
  const dragEndIndex = +this.getAttribute('data-index');

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}
