// Import Files
import './App.css'
import { useState, useEffect } from "react";


export default function App() {

  //use states to save form input data, ID of objects
  // data is to save Todos table data
  //input is used to save input data from from
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [previousText, setPreviousText] = useState("");
  const [updateID, setUpdateID] = useState();

  // fetch data only once from the server []
  useEffect(() => {
    getTodos();
  }, []);

  //GET all todos in getTodos function from DB through api
  const getTodos = () => {
    fetch(`http://localhost:3008/todos`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }

// POST/ADD a single Todo
  const addTodo = async () => {
    const data = await fetch("http://localhost:3008/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: input
      })
    })
      .then(res => res.json())
      .then((data) => {
        // console.log(data);
        setInput("");
      })
    // Call getTodos() to get all the todos including we added the earlier 
    getTodos();
  }

  // Delete a single Todo by ID
  const deleteTodo = async (id) => {
    const data = await fetch('http://localhost:3008/todo/delete/' + id, {
      method: "DELETE"
    })
    .then(res => res.json());
    //console.log(data);
    //get updated todos after delete
    getTodos();
  }

  //update todo
  const updateData = async (id) => {
    console.log(id);
    console.log(input);
    const data = await fetch("http://localhost:3008/todo/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value"
      },
      body: JSON.stringify({
        text: previousText
      })
    })
      .then(res => res.json())
      .then((data) => {
        // console.log(data);
        //setUpdateText("");
      })
    getTodos();
  }


  return (

    <div className="App">
      <h1 className='header'>All the Todos</h1>
      <ol>
        {data.map((res) => (
          <div key={res._id} className="todo" ><span>{res.text}</span>
            <button onClick={() => deleteTodo(res._id)} className='delete'>Delete {res._id}</button>
            <button onClick={() => {
              // setPreviousText is used to store the "value" of an todo title
              setPreviousText(res.text);
              setUpdateID(res._id)
              // console.log(previousText);
              // console.log(setUpdateID);
            }} className='delete'> Update</button>
          </div>

        ))}
        {console.log(data)}
      </ol>

      {/* Add Todo */}
      <h1 className="header">Add Todo</h1>
      <label>
        Enter Todo name <br />
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </label>
      <button onClick={addTodo}>ADD Todo</button>
      {console.log(`input is ${input}`)}
      {console.log(`previous input is ${previousText}`)
}
      <h1 className="header">Update Todo</h1>
      <label>
        Update Todo name <br />
        <input
          // show previousText from form
          value={previousText}
          onChange={e => setPreviousText(e.target.value)}
        />
      </label>
      <button onClick={() => updateData(updateID)}>Update</button>
      {
        updateID
      }

    </div>
  );
}
