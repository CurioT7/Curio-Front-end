import React from 'react';
import "./SafetyPrivacy.css";

function SafetyPrivacy() {
  return (
    <div className="container">
      <div className="customize-privacy">
        <div className="customize-privacy-section">
        <h2 className='customize-privacy-heading'>Safety & Privacy</h2>
        <p className='customize-privacy-heading-description'>Manage how we use data to personalize your Reddit experience, and control how other
           redditors interact with you. To learn more, visit our &nbsp;
           <span>
              <a href="#">
                Privacy & Security 
                FAQs
              </a>
           </span>
        </p>
        <h3 className='headings-titles text-uppercase fw-bold mb-4'>Safety</h3>
          <div>
            <h4 className='headings-settings d-flex fw-500 mb-1'>People You’ve Blocked</h4>
            <p className="headings-description fw-normal text-muted">Blocked people can’t send you chat requests or private messages.</p>
            <div className="input-group mb-3">
              <input type="text" placeholder="Block new user" className="form-control mr-sm-2" required />
              <button className="btn btn-primary">ADD</button>
            </div>
          </div>
          <div>
            <h4 className='headings-settings d-flex fw-500 mb-1'>Communities You've Muted</h4>
            <p className="headings-description fw-normal text-muted">Posts from muted communities won't show up in your feeds or recommendations.</p>
            <div className="input-group mb-3">
              <input type="text" placeholder="Mute new community" className="form-control" required />
              <button className="btn btn-primary">ADD</button>
            </div>
          </div>
          <h3 className='headings-titles text-uppercase fw-bold mb-4'>Privacy</h3>
          <div className="privacy d-flex flex-wrap mb-3">
            <div className="search-results">
              <label htmlFor="search-results-checkbox">
                <h3 className="headings-settings d-flex fw-500 mb-1">Show up in search results</h3>
              </label>
                <p className="headings-description fw-normal text-muted">Allow search engines like Google to link to your profile in their search results.</p>
            </div>
            <div className="search-results-checkbox">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
              </div>
            </div>
          </div>
          <div className="reddit-personalization d-flex flex-wrap mb-3">
            <div className="reddit-personalization">
              <label htmlFor="reddit-personalization-checkbox">
                <h3 className="headings-settings d-flex fw-500 mb-1">Personalize ads on Reddit based on information and activity from our partners.</h3>
              </label>
                <p className="headings-description fw-normal text-muted">Allow us to use information from our partners to show you better ads on Reddit.</p>
            </div>
            <div className="reddit-personalization-checkbox">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafetyPrivacy;
