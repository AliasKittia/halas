import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FishEdit = () => {
  const { id } = useParams();
  const [hal, setHal] = useState({
    nev: '',
    faj: '',
    meret_cm: '',
    to_id: '',
    kep: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHal = async () => {
      try {
        const response = await axios.get(`https://halak.onrender.com/api/Halak/${id}`);
        setHal(response.data);
      } catch (err) {
        setError('Hiba az adatlekérés során.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHal((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedHal = {
      id: id, 
      nev: hal.nev,
      faj: hal.faj,
      meret_cm: hal.meret_cm ? parseFloat(hal.meret_cm) : null,
      to_id: hal.to_id ? parseInt(hal.to_id) : null,
      kep: hal.kep || ''
  };

    console.log('Sending data:', updatedHal); // Log the data being sent

    try {
      // Frissítjük az adatokat
      const response = await axios.put(`https://halak.onrender.com/api/Halak/${id}`, updatedHal);
      console.log('Response:', response); // Log the response
      navigate(`/halak/${id}`);
    } catch (err) {
      setError('Hiba az adatfrissítés során.');
      console.error(err); // Log the error for debugging
      if (err.response) {
        console.error('Response data:', err.response.data); // Log the response data
      }
    }
  };

  if (loading) {
    return <div className="container my-5 text-center"><p>Betöltés alatt...</p></div>;
  }

  if (error) {
    return <div className="container my-5 text-center"><p>{error}</p></div>;
  }

  return (
    <div className="container my-5 d-flex flex-column align-items-center">
      <h1 className="mb-4">Hal Módosítása</h1>
      <div className="card w-75">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nev" className="form-label">Hal neve</label>
              <input
                type="text"
                className="form-control"
                id="nev"
                name="nev"
                value={hal.nev || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="faj" className="form-label">Faj</label>
              <input
                type="text"
                className="form-control"
                id="faj"
                name="faj"
                value={hal.faj || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="meret_cm" className="form-label">Méret (cm)</label>
              <input
                type="number"
                className="form-control"
                id="meret_cm"
                name="meret_cm"
                value={hal.meret_cm || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="to_id" className="form-label">Tó ID</label>
              <input
                type="number"
                className="form-control"
                id="to_id"
                name="to_id"
                value={hal.to_id || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="kep" className="form-label">Hal kép URL</label>
              <input
                type="text"
                className="form-control"
                id="kep"
                name="kep"
                value={hal.kep || ''}
                onChange={handleChange}
                placeholder="Pl. https://example.com/image.jpg"
              />
            </div>
            <button type="submit" className="btn btn-primary">Módosítás</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FishEdit;
