import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + Netlify CMS" />
    <header style={{ background: "lightgrey", display: "flex" }}>
      <p style={{ flex: "1" }}>Breitner Ciaccia–Office of Architecture</p>
      <nav style={{ paddingRight: "2rem" }}>
        <ul>
          <li>
            <Link to="/work">Work</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
    <div>{children()}</div>
    <footer style={{ background: "grey" }}>This is the footer</footer>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
