import { useState } from 'react';
import './Display.css';

function Display() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');


  const fetchUsers = () => {
    fetch('http://localhost:4000/Reacr-MongoDB')
      .then(response => response.json())
      .then(data => setData(data));
  };


  return (
    <> 
    <div className="displayArea">
      
      <ul className="text">
        {data.map(item => (
          <li key={item._id}>{item.name}: {item.text}</li>
        ))}
      </ul>

    </div>
    <button onClick={fetchUsers}>Load Users</button>
    
    </>
  );
}

export default Display;