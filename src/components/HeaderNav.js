import React from 'react'
import Link from "gatsby-link"

export default ({ visible, toggleMenu }) => {
  return (
    <header>
      <div className="container">
        <p style={{ flex: "1" }}>
          <a href="/">Breitner Ciaccia–Office of Architecture</a>
        </p>
        <button className="header-menuButton" onClick={toggleMenu}>menu</button>
        {visible &&
          <nav className="f-navigation">
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
        }
      </div>
    </header>
  )
}
