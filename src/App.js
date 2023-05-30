import './App.css';
import {v4 as uuid} from 'uuid'
import { useState } from 'react';

//JSX is syntax extension to javascript or Javascript XML
function App() {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }
  const handleAddClick = () =>{
    setTodo([...todo, {id: uuid() , todo: inputValue, isChecked: false}])
    setInputValue("");
  }
  const handleDeleteClick = (id) =>{
     const updatedTodo = todo.filter( item => item.id !== id);
     setTodo(updatedTodo);
  }
 const handleCheckedChange = (event,todoId) =>{
  const updatedTodo = todo.map( item => item.id === todoId ? 
({...item, isChecked: event.target.checked}) : item);
  setTodo(updatedTodo);
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
                <input type='checkbox'onClick={(event) => handleCheckedChange(event, item.id)}/>
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
