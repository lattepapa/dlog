import { ReplaceComponentRendererArgs } from 'gatsby';

export type ITemplateProps<T> = ReplaceComponentRendererArgs['props'] & {
    pageContext: {
        isCreatedByStatefulCreatePages: boolean; // isCreatedByStatefulCreatePages 은 Gatsby 에서 자동으로 넘겨주는 항목
    } & T; // html 이나 title, category 같은 항목을 임의로 지정할 수 있도록 제너릭으로 만들어두자.
};