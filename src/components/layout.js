/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import "./layout.css";

const frameStyle = {
  color: `DarkSlateGray`,
  textDecoration: `none`,
  margin: `0 auto`,
  maxWidth: 800,
  padding: `0 1.0875rem 1.45rem`,
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  // header.js로 넘겨줄 props는 siteTitle과 siteCategory이다.
  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} siteCategory={`Category`} />
      <div style={frameStyle}>
        <main >{children}</main>        
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
