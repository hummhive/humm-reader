import React from "react";

const indexTemplate = props => {
  const { pageContext } = props;
  const { pageContent } = pageContext;

  return (
    <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
      <ul>
        {pageContent.map((data, index) => {
          return <li key={`content_item_${index}`}><a href={data.slug}>{data.title}</a></li>
        })}
      </ul>
    </div>
  );
}

export default indexTemplate;