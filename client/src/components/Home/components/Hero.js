import React from "react";
import Navbar from './Navbar.js';
import "./styles/Hero.css";
import header from "../images/books.png";

export default function Hero() {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${header})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <Navbar />
      <div className="intro">
        <h1 className="title">Welcome</h1>
      </div>
    </div>
  );
}
