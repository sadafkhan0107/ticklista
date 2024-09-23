import './App.css';
import {v4 as uuid} from 'uuid'
import { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { GrowthBook } from "@growthbook/growthbook-react";
import { useEffect } from "react";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { Button } from "./components/Button";


const growthbook = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: "sdk-ccGUnBPVkhvVmK6",
  enableDevMode: true,
  trackingCallback: (experiment, result) => {
      // TODO: Use your real analytics tracking system
      console.log("Viewed Experiment", {
          experimentId: experiment.key,
          variationId: result.key
      });
  }
});

//JSX is syntax extension to javascript or Javascript XML
function App() {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("todo")) || []);
  useEffect(() => {
    // Load features asynchronously when the app renders
    growthbook.init({ streaming: true });
}, []);

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
     <GrowthBookProvider growthbook={growthbook}>
          <Navbar />
    <div className="App d-flex d-column gap-sm">
      <div className='todo-app'>
        <div className='d-flex gap-sm'>
            <input className =  'input' value={inputValue} placeholder='Add your wishlist here...' onChange={handleChange}/>
            <button className='btn add-btn' onClick={handleAddClick} >Add</button>
            <Button />
        </div>
        <div className='todos d-flex d-column gap-sm'>
          {
            todo.map(item =>
                <div className='single-todo d-flex' key={item.id}> 
                 <div>
                    <input id='todo-label' className= 'checkbox' type='checkbox'onClick={(event) => handleCheckedChange(event, item.id)} checked = {item.isChecked}/>
                    <label for="todo-label" className= {`${item.isChecked ? 'strike' : ''} todo-text`} >
                      {item.todo}
                    </label>  
                  </div> 
                  <button className='btn del-btn' onClick={() => handleDeleteClick(item.id)}> 
                    <span className="material-icons-outlined del-span"> delete</span> 
                  </button> 
              </div> 
            )
          }
        </div>
      </div>
    </div>
    <Footer />
      </GrowthBookProvider>
  
 
  );
}

export default App;
