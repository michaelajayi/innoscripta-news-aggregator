"use client";
import ArticleSources from "../components/layout/ArticleSources";
import SearchArticle from "../components/layout/SearchArticles";

// const newsService = new NewsAPIOrgService(
//   process.env.NEXT_PUBLIC_NEWS_API_ORG_KEY!,
// );

const NewsAPIOrg = () => {
  return (
    <section className="p-5">
      <h1>NewsAPI.Org</h1>
      <SearchArticle />
      {/* <ArticleSources /> */}
    </section>
  );
};

export default NewsAPIOrg;
