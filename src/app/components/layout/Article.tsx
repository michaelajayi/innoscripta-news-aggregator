import {
  INewsApiArticle,
  INewsApiSearch,
} from "@/lib/types/articles.interface";
import { formatDate } from "@/lib/utils/global";
import Image from "next/image";

const Article = ({ article }: { article: INewsApiArticle }) => {
  const imageUrl = article?.urlToImage || article?.imageUrl;
  return (
    <div className="w-full max-w-4xl flex flex-col space-y-1 border border-gray-100 p-5 rounded-lg hover:bg-gray-100">
          <div className="w-full flex flex-col lg:flex-row lg:space-x-5">
            {imageUrl && (
              <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                <div className='w-full overflow-hidden rounded-md'>
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    className="w-full h-48 lg:h-64 object-cover rounded-md"
                    width={400}
                    height={300}
                    priority
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col space-y-2 w-full lg:w-1/2">
              <p className="font-medium text-2xl">{article.title}</p>
              <p className="truncate">{article.description}</p>
              <p>Published at: {formatDate(article?.publishedAt)}</p>
              <strong>Author: {article.author}</strong>
              <strong>Source: {article.source.name}</strong>
            </div>
          </div>
        </div>
  );
};

export default Article;
