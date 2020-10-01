import React from "react";
import Layout from "../components/layout";
import { ITemplateProps } from "../interface"; // src/interface.ts 에서 props 변수에 데이터를 담는 규칙 로드
import "../../node_modules/katex/dist/katex.min.css"; // katex 수식입력 플러그인 로드

type IPostTemplateProps = ITemplateProps<{
  // src/interface.ts 연계 => html, title 내용은 문자열로 받도록 설정
  html: string;
  title: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo((props) => {
  const { title, date, html } = props.pageContext;
  return (
    <Layout>
      <h1
        style={{
          color: `DarkSlateGray`,
          textDecoration: `none`,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: `LightGray`,
          textDecoration: `none`,
        }}
      >
        posted by lattepapa
      </p>
      {/* <h4>{date}</h4> */}

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
});

PostTemplate.displayName = "PostTemplate";

export default PostTemplate;
