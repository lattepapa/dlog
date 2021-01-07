import React from "react";

const linkStyle = {
  color: `Coral`,
  textDecoration: `none`,
};

const Footer = () => (
  <footer
    style={{ marginTop: `5rem`, marginBottom: `5rem`, textAlign: `center` }}
  >
    <span role="img">&#128293;&#128293;&#128293;</span>
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
