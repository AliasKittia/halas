import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function FishListPage() {
  const [halak, setHalak] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchHalak = async () => {
      try {
        const response = await axios.get("https://halak.onrender.com/api/Halak");
        setHalak(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHalak();
  }, []);

  const handleEdit = (id) => {
    
    navigate(`/halak/edit/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/fish/${id}`);  
  };

  if (loading) {
    return <p>Betöltés alatt...</p>;
  }

  if (error) {
    return <p>Hiba: {error}</p>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Halak Lista</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {halak.map((hal) => (
          <div className="col" key={hal.id}>
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">{hal.nev}</h5>
                <p className="text-muted">
                  <strong>Faj:</strong> {hal.faj}
                </p>
                <p className="text-muted">
                  <strong>Tó:</strong> {hal.to_id}
                </p>

                {hal.kep ? (
                  <img
                    src={`data:image/jpeg;base64,${hal.kep}`} 
                    alt={hal.nev}
                    className="card-img-top"
                    style={{
                      maxHeight: "250px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/400"
                    alt="Nincs kép"
                    className="card-img-top"
                    style={{
                      maxHeight: "250px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                )}
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleDetails(hal.id)} 
                >
                  <i className="bi bi-text-paragraph"></i> Részletek
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(hal.id)} 
                >
                  <i className="bi bi-pencil-square"></i> Szerkesztés
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FishListPage;
