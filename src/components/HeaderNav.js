import React, { Fragment } from 'react';
import Link from "gatsby-link";

export default ({ visible, toggleMenu }) => {
  return (
    <Fragment>
      <header>
        <div className="container">
          <p style={{ flex: "1" }}>
            <a href="/">Breitner Ciaccia–Office of Architecture</a>
          </p>
          <button className="header-menuButton" onClick={toggleMenu}>menu</button>
        </div>
      </header>
      {visible &&
        <nav className="menu f-navigation">
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>Featured</Link>
            </li>
            <li>
              <Link to="/work" onClick={toggleMenu}>Index</Link>
            </li>
            <li>
              <Link to="/news" onClick={toggleMenu}>News</Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu}>About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenu}>Contact</Link>
            </li>
          </ul>
        </nav>
      }
    </Fragment>
  )
}
