import { useState, useEffect } from 'react';
import './Display.css';

function Display() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  const fetchUsers = () => {
    fetch('http://localhost:4000/Reacr-MongoDB')
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          setErrorMessage('No users found.');
        } else {
          setData(data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMessage('Error fetching data');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <div className="displayContainer"><div className="loadingContainer"><div>Loading...</div></div></div>;
  }


  return (
    <> 
      <div className="displayContainer">
        <div className="displayArea">
        {errorMessage ? (
              <div className="error">{errorMessage}</div>
            ) : (
  
          <ul className="text">
            {data.map(item => (
              <li key={item._id}>{item.name}: {item.text}</li>
            ))}
          </ul>
            )}
        </div>
      </div>
    </>
  );
}

export default Display;