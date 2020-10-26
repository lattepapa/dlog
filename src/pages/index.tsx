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

const liStyle = { paddingTop: `1rem`, }
const cardStyle = { textDecoration: `none`, };
const categoryStyle = { color: `powderblue`, };
const titleStyle = { color: `DarkSlateGray`, };
const dateStyle = { color: `LightGray`, };

const IndexPage: React.FC = () => {
  const data = useStaticQuery<Query>(LatestPostListQuery);

  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id} style={liStyle}>
            <Link to={node.frontmatter.title} style={cardStyle}>
              <h4>
                <span style={categoryStyle}>{node.frontmatter.category} {'> '}</span>
                <span style={titleStyle}>{node.frontmatter.title}</span>
              </h4>

              {/* <p>{node.excerpt}</p> */}
              
              <div style={dateStyle}>posted on {` `} {node.frontmatter.date}</div>
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
