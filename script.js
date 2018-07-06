const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
  TODO_CHECKED_PARENT: 'todo-checked-parent',
  DELETE_BUTTON: 'delete-button'
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
  
  // get user input (to do text)
  const message = 'Enter a to do item:'
  userInput = window.prompt(message, '');
  if (!userInput) {
    return
  }
  // create text node with to do item text
  const newContent = document.createTextNode(userInput); 
  
  // create new list item
  const newItem = document.createElement('li')
  newItem.className = classNames.TODO_ITEM
  
  // create new checkbox
  const newInput = document.createElement('input')
  newInput.setAttribute('type', 'checkbox')
  newInput.className = classNames.TODO_CHECKBOX
  newInput.setAttribute('onclick', 'toggleCheck(this)' )
  
  // create new delete button
  const newDeleteButton = document.createElement('button')
  newDeleteButton.className = classNames.DELETE_BUTTON
  newDeleteButton.innerHTML = 'Delete'
  newDeleteButton.setAttribute('onclick', 'deleteItem(this)')
  
  // add the checkbox, todo text, and delete button to the list item
  newItem.appendChild(newInput)
  newItem.appendChild(newContent);  
  newItem.appendChild(newDeleteButton)

  // add the list item into the DOM 
  list.appendChild(newItem); 

  // update item and unchecked counts 
  let itemCount = itemCountSpan.innerHTML
  let uncheckedCount = uncheckedCountSpan.innerHTML
  itemCount = Number(itemCount) + 1
  uncheckedCount = Number(uncheckedCount) + 1
  itemCountSpan.innerHTML = itemCount.toString()
  uncheckedCountSpan.innerHTML = uncheckedCount.toString()
}

function toggleCheck(item) {

  // get the unchecked count
  let uncheckedCount = uncheckedCountSpan.innerHTML

  // check if this is a checked item
  if (item.parentElement.classList.contains(classNames.TODO_CHECKED_PARENT)) {

    // if it's checked, take the todo_checked class away (on the parent so we can do the strikethrough)
    item.parentElement.classList.remove(classNames.TODO_CHECKED_PARENT)
    
    // update the unchecked count
    uncheckedCount = Number(uncheckedCount) + 1
    
  } else { // it's not checked
    
    // change the class 
    item.parentElement.classList.add(classNames.TODO_CHECKED_PARENT)
    
    // update the unchecked count
    uncheckedCount = Number(uncheckedCount) - 1
    
  }
  // update the count text on screen
  uncheckedCountSpan.innerHTML = uncheckedCount.toString()
} 

function deleteItem(item) {
  
  // update the unchecked count (only if it's unchecked)
  if (!item.parentElement.classList.contains(classNames.TODO_CHECKED_PARENT)) {
    let uncheckedCount = uncheckedCountSpan.innerHTML
    uncheckedCount = Number(uncheckedCount) - 1
    uncheckedCountSpan.innerHTML = uncheckedCount.toString()
  }

  // update the item count (for all deletions)
  let itemCount = itemCountSpan.innerHTML
  itemCount = Number(itemCount) - 1
  itemCountSpan.innerHTML = itemCount.toString()

  // remove the item
  item.parentElement.remove(item)
}
