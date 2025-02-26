import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  // Import Axios
import './MedicineDescription.css';

const MedicineDescription = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data for a specific medicine by ID
    axios
      .get(`http://localhost:5000/api/medicines/${id}`)  // Backend API URL with dynamic ID
      .then(response => {
        setMedicine(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching medicine details');
        setLoading(false);
      });
  }, [id]);  // The effect runs again if the ID changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!medicine) return <div>Medicine not found</div>;

  return (
    <div className="medicine-description">
      <h2>{medicine.name}</h2>
      <p><strong>Brand:</strong> {medicine.brand}</p>
      <p><strong>Uses:</strong> {medicine.uses}</p>
      <p><strong>Description:</strong> {medicine.description}</p>
      <p><strong>Side Effects:</strong> {medicine.sideEffects}</p>
      <p><strong>Expiry Date:</strong> {medicine.expiry}</p>
      <p><strong>Price:</strong> ${medicine.price}</p>
    </div>
  );
};

export default MedicineDescription;
