import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Property = () => {
  const { id } = useParams();
  const [property, setProperty] = useState();

  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://real-state-api-y6js.onrender.com/api/v1/property/${id}`
        );
        setProperty(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-details">
      <div className="pro-header">
        <span onClick={handleBack}>Back</span>
        <h2>{property.name}</h2>
      </div>

      <div className="prop-details">
        <p>Address: {property.address}</p>
        <p>Phone: {property.phone}</p>
        <p>Email: {property.email}</p>
      </div>
      <div className="pro-grid">
        <div className="pro-images">
          {property.images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </div>
        <div className="pro-vid">
          {property.videos && (
            <video controls>
              <source src={property.videos} type="video/mp4" /> Your browser
              does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default Property;
