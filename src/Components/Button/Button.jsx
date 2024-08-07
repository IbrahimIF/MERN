import { useState } from 'react';
import './Button.css';

function Button() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');


  const handleSubmit = (e) => {
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
    <>
    
    <div className="buttonArea" onSubmit={handleSubmit}>
      <form>







        
        <div class="input-group">
          <input required="" type="text" name="text" autocomplete="off" class="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label class="user-label">First Name</label>
        </div>

        <div class="input-group">
        <input required="" type="text" name="text" autocomplete="off" class="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label class="user-label">First Name</label>

        </div>

        <button class="animated-button" type="submit">
          <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
                </svg>
                <span class="text">Modern Button</span>
                <span class="circle"></span>
                <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
      </button>

      </form>
    </div>
    </>
  );
}

export default Button;


