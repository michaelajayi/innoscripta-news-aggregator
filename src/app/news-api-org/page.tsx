"use client";
import ArticleSources from "../components/layout/ArticleSources";
import SearchArticle from "../components/layout/SearchArticles";
import Sidebar from "../components/ui/Sidebar";

// const newsService = new NewsApiService(
//   process.env.NEXT_PUBLIC_NEWS_API_ORG_KEY!,
// );

const NewsAPIOrg = () => {
  return (
    <section className="h-screen flex">
      <div className="w-full lg:w-1/4 fixed left-0 top-0 h-full z-10">
        <Sidebar />
      </div>
      <div className="w-full lg-3/4 lg:ml-[25%] h-screen overflow-y-auto">
        <SearchArticle />
      </div>
    </section>
  );
};

export default NewsAPIOrg;
