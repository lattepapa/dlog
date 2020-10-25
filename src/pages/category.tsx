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
                <Link style={categoryStyle} to={'/' + node.frontmatter.title}>
                  {node.frontmatter.category} {' _ '}
                </Link>
                <Link style={titleStyle} to={'/' + node.frontmatter.title}>
                  {node.frontmatter.title}
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
