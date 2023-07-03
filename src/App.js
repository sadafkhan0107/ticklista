import './App.css';
import {v4 as uuid} from 'uuid'
import { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';

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
    <>
    <Navbar />
    <div className="App d-flex d-column gap-sm">
      <div>
          <input value={inputValue} placeholder='todo' onChange={handleChange}/>
          <button className='btn' onClick={handleAddClick} >Add todo</button>
      </div>
      <div className='todos d-flex d-column'>
        {
          todo.map(item =>
              <div className='single-todo' key={item.id}> 
                <label className={item.isChecked ? 'strike' : ''}>
                  <input type='checkbox'onClick={(event) => handleCheckedChange(event, item.id)} checked = {item.isChecked}/>
                  <span className='todo-text'>{item.todo}</span>
                </label>   
                <button className='btn' onClick={() => handleDeleteClick(item.id)}> 
                  <span className="material-icons-outlined"> delete</span> 
                </button> 
            </div> 
          )
        }
      </div>
    </div>
    <Footer />
    </>
  );
}

export default App;
