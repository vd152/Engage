import React from "react";
import "./styles/Footer.css";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <Link to="/">
      <h4 className="text-white">Classroom Extended</h4>

      </Link>
      <p>Copyright &copy; {new Date().getFullYear()}</p>
      <div className="social">
        <a href="https://github.com/vd152" target="_blank">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/vidhi-angrish/" target="_blank">
          <FaLinkedin/>
        </a>
        <a href="https://www.instagram.com/_vidhiangrish_/" target="_blank">
          <FaInstagram />
        </a>
        <a href="https://vidhiangrish.com/" target="_blank">
          <FaGlobe />
        </a>
      </div>
    </footer>
  );
}
