import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import "../styles/app.scss";

import Header from "../components/Header";

export default class TemplateWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleMenu = () => {
    this.state.menuOpen ? this.setState({ menuOpen: false }) : this.setState({ menuOpen: true })
  }

  render() {

    const {
      children,
      data
    } = this.props

    return (
      <div>
        <Helmet title="Home | BC–OA" />
        <Header visible={this.state.menuOpen} toggleMenu={this.toggleMenu} />
        <main>{children()}</main>
        <footer>
          <div className="container">
            <div className="f-footer-a" style={{ flex: 4 }}>
              <h2>
                Breitner<br />Ciaccia–<br />Office of<br />Architecture
              </h2>
            </div>
            <div className="f-footer-b" style={{ flex: 1, padding: "0 1rem" }}>
              <b>Contact</b>
              <address className="f-footer-b">
                {data.contactJson.address.street}
                <br />
                {data.contactJson.address.street2}
                <br />
                {data.contactJson.address.city}, {data.contactJson.address.state}{" "}
                {data.contactJson.address.zip}
                <br />
              </address>
              –
              <div>
                <a href={`mailto:${data.contactJson.email}`}>
                  {data.contactJson.email}
                </a>
              </div>
              <div>
                <a href={`tel:${data.contactJson.phone}`}>
                  {data.contactJson.phone}
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
          </div>
        </footer>
      </div>
    );
  }
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