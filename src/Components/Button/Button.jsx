import { useState } from 'react';
import './Button.css';

function Button() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');


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
    <div className="buttonArea">

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

export default Button;


