import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './MedicineList.css';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get('http://localhost:5000/api/medicines')  // Backend API URL
      .then(response => {
        setMedicines(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []); // Empty array means this will run once when the component mounts

  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="medicine-list">
      <input
        type="text"
        className="search-input"
        placeholder="Search Medicine..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="cards-container">
        {filteredMedicines.map(medicine => (
          <Link to={`/medicine/${medicine.id}`} key={medicine.id} className="medicine-card">
            <div className="medicine-card-content">
              <h3>{medicine.name}</h3>
              <p>Brand: {medicine.brand}</p>
              <p>Price: ${medicine.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MedicineList;
