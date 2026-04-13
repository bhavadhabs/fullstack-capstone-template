import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";

function DetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const res = await fetch(
          `${urlConfig.backendUrl}/api/gifts/${productId}`
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setGift(data);
      } catch (err) {
        console.error(err);
        setGift(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGift();
  }, [productId]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleDateString("en-IN");
  };

  if (loading) return <h3>Loading gift...</h3>;
  if (!gift) return <h3>Gift not found</h3>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="card">
        <img src={gift.image} className="card-img-top" />

        <div className="card-body">
          <h2>{gift.name}</h2>

          <p><b>Category:</b> {gift.category}</p>
          <p><b>Condition:</b> {gift.condition}</p>

          {/* FIXED DATE */}
          <p><b>Date Added:</b> {formatDate(gift.date_added)}</p>

          <p><b>Age:</b> {gift.age_years}</p>
          <p><b>Description:</b> {gift.description}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;