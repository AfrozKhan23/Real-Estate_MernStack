import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import pathUrl from "../utils/Path";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${pathUrl}/api/v1/property`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="home-properties" id="properties">
      <div className="properties-head">
        <h2>Featured Properties</h2>
        <p>Explore handpicked listings with complete details and media.</p>
      </div>
      <div className="properties-grid">
        {loading ? (
          <p className="properties-state">Loading properties...</p>
        ) : properties.length === 0 ? (
          <p className="properties-state">No properties available right now.</p>
        ) : (
          properties.map((property) => (
            <article key={property._id} className="prop-card">
              {property.images?.length > 0 ? (
                <Link
                  to={`/property/${property._id}`}
                >
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="prop-img"
                  />
                </Link>
              ) : (
                <div className="prop-img-fallback">No image available</div>
              )}
              <div className="prop-card-content">
                <h3 className="prop-name">{property.name}</h3>
                <p className="prop-address">{property.address}</p>
                <Link
                  to={`/property/${property._id}`}
                  className="prop-view-btn"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Properties;
