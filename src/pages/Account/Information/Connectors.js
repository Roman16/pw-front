import React from 'react';

const Connectors = () => {
  return (
    <div className="connectors-box">
      <div className="connectors-title">
        <h2>ProfitWhales Connectors</h2>
        <div className="sub">
          Certain Helium 10 tools require acess to third party services (such as
          Amazon Seller Central, Amazon Advertising or Facebook Marketing
          account). You can use the section below to grant or revoke access.
        </div>
      </div>
      <div className="connectors-main">
        <div className="product-title">
          <div className="title">
            Amazon MWS (Seller Central) - North America (US/CA/MX/BR)
          </div>
          <a
            className="show-link"
            href="https://www.youtube.com/watch?time_continue=2&v=SRhhgDVB0jk&feature=emb_logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Show me what to do
          </a>
        </div>
        <button className="btn-token" type="button">
          Add token
        </button>
      </div>
    </div>
  );
};

export default Connectors;
