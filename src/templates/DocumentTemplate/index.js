import React from "react";
import DocumentBuilder from '../../components/documentBuilder';
import { DocumentContainer, TitleContainer } from './styled';

const documentTemplate = props => {
  const { pageContext } = props;
  const { pageContent } = pageContext;
  const body = JSON.parse(pageContent.body);

  return (
    <DocumentContainer>
      <TitleContainer>
        <h1>{pageContent.title}</h1>
      </TitleContainer>
      {body.map((element, i) =>
        <DocumentBuilder key={i} element={element} />
      )}
    </DocumentContainer>
  );
}

export default documentTemplate;