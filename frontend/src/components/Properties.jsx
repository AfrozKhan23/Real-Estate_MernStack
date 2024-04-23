import { useState, useEffect } from "react";
import pathUrl from "../utils/Path";
import axios from "axios";
import { Link } from "react-router-dom";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [propertyId, setPropertyId] = useState();

  const handlePropertyClick = (id) => {
    setPropertyId(id);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${pathUrl}api/v1/property`);
        setProperties(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.put(
          `${pathUrl}api/v1/property/${propertyId}`
        );
        setProperties(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [propertyId]);
  return (
    <div className="home-properties" id="properties">
      {properties?.map((property) => (
        <ul key={property._id} className="prop-ul">
          {property.images.length > 0 && (
            <Link key={property._id} to={`/property/${property._id}`}>
              <li>
                <img
                  height={350}
                  width={350}
                  src={`${pathUrl}${property.images[0]}`}
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
