import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import pathUrl from "../utils/Path";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [propertyId, setPropertyId] = useState();

  const handlePropertyClick = (id) => {
    setPropertyId(id);
  };

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
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const updateProperty = async () => {
      if (!propertyId) return;

      try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
          `${pathUrl}/api/v1/property/${propertyId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProperties((prevProperties) =>
          prevProperties.map((prop) =>
            prop._id === propertyId ? response.data : prop
          )
        );
      } catch (error) {
        console.error("Error updating property:", error.message);
      }
    };

    updateProperty();
  }, [propertyId]);

  return (
    <div className="home-properties" id="properties">
      {properties?.map((property) => (
        <ul key={property._id} className="prop-ul">
          {property.images.length > 0 && (
            <Link to={`/property/${property._id}`}>
              <li>
                <img
                  height={350}
                  width={350}
                  src={property.images[0]}
                  alt="Property"
                  className="prop-img"
                  onClick={() => handlePropertyClick(property._id)}
                />
              </li>
            </Link>
          )}
          <p className="prop-name">{property.name}</p>
          <p className="prop-address">{property.address}</p>
        </ul>
      ))}
    </div>
  );
};

export default Properties;
