import './App.css';
import {v4 as uuid} from 'uuid'
import { useState } from 'react';

//JSX is syntax extension to javascript or Javascript XML
function App() {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("todo")) || []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }
  const handleAddClick = () =>{
    const updatedTodo = [...todo,  {id: uuid() , todo: inputValue, isChecked: false}]
    setTodo(updatedTodo)
    localStorage.setItem("todo", JSON.stringify(updatedTodo))
    setInputValue("");
  }
  const handleDeleteClick = (id) =>{
     const updatedTodo = todo.filter( item => item.id !== id);
     setTodo(updatedTodo);
     localStorage.setItem("todo",JSON.stringify(updatedTodo))
  }
 const handleCheckedChange = (event,todoId) =>{
  const updatedTodo = todo.map( item => item.id === todoId ? 
({...item, isChecked: event.target.checked}) : item);
  setTodo(updatedTodo);
  localStorage.setItem("todo", JSON.stringify(updatedTodo))
 }
  return (
    <div className="App">
      <input value={inputValue} placeholder='todo' onChange={handleChange}/>
      <button onClick={handleAddClick} >Add todo</button>
      <div className='todos'>
        {
          todo.map(item =>
              <div key={item.id}> 
              <label className={item.isChecked ? 'strike' : ''}>
                <input type='checkbox'onClick={(event) => handleCheckedChange(event, item.id)} checked = {item.isChecked}/>
                {item.todo}
              </label>   
             <button onClick={() => handleDeleteClick(item.id)}> 
             <span className="material-icons-outlined"> delete</span> 
             </button> 
            </div>
          
          )
        }
      </div>
    </div>
  );
}

export default App;
