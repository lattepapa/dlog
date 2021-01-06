import { CreatePagesArgs } from 'gatsby';
import path from 'path'; // 아래의 component 속성의 키값으로부터, lib/templates/PostTemplate.tsx을 통해 props의 모든 내용 출력
import { Query } from '../graphql-types'; // graphQL 함수 작성 시 자동완성
    
export async function createPages({ actions, graphql }: CreatePagesArgs) {
    const { createPage } = actions;

    const { data, errors } = await graphql<Query>(`
            {
                allMarkdownRemark {
                    edges {
                        node {
                            html
                            frontmatter {
                                title
                                category
                                date(formatString: "DD MMM, YYYY")
                            }
                        }
                    }
                }
            }
        `);

    if (errors) {
        throw errors;
    }

    data.allMarkdownRemark.edges.forEach(({ node }) => { // { node } : any 로 박혔던 기존 설정 해제
        createPage({
            path: node.frontmatter.title,
            context: {
                html: node.html,
                title: String(node.frontmatter.title),
                category: String(node.frontmatter.category),
                date: String(node.frontmatter.date),
            },
            component: path.resolve(__dirname, '../templates/PostTemplate.tsx'),
        });
    });
}