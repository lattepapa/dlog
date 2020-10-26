import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const CategoryListQuery = graphql`
  query CategoryListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___category, frontmatter___date] }) {
      edges {
        node {
          excerpt(truncate: false, pruneLength: 200)
          frontmatter {
            title
            path
            date(formatString: "DD MMM, YYYY")
            category
          }
          id
        }
      }
    }
  }
`;

const cardStyle = { textDecoration: `none`};
const categoryStyle = {
  color: `Black`, 
  textDecoration: `none`, 
  fontSize: `15pt`
};
const titleStyle = {
  color: `LightGray`, 
  textDecoration: `none`
};

const CategoryPage: React.FC = () => {
  const data = useStaticQuery<Query>(CategoryListQuery);

  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <span>
              <h4>
                <Link to={'/' + node.frontmatter.title} style={cardStyle}>
                  <span style={categoryStyle}>{node.frontmatter.category} {' _ '}</span>
                  <span style={titleStyle} >{node.frontmatter.title}</span>
                </Link>
              </h4>
            </span>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default CategoryPage;
