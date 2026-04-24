import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-column">
        <h3 className="footer-head">Useful Links</h3>
        <Link to="/" className="footer-link">
          Properties
        </Link>
        <button
          type="button"
          className="footer-link footer-link-btn"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          About
        </button>
        <span className="footer-link">Services</span>
        <span className="footer-link">Careers</span>
      </div>

      <div className="footer-column">
        <h3 className="footer-head">Newsletter</h3>
        <p className="footer-text">
          Get exclusive property updates and market insights.
        </p>
        <input
          className="footer-input"
          type="email"
          placeholder="Your Email Address"
        />
        <button className="footer-btn">Subscribe Now</button>
      </div>

      <div className="footer-column">
        <h3 className="footer-head">Contact Us</h3>
        <p className="footer-text">property@gmail.com</p>
        <p className="footer-text">Mumbai, Maharashtra, IN</p>
        <div className="footer-socials">
          <a href="#" aria-label="Facebook" className="footer-social-link">
            <FacebookRoundedIcon />
          </a>
          <a href="#" aria-label="Twitter" className="footer-social-link">
            <TwitterIcon />
          </a>
          <a href="#" aria-label="LinkedIn" className="footer-social-link">
            <LinkedInIcon />
          </a>
          <a href="#" aria-label="Instagram" className="footer-social-link">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
