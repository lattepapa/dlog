import React from "react";
import Layout from "../components/layout";
import { ITemplateProps } from "../interface"; // src/interface.ts 에서 props 변수에 데이터를 담는 규칙 로드
import "../../node_modules/katex/dist/katex.min.css"; // katex 수식입력 플러그인 로드

type IPostTemplateProps = ITemplateProps<{
  // src/interface.ts 연계 => html, title, category 내용은 문자열로 받도록 설정
  html: string;
  title: string;
  category: string;
  date: string;
}>;

const postTitleStyle = {
  color: `DarkSlateGray`,
  textDecoration: `none`,
  textAlign: `center`,
  marginTop: `1rem`,
};

const postCategoryStyle = {
  color: `LightCoral`,
  textDecoration: `none`,
  textAlign: `center`,
  marginBottom: `2rem`
};

const PostTemplate: React.FC<IPostTemplateProps> = React.memo((props) => {
  const { title, category, date, html } = props.pageContext;
  return (
    <Layout>
      <div style={postTitleStyle}><h1>{title}</h1></div>
      <div style={postCategoryStyle}><p>{category} &#11088; {date}</p></div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
});

PostTemplate.displayName = "PostTemplate";

export default PostTemplate;
