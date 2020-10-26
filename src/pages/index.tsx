import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby"; // useStaticQuery 훅 설정(LatestPostListQuery 불러오기)

import Layout from "../components/layout";
// import Image from "../components/image";
import SEO from "../components/seo";

const LatestPostListQuery = graphql`
  query LatestPostListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          excerpt(truncate: false, pruneLength: 180)
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

const cardStyle = {
  textDecoration: `none`,
};
const categoryStyle = {
  color: `powderblue`,
  float: `left`,
  width: `20%`
};
const titleStyle = {
  color: `DarkSlateGray`,
  float: `Left`,
  paddingLeft: `2%`,
  width: `80%`
};
const dateStyle = {
  color: `LightGray`,
  paddingTop: `4rem`,
  marginBottom: `-1rem`,
};

const IndexPage: React.FC = () => {
  const data = useStaticQuery<Query>(LatestPostListQuery);

  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.frontmatter.title} style={cardStyle}>
              <div>
                <h4 style={categoryStyle}>
                  {node.frontmatter.category} {'> '}
                </h4>
                <h4 style={titleStyle}>
                  {node.frontmatter.title}
                </h4>
              </div>

              {/* <p>{node.excerpt}</p> */}
              
              <div style={dateStyle}>
                posted on {` `} {node.frontmatter.date}
              </div>
            </Link>
            <br />
            <br />
            <hr />
          </li>
          
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
