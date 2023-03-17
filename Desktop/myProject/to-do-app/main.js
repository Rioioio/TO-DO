
let userInput = document.querySelector('#todo')
let plusBtn = document.querySelector('#plus-button')
let tabs = document.querySelectorAll('.task-tabs div ')
let taskList = [];
let mode = 'all';
let filterList = [];


plusBtn.addEventListener('click', addTask);

for( let i = 1; i<tabs.length; i++) {
  tabs[i].addEventListener('click',function(event){filter(event)})
}


function addTask() {
  let task = {
    id: randomId(),
    taskContent: userInput.value,
    isComplete: false
  }

  taskList.push(task)
  console.log(task);
  render();
}

// 화면에 render 해주는 함수 ui 업뎃 함수
function render() {
  let list = []
  if ( mode == 'all') {
    list = taskList
  } else if ( mode == 'ing' || mode == 'done') {
    list = filterList
  } 
  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML +=
        `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
          <div>
        <button onclick="toggleComplete('${list[i].id}')">check</button> 
        <button onclick="deleteTask('${list[i].id}')">휴지통</button>  
        </div>
        </div>`;
    } else {
      resultHTML +=
      `<div class="task">
      <div>${list[i].taskContent}</div>
        <div>
      <button onclick="toggleComplete('${list[i].id}')">check</button> 
      <button onclick="deleteTask('${list[i].id}')">휴지통</button>  
      </div>
      </div>`;
    }
  }
  document.querySelector('#task-all').innerHTML = resultHTML;
}

// 체크 버튼 누르기! 
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render()
  console.log(taskList)
}

// 삭제 버튼 누르기! 
function deleteTask (id){
  for ( let i =0; i < taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList.splice(i,1)
      break;
    }
  }
  render();
 }
  
function filter(event){
  mode = event.target.id;
  if(mode == 'all' ) {
    render()
  } else if (mode == 'ing') {
    for ( let i =0; i<taskList.length; i++) {
      if(taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if ( mode == 'done') {
    for ( let i =0; i<taskList.length; i++) {
      if(taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  } 
  render();
}

//  unique id 생성 함수
function randomId() {
  return Math.random().toString(36).substr(2, 16);
}

