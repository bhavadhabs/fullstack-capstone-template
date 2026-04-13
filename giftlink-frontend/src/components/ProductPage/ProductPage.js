import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";

const ProductPage = () => {
  const { id } = useParams(); // URL: /app/product/:id
  const [gift, setGift] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const res = await fetch(`${urlConfig.backendUrl}/api/gifts/${id}`);

        if (!res.ok) {
          throw new Error("Gift not found");
        }

        const data = await res.json();

        // ✅ Handle both response types
        const giftData = data.gift || data;

        setGift(giftData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchGift();
  }, [id]);

  // ✅ loading state
  if (!gift && !error) {
    return <p className="text-center mt-5">Loading gift...</p>;
  }

  // ❌ error state
  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Go Back
        </button>
      </div>
    );
  }

  // ✅ safe date formatter
  const formatDate = (value) => {
    if (!value) return "N/A";

    let date;

    // 🔥 handle both timestamp (seconds) and ISO string
    if (typeof value === "number") {
      date = new Date(value * 1000);
    } else {
      date = new Date(value);
    }

    if (isNaN(date)) return "Invalid Date";

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container mt-4">
      {/* 🔙 Back Button */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      <div className="card">
        {/* 🖼 Image */}
        {gift?.image ? (
          <img
            src={gift.image}
            alt={gift.name}
            className="card-img-top"
          />
        ) : (
          <div className="text-center p-5">No Image Available</div>
        )}

        {/* 📦 Details */}
        <div className="card-body">
          <h2 className="card-title">{gift?.name || "No Name"}</h2>

          <p>
            <strong>Category:</strong> {gift?.category || "N/A"}
          </p>

          <p>
            <strong>Condition:</strong> {gift?.condition || "N/A"}
          </p>

          <p>
            <strong>Date Added:</strong> {formatDate(gift?.date_added)}
          </p>

          <p>
            <strong>Age:</strong>{" "}
            {gift?.age_years
              ? `${gift.age_years.toFixed(1)} years`
              : "N/A"}
          </p>

          <p>
            <strong>Description:</strong> {gift?.description || "No description"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;