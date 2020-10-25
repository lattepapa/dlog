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

const categoryStyle = {
  color: `powderblue`, 
  textDecoration: `none`, 
  fontSize: `15pt`
};

const titleStyle = {
  color: `DarkSlateGray`, 
  textDecoration: `none`
};

const dateStyle = {
  color: `LightGray`,
  textDecoration: `none`
};

const IndexPage: React.FC = () => {
  const data = useStaticQuery<Query>(LatestPostListQuery);

  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <span>
              <h3>
                <Link style={categoryStyle} to={node.frontmatter.title}>
                  {node.frontmatter.category} {'> '}
                </Link>
                <Link style={titleStyle} to={node.frontmatter.title}>
                  {node.frontmatter.title}
                </Link>
              </h3>
            </span>
            
            {/* <p>{node.excerpt}</p> */}
            
            <Link style={dateStyle} to={node.frontmatter.title}>
              posted on {` `} {node.frontmatter.date}
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
