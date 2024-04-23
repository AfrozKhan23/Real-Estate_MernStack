import React from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-1">
        <div className="footer-head">Useful Links</div>
        <div className="footer-links">Services</div>
        <div className="footer-links">Careers</div>
        <div className="footer-links">Our Team</div>
        <div className="footer-links">Our Clients</div>
      </div>

      <div className="footer-2">
        <div className="footer-head">NEWSLETTER</div>
        <input
          className="footer-input"
          type="text"
          placeholder="Your Email Address"
        />
        <br />
        <button className="footer-btn">SUBSCRIBE NOW</button>
      </div>

      <div className="footer-3">
        <div className="footer-head">Contact Us</div>
        <div className="footeer-content">property@gmail.com </div>
        <div className="footer-content">Mumbai, Maharashtra, IN</div>
        <div className="footer-socials">
          <span>
            <FacebookRoundedIcon />
          </span>
          <span>
            <TwitterIcon />
          </span>
          <span>
            <LinkedInIcon />
          </span>
          <span>
            <InstagramIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
