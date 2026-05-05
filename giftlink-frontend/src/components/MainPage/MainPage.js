import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";

function MainPage() {
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();
  const giftsRef = useRef(null);

  useEffect(() => {
    fetch(`${urlConfig.backendUrl}/api/gifts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch gifts");
        }
        return res.json();
      })
      .then((data) => setGifts(data))
      .catch((err) => {
        console.error("Error fetching gifts:", err);
        setGifts([]);
      });
  }, []);

  return (
    <div className="container mt-3">

      <div className="text-center mt-3 pt-2">
        <h1>Welcome to GiftLink</h1>
        <p>Discover and share amazing gifts</p>

        <button
          className="btn btn-primary mt-3"
          onClick={() =>
            giftsRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Get Started
        </button>
      </div>

      <h2 className="mb-3" ref={giftsRef} id="gifts-section">
        Available Gifts
      </h2>

      <div className="row">
        {gifts.length > 0 ? (
          gifts.map((gift) => (
            <div key={gift._id} className="col-md-3 mb-3">
              <div className="card h-100 shadow-sm">

                <img
                  src={gift.image}
                  className="card-img-top"
                  alt={gift.name}
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                    backgroundColor: "#fff"
                  }}
                />

                <div className="card-body">
                  <h5>{gift.name}</h5>

                  <p style={{ fontSize: "13px", color: "#666" }}>
                    {gift.description?.slice(0, 60)}...
                  </p>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      navigate(`/app/product/${gift._id}`)
                    }
                  >
                    View Details
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p>No gifts available</p>
        )}
      </div>

    </div>
  );
}

export default MainPage;