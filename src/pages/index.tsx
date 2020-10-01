import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby"; // useStaticQuery 훅 설정(LatestPostListQuery 불러오기)

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const LatestPostListQuery = graphql`
  query LatestPostListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          excerpt(truncate: true, pruneLength: 130)
          frontmatter {
            title
            path
            date(formatString: "DD MMM, YYYY")
          }
          id
        }
      }
    }
  }
`;

const IndexPage: React.FC = () => {
  const data = useStaticQuery<Query>(LatestPostListQuery);

  return (
    <Layout>
      <SEO title="Home" />
      {/* <h1>최근 게시글</h1>
      <br /> */}
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <h3>
              <Link
                style={{
                  color: `DarkSlateGray`,
                  textDecoration: `none`,
                }}
                to={node.frontmatter.title}
              >
                {node.frontmatter.title}
              </Link>
            </h3>
            <p>{node.excerpt}</p>
            <p
              style={{
                color: `LightGray`,
                textDecoration: `none`,
              }}
            >
              posted on{` `}
              {node.frontmatter.date}
            </p>
            <hr />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
