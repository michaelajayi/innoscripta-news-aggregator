'use client';
import { sampleData, NEWS_API_ORG_KEY } from "@/lib/constants";
import { INewsApiArticle } from "@/lib/types/articles.interface";
import Image from "next/image";
import { useQuery } from '@tanstack/react-query'; 

const NewsAPIOrg = () => {
  // const data = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_ORG_KEY}`,
  // );
  // const articles = await data.json();
  // console.log(articles.articles);
  // 

  // const { isPending, error, data, isFetching } = useQuery({
  //   queryKey: ['news-api-org'],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_ORG_KEY}`
  //     );
  //     return await response.json();
  //   }
  // });
  
  // if (isPending) return 'Loading...';
  
  // if (error) return 'An error has occured. ' + error.message;
    
  return (
    <section className="p-5">
      <h1>NewsAPI.Org</h1>
      <div className="flex flex-col space-y-5">
        {sampleData.map((article, index: number) => (
          <div
            key={index}
            className="flex flex-col border border-gray-300 rounded-md p-5"
          >
            {/* {article.urlToImage && (
              <Image
                src={article.urlToImage}
                alt={article.title}
                width={300}
                height={200}
              />
            )} */}
            <h2>Title: {article.title}</h2>
            <p>Description: {article.description}</p>
            <p>
              <strong>
                Author: {article.author && article.author} | Date Published: {article.publishedAt}
              </strong>
            </p>
            <p>Source: {article.source.name}</p>
          </div>
        ))}
      </div>
      {/* <div>{isFetching ? 'Updating...' : ""}</div> */}
    </section>
  );
};

export default NewsAPIOrg;
