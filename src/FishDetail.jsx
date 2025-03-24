import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FishDetail() {
  const { id } = useParams();
  const [fish, setFish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFish = async () => {
      try {
        const response = await axios.get(`https://halak.onrender.com/api/Halak/${id}`);
        setFish(response.data);
      } catch (err) {
        setError('Hiba az adatlekérés során.');
      } finally {
        setLoading(false);
      }
    };

    fetchFish();
  }, [id]);

  if (loading) {
    return <div className="container my-5 text-center"><p>Betöltés alatt...</p></div>;
  }

  if (error) {
    return <div className="container my-5 text-center"><p>{error}</p></div>;
  }

  if (!fish) {
    return <div className="container my-5 text-center"><p>Nincs adat a kiválasztott halról.</p></div>;
  }

  return (
    <div className="container my-5 d-flex flex-column align-items-center">
      <h1 className="mb-4">Hal Részletei</h1>
      <div className="card w-75">
        <div className="card-body text-center">
          <h3 className="card-title">{fish.nev}</h3>
          <p><strong>Faj:</strong> {fish.faj || 'N/A'}</p>
          <p><strong>Méret cm:</strong> {fish.meretCm || 'N/A'} cm</p>
          <p><strong>Tó ID:</strong> {fish.toId || 'N/A'}</p>
          {fish.kep ? (
            <img
              src={`data:image/jpeg;base64,${fish.kep}`}
              alt={fish.nev}
              className="card-img-top mb-4"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "300px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          ) : (
            <img
              src="https://via.placeholder.com/400"
              alt="Nincs kép"
              className="card-img-top mb-4"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "300px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FishDetail;
