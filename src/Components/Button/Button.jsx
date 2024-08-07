import { useState } from 'react';
import './Button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload }  from '@fortawesome/free-solid-svg-icons';



function Button({onDataSent}) {
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
    .then(newData => { onDataSent(); });
  };


  return (
    <>
    
    <div className="buttonContainer">
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <div className="input-Animated">
            <input type="text" name="text" className="input" placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <div className="highlight"></div>
          </div>

          <div className="input-Animated">
            <input type="text" name="text" className="input" placeholder="Enter Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
            <div className="highlight"></div>
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


