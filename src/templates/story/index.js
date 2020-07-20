import React from "react";
import Layout from "../../components/layout"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import DocumentBuilder from '../../components/documentBuilder';
import { DocumentContainer, TitleContainer } from './styled';

const story = ({pageContext }) => {
  const { pageContent, breadcrumb, hive } = pageContext;
  const body = JSON.parse(pageContent.body);

  return (
    <Layout hive={hive}>
    <Breadcrumb crumbs={breadcrumb.crumbs} crumbSeparator=" / " crumbLabel={pageContent.title} />
    <DocumentContainer>
      <TitleContainer>
        <h1>{pageContent.title}</h1>
      </TitleContainer>
      {body.map((element, i) =>
        <DocumentBuilder key={i} element={element} />
      )}
    </DocumentContainer>
    </Layout>
  );
}

export default story;
