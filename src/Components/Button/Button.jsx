import { useState } from 'react';
import './Button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload }  from '@fortawesome/free-solid-svg-icons';



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
    
    <div className="buttonContainer" onSubmit={handleSubmit}>
      <form>
        <div className="inputContainer">
          <div class="input-Animated">
            <input type="text" name="text" class="input" placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <div class="highlight"></div>
          </div>

          <div class="input-Animated">
            <input type="text" name="text" class="input" placeholder="Enter Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
            <div class="highlight"></div>
          </div>

        </div>
        <div className="submitButtonContainer">
        <button type="submit"> <FontAwesomeIcon icon={faUpload} /> &nbsp; Send </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default Button;


