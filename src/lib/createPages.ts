import { CreatePagesArgs } from 'gatsby';
import path from 'path'; // 아래의 component 속성의 키값으로부터, lib/templates/PostTemplate.tsx을 통해 props의 모든 내용 출력
import { Query } from '../graphql-types'; // graphQL 함수 작성 시 자동완성
    
// const pages = [
//     { id: 1, content: 'Gatsby 로 블로그 만들기' },
//     { id: 2, content: '거기에 타입스크립트 적용 해 보기' },
//     { id: 3, content: '확실히 어렵네요' },
// ];
    
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
                title: String(node.frontmatter.title), // node.frontmatter.title,
            },
            component: path.resolve(__dirname, '../templates/PostTemplate.tsx'),
        });
    });
}