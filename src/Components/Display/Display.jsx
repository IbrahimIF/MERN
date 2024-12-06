import { useState, useEffect } from 'react';
import './Display.css';

function Display({ isSent, setIsSent }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = () => {
    // Dynamic base URL for API requests
    const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://mern-topaz-xi.vercel.app'
      : 'http://localhost:5000';

    fetch(`${BASE_URL}/api/React-MongoDB`)
      .then(response => response.json())
      .then(fetchedData => {
        if (fetchedData.length === 0) {
          setErrorMessage('No data found.');
          setData([]);
        } else {
          setData(fetchedData);
          setErrorMessage('');
        }
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMessage('Error fetching data');
        setIsLoading(false);
        console.error('Fetch error:', error);
      });
  };

  useEffect(() => {
    if (isSent) {
      fetchData(); // Re-fetch data when the data is sent
      setTimeout(() => setIsSent(false), 3000); // Hide the confirmation message after 3 seconds
    }
  }, [isSent, setIsSent]);

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="displayContainer">
        <div className="loadingContainer">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
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
  );
}

export default Display;