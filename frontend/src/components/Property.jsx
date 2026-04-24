import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import pathUrl from "../utils/Path";

const Property = () => {
  const { id } = useParams();
  const [property, setProperty] = useState();
  const [selectedImage, setSelectedImage] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${pathUrl}/api/v1/property/${id}`);
        setProperty(response.data);
        setSelectedImage(response.data?.images?.[0] || "");
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [id]);

  if (!property) {
    return <div className="property-loading">Loading property details...</div>;
  }

  return (
    <section className="property-page">
      <div className="property-topbar">
        <button type="button" onClick={handleBack} className="pro-back-btn">
          {"<-"} Back to Listings
        </button>
      </div>

      <div className="property-layout">
        <div className="property-left">
          <div className="property-main-media">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={property.name}
                className="property-main-img"
              />
            ) : (
              <div className="property-media-empty">
                No preview image available
              </div>
            )}
          </div>

          {property.images?.length > 0 && (
            <div className="property-thumbnails">
              {property.images.map((image, index) => (
                <button
                  type="button"
                  key={index}
                  className={`property-thumb-btn ${selectedImage === image ? "active" : ""}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="property-thumb-img"
                  />
                </button>
              ))}
            </div>
          )}

          <article className="property-description-card">
            <h3>Property Description</h3>
            <p>
              Premium property listing with verified details and media. Contact
              the owner directly for schedule and availability.
            </p>
          </article>
        </div>

        <div className="property-right">
          <article className="property-summary-card">
            <h1>{property.name}</h1>
            <p className="property-location">{property.address}</p>
            <div className="property-contact-list">
              <p>
                <span>Phone</span>
                {property.phone}
              </p>
              <p>
                <span>Email</span>
                {property.email}
              </p>
            </div>
          </article>

          {property.videos && (
            <article className="property-video-card">
              <h3>Property Video Tour</h3>
              <video controls>
                <source src={property.videos} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default Property;
