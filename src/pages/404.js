import { Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFoundPage = (props) => (
  <Layout
    {...props}
    render={() => (
      <div
        className="container
          flex-1
          flex
          flex-col
          justify-center
          marginBottom-15
          bp-1_marginBottom-24
          bp-2_marginBottom-20"
      >
        <SEO />
        <h1 className="f-headline-a marginBottom-3">PAGE NOT FOUND</h1>
        <Link to="/" className="underline">
          Return home here.
        </Link>
      </div>
    )}
  />
);

export default NotFoundPage;
