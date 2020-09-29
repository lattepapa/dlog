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
          excerpt(truncate: true, pruneLength: 200)
          frontmatter {
            title
            path
            date(formatString: "YYYY-MM-DD")
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
      <h3>최근 작성한 게시글 목록</h3>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <h3>
              <Link to={node.frontmatter.title}>{node.frontmatter.title}</Link>
            </h3>
            <p>{node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
            <hr />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
