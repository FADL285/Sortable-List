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
}

createList();
