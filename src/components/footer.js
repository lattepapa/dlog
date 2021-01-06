import React from "react";

const linkStyle = {
  color: `Coral`,
  textDecoration: `none`,
};

const Footer = () => (
  <footer
    style={{ marginTop: `5rem`, marginBottom: `5rem`, textAlign: `center` }}
  >
    <p style={{ color: `LightGray` }}>- &#128293; -</p>
    <div>
      © {new Date().getFullYear()}, Built with {` `}
      <a
        style={linkStyle}
        href="https://www.gatsbyjs.com"
        target="_blank"
        rel="noreferrer"
      >
        Gatsby
      </a>
      , {` `} Posted by {` `}
      <a
        style={linkStyle}
        href="https://github.com/lattepapa"
        target="_blank"
        rel="noreferrer"
      >
        lattepapa
      </a>
    </div>
    <br />
  </footer>
);

export default Footer;
