import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const headerBackgroundStyle = {
  background: `DarkSlateGray`,
  marginBottom: `0.45rem`,
  margin: `0 auto`,
  padding: `0.45rem 0.1rem`,
  height: `6rem`
}

const blogTitleStyle = {
  color: `white`,
  textDecoration: `none`,
  paddingLeft: `25%`,
  float: `left`
}

const blogCategoryStyle = {
  color: `CadetBlue`,
  textDecoration: `none`,
  paddingRight: `25%`,
  float: `right`
}

const Header = ({ siteTitle, siteCategory }) => (
  <header style={headerBackgroundStyle}>
    {/* [Header1] dlog 클릭 시 index.tsx */}
    <h4><Link to="/" style={blogTitleStyle}>{siteTitle}</Link></h4>
    {/* [Header2] category 클릭 시 category.tsx */}
    <h4><Link to="/category" style={blogCategoryStyle}>{siteCategory}</Link></h4>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteCategory: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``,
  siteCategory: ``
};

export default Header;
