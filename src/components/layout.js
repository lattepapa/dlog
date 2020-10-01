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
import "./layout.css";

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

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          color: `DarkSlateGray`,
          textDecoration: `none`,
          margin: `0 auto`,
          maxWidth: 800,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main
          style={{
            color: `Black`,
            textDecoration: `none`,
          }}
        >
          {children}
        </main>
        <footer
          style={{
            marginTop: `15rem`,
          }}
        >
          <hr />
          <div
            style={{
              color: `LightGray`,
              textDecoration: `bold`,
            }}
          >
            Спасибо. Хорошего дня!
          </div>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a
            style={{
              color: `Coral`,
              textDecoration: `none`,
            }}
            href="https://www.gatsbyjs.com"
          >
            Gatsby
          </a>
          ,{` `} Posted by
          {` `}
          <a
            style={{
              color: `Coral`,
              textDecoration: `none`,
            }}
            href="https://github.com/lattepapa"
          >
            lattepapa
          </a>
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
