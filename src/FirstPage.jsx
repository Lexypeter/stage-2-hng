import React, { useState } from "react";
import "./First.css";
import Second from "./SecondPage";
import { FaMapMarkerAlt } from "react-icons/fa";

const First = () => {
  const [ticketType, setTicketType] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [step, setStep] = useState(1);

  return (
    <div className="contain">
      <div className="header">
        <div className="logo">ticz</div>
        <button className="my-tickets">MY TICKETS</button>
      </div>
      <div className="container">
        {step === 1 && (
          <div className="ticket-box">
            <div className="progress-bar">
              <span>Step 1/3</span>
              <div className="progress-line">
                <div className="progress-fill"></div>
              </div>
            </div>
            <div className="event-details">
              <h2>Techember Fest "25</h2>
              <p>
                Join us for an unforgettable experience at TechFest! Secure your
                spot now.
              </p>
              <p className="event-info">
                <FaMapMarkerAlt /> Lagos, Nigeria
              </p>
              <p>March 15, 2025 | 7:00 PM</p>
            </div>
            <div className="ticket-selection">
              <h3>Select Ticket Type:</h3>
              <div className="ticket-options">
                <button
                  className={`ticket ${
                    ticketType === "regular" ? "selected" : ""
                  }`}
                  onClick={() => setTicketType("regular")}
                >
                  <div className="ticket-price">Free</div>
                  <div className="ticket-type">Regular Access</div>
                  <div className="ticket-remaining">50/50</div>
                </button>
                <button
                  className={`ticket ${ticketType === "vip" ? "selected" : ""}`}
                  onClick={() => setTicketType("vip")}
                >
                  <div className="ticket-price">$50</div>
                  <div className="ticket-type">VIP Access</div>
                  <div className="ticket-remaining">50/50</div>
                </button>
                <button
                  className={`ticket ${
                    ticketType === "vvip" ? "selected" : ""
                  }`}
                  onClick={() => setTicketType("vvip")}
                >
                  <div className="ticket-price">$150</div>
                  <div className="ticket-type">VVIP Access</div>
                  <div className="ticket-remaining">59/59</div>
                </button>
              </div>
            </div>
            <div className="ticket-number">
              <h3>Number of Tickets</h3>
              <select
                value={ticketCount}
                onChange={(e) => setTicketCount(Number(e.target.value))}
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="button-group">
              <button className="cancel">Cancel</button>
              <button
                className={`next ${ticketType ? "active" : ""}`}
                disabled={!ticketType}
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <Second
            ticketType={ticketType}
            ticketCount={ticketCount}
            setStep={setStep}
          />
        )}
      </div>
    </div>
  );
};

export default First;
