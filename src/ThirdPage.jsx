import React from "react";
import Barcode from "react-barcode";
import "./Third.css";

const Third = ({ fullName, email, ticketType, ticketCount, avatar }) => {
  const barcodeValue = `${fullName}-${email}-${ticketType}-${ticketCount}`;

  return (
    <div className="ticket-container">
      <h2 className="event-title">December Festival '</h2>
      <p className="event-location">📍 08 Airport Road Lugbe Abuja</p>
      <p className="event-date">📅 March 15, 2025 | 7:00 PM</p>

      <div className="avatar-container">
        <img src={avatar} alt="User Avatar" className="avatar" />
      </div>

      <div className="ticket-info">
        <div className="info-row">
          <label>Name :</label>
          <p>{fullName}</p>
        </div>

        <div className="info-row">
          <label>EMAIL : </label>
          <p>{email}</p>
        </div>

        <div className="info-row">
          <label>TICKET TYPE:</label>
          <p>{ticketType}</p>
        </div>

        <div className="info-row">
          <label>TICKET AMOUNT:</label>
          <p>{ticketCount}</p>
        </div>

        <div className="info-row special-request">
          <label>REMARK: </label>
          <p>WELCOME {fullName} LOOKING FORWARD TO SEEING YOU CHEERS!!!.</p>
        </div>
      </div>

      {/* Barcode Section */}
      <div className="barcode-section">
        <Barcode
          value={barcodeValue}
          format="CODE128"
          /* 
            width: thickness of each bar (reduce to fit).
            height: overall height of the barcode. 
            displayValue: hide or show the text under the bars. 
          */
          width={0.8}
          height={50}
          displayValue={false}
          margin={0}
        />
        <div className="barcode-numbers">
          <span>1</span>
          <span>234567</span>
          <span>891026</span>
        </div>
      </div>
    </div>
  );
};

export default Third;
