import { INewsApiArticle, INewsApiSearch } from "@/lib/types/articles.interface";
import { formatDate } from "@/lib/utils/global";

const Article = ({ article }: { article: INewsApiArticle }) => {
  return (
    <div className="w-full max-w-4xl flex flex-col space-y-1 border border-gray-100 p-5 rounded-lg hover:bg-gray-100">
      <p>{article.title}</p>
      <p>{article.description}</p>
      <strong>Author: {article.author}</strong>
      {/* <strong>
        <p>Published at: {formatDate(article.publishedAt)}</p>
      </strong> */}
      <strong>Source: {article.source.name}</strong>
    </div>
  );
};

export default Article;