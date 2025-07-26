import { NEWS_API_ORG_KEY } from "@/lib/constants";
import { INewsApiArticle } from "@/lib/types/articles.interface";
import Image from "next/image";

const NewsAPIOrg = async () => {
  const data = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_ORG_KEY}`,
  );
  const articles = await data.json();
  console.log(articles.articles);
  return (
    <section className="p-5">
      <h1>NewsAPI.Org</h1>
      <div className="flex flex-col space-y-5">
        {articles.articles.map((article: INewsApiArticle, index: number) => (
          <div
            key={index}
            className="flex flex-col border border-gray-300 rounded-md p-5"
          >
            {article.urlToImage && (
              <Image
                src={article.urlToImage}
                alt={article.title}
                width={300}
                height={200}
              />
            )}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p>
              <strong>
                {article.author && article.author} | {article.publishedAt}
              </strong>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsAPIOrg;
