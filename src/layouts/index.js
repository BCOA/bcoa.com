import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import "../styles/app.scss";

const TemplateWrapper = ({ children, data }) => {
  console.log(data);
  return (
    <div>
      <Helmet title="Home | BC–OA" />
      <header className="header">
        <p style={{ flex: "1" }}>
          <a href="/">Breitner Ciaccia–Office of Architecture</a>
        </p>
        <nav> {/* className="f-navigation" */}
          <ul>
            <li>
              <Link to="/">Featured</Link>
            </li>
            <li>
              <Link to="/work">Index</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children()}</main>
      <footer>
        <div className="f-footer-a" style={{ flex: 4 }}>
          <h2>
            Breitner<br />Ciaccia–<br />Office of<br />Architecture
          </h2>
        </div>
        <div className="f-footer-b" style={{ flex: 1, padding: "0 1rem" }}>
          <b>Contact</b>
          <address className="f-footer-b">
            { data.contactJson.address.street }
            <br />
            { data.contactJson.address.street2 }
            <br />
            { data.contactJson.address.city }, { data.contactJson.address.state }{" "}
            { data.contactJson.address.zip }
            <br />
          </address>
          –
          <div>
            <a href={`mailto:${ data.contactJson.email }`}>
              { data.contactJson.email }
            </a>
          </div>
          <div>
            <a href={`tel:${ data.contactJson.phone }`}>
              { data.contactJson.phone }
            </a>
          </div>
        </div>
        <div className="f-footer-b" style={{ flex: 1, padding: "0 1rem" }}>
          <b>Social</b>
          <div>
            <a href={`http://instagram.com/${data.contactJson.instagram}`}>
              Instagram
            </a>
          </div>
          <div>
            <a href={`http://facebook.com/${data.contactJson.facebook}`}>
              Facebook
            </a>
          </div>
          <p>@ BC–OA {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export const query = graphql`
  query DefaultLayout {
    contactJson {
      address {
        street
        street2
        city
        state
        zip
      }
      phone
      email
      instagram
      facebook
    }
  }
`;

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

//finish font styles
//bring content to project page
