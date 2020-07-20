import React from "react";
import Layout from "../../components/layout"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import { FiClock } from 'react-icons/fi';
import SEO from "../../components/seo"
import { Link } from "gatsby"

const home = ({pageContext }) => {
  const { pageContent, hive, breadcrumb } = pageContext;
  return (
    <Layout hive={hive}>
      <SEO title="Home" />
      <Breadcrumb crumbs={breadcrumb.crumbs} crumbSeparator=" / " crumbLabel="Home" />
      <div className="container content">
        {pageContent.map((data, index) => {
          return (
          <div className="post">
          <div className="post-title" key={`content_item_${index}`}>
            <Link className="navbar-brand" to={`/story/${data.slug}`}>{data.title}</Link>
          </div>
            <div className="meta d-flex pt-2">
              <div className="date"><FiClock /> July 20, 2020</div>
            </div>
          </div>
        )
        })}
      </div>
    </Layout>
  );
}

export default home;
