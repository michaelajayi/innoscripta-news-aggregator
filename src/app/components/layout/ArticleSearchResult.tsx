import { INewsApiSearch } from "@/lib/types/articles.interface";
import { formatDate } from "@/lib/utils/global";

const ArticleSearchResult = ({ article }: { article: INewsApiSearch }) => {
  return (
    <div className="w-full max-w-4xl flex flex-col space-y-1">
      <p>{article.title}</p>
      <p>{article.description}</p>
      <strong>Author: {article.author}</strong>
      <strong>
        <p>Published at: {formatDate(article.publishedAt)}</p>
      </strong>
    </div>
  );
};

export default ArticleSearchResult;
