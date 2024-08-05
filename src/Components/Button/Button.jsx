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
      </form>

      <form>

        <div class="input-group">

        <input required="" type="text" name="text" autocomplete="off" class="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label class="user-label">First Name</label>
        <button type="submit">Add User</button>

        </div>

        <div class="relative">
  <input class="input-cal input-base" id="input" placeholder="" type="text"/>
  <label id="label-input">Name</label>
</div>
      </form>
    </div>
    </>
  );
}

export default Button;


