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

        <div className="row feature-row p-md-4 p-1 align-items-center justify-content-center">
          <div className="col-12 text-center my-3">
            <h1>Features</h1>
          </div>
          <div className="col-md-6 text-left p-md-5 p-2">
            <h6>Engage with Peers</h6>
            <p > A classroom community for meaningful interactions. <br/>It provides a space for students and teachers to engage in discussions of course materials, assignments, general knowledge and a lot more.</p>
          </div>
          <div className="col-md-4 text-start img-container">
            <img src={Work} />
          </div>
        </div>
        <div className="row feature-row p-md-4 p-1 align-items-center justify-content-center">
          <div className="col-md-4 text-end img-container">
            <img src={Schedule} />
          </div>
          <div className="col-md-6 text-end p-md-5 p-2">
            <h6>Schedule Group Classes</h6>
            <p>Schedule classes in online or offline mode. <br/> Choose your mode of class according to your comfort. Offline classes seats fullfillment till 50% of group strength to follow COVID guidelines.</p>

          </div>
        </div>
        <div className="row feature-row p-md-4 p-1 align-items-center justify-content-center">
          <div className="col-md-6 text-left p-md-5 p-2">
            <h6>Separate Groups for Classes</h6>
            <p>Join multiple groups and book a seat for the scheduled classes within the groups. <br/> Also find specific topics related to the groups inside the Forum.</p>
          </div>
          <div className="col-md-4 text-start img-container">
            <img src={Offline} />
          </div>
        </div>
        <div className="row feature-row p-md-4 p-1 align-items-center justify-content-center">
          <div className="col-md-4 text-end img-container">
            <img src={Vaccine} />
          </div>
          <div className="col-md-6 text-end p-md-5 p-2">
            <h6>COVID-19 vaccine verification</h6>
            <p>Verify your vaccination certificate (only for India) and participate in the offline classes. <br/>Limited offline seats available,<br/> get vaccinated!</p>
          </div>
        </div>
        <div className="row feature-row p-md-4 p-1 align-items-center justify-content-center">
          <div className="col-md-6 text-left p-md-5 p-2">
            <h6>Admin Panel for management</h6>
            <p>Manage users, roles, forum categories and topics through our admin panel. <br/> Also restrict users from forum participation, group creation, and a lot more things to grant access to only those users who require it. </p>
          </div>
          <div className="col-md-4 text-start img-container">
            <img src={Security} />
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
}
export default Home;
