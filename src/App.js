import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState([]);
  const [options, setOptions] = useState([]);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setFilters(value);
  };

  const handleSubmit = async () => {
    try {
      // Validate JSON
      const parsedData = JSON.parse(jsonInput);
      setError('');
      
      // Call the API
      const res = await axios.post('https://cool-8n1hy6o91-medhanarayans-projects.vercel.app', parsedData);
      setResponse(res.data);
      setOptions(['Alphabets', 'Numbers', 'Highest lowercase alphabet']);
    } catch (err) {
      setError('Invalid JSON format or API error.');
    }
  };

  const filterResponse = () => {
    if (!response) return null;
    return filters.reduce((acc, filter) => {
      if (filter === 'Alphabets') acc = [...acc, ...response.alphabets];
      if (filter === 'Numbers') acc = [...acc, ...response.numbers];
      if (filter === 'Highest lowercase alphabet') acc.push(response.highestLowercaseAlphabet);
      return acc;
    }, []);
  };

  return (
    <div>
      <h1>21BCE2071</h1> {/* Display roll number as title */}
      <textarea value={jsonInput} onChange={handleJsonInputChange} placeholder="Enter JSON here" />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {options.length > 0 && (
        <select multiple onChange={handleFilterChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      )}
      <div>
        {response && (
          <ul>
            {filterResponse().map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;

