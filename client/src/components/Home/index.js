import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer.js";
import Hero from "./components/Hero.js";
import Work from "./images/work.svg";
import Schedule from "./images/schedule.svg";
import Security from "./images/security.svg";
import Offline from "./images/offline.svg";
import Vaccine from "./images/vaccine.svg";
class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <Hero />

        <div className="row feature-row p-md-4 p-1 align-items-center justify-content-between">
          <div className="col-12 text-center my-3">
            <h1>Features</h1>
          </div>
          <div className="col-md-6 text-center">
            <h6>Engage with peers</h6>
            <p> lorem Ipsum loren ipssum lore</p>
          </div>
          <div className="col-md-6 text-start">
            <img src={Work} />
          </div>
        </div>
        <div className="row feature-row p-md-4 p-1 align-items-center justify-content-between">
          <div className="col-md-6 text-end">
            <img src={Schedule} />
          </div>
          <div className="col-md-6 text-center">
            <h6>Schedule group classes</h6>
            <p> lorem Ipsum loren ipssum lore</p>
          </div>
        </div>
        <div className="row feature-row p-md-4 p-1 align-items-center justify-content-between">
          <div className="col-md-6 text-center">
            <h6>class selection</h6>
            <p> lorem Ipsum loren ipssum lore</p>
          </div>
          <div className="col-md-6 text-start">
            <img src={Offline} />
          </div>
        </div>
        <div className="row feature-row p-md-4 p-1 align-items-center justify-content-between">
          <div className="col-md-6 text-end">
            <img src={Security} />
          </div>
          <div className="col-md-6 text-center">
            <h6>Admin</h6>
            <p> lorem Ipsum loren ipssum lore</p>
          </div>
        </div>
        <div className="row feature-row p-md-4 p-1 align-items-center justify-content-between">
          <div className="col-md-6 text-center">
            <h6>Vaccien</h6>
            <p> lorem Ipsum loren ipssum lore</p>
          </div>
          <div className="col-md-6 text-start">
            <img src={Vaccine} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Home;
