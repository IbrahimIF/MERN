import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');


  const fetchUsers = () => {
    fetch('http://localhost:4000/Reacr-MongoDB')
      .then(response => response.json())
      .then(data => setData(data));
  };


  const handleUserSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/Reacr-MongoDB', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, text })
    })
    .then(response => response.json())
    .then(newData => setData([...data, newData]));
  };


  return (
    <div className="App">
      <h1>Data from MongoDB:</h1>
      <button onClick={fetchUsers}>Load Users</button>
      
      <ul>
        {data.map(item => (
          <li key={item._id}>{item.name}: {item.text}</li>
        ))}
      </ul>

      <h2>Add New User</h2>
      <form onSubmit={handleUserSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;