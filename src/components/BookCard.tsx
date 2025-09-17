import { useState } from 'react';
import { Calendar, Star, Globe, FileText, ExternalLink } from 'lucide-react';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book
  isFavorite: boolean
  onToggleFavorite: (bookKey: string) => void
  onViewDetails: (book: Book) => void
}

export default function BookCard({ book,onViewDetails}: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const getCoverUrl = (coverId: number, size: 'S' | 'M' | 'L' = 'M') => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  };

  const formatAuthors = (authors: string[]) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    if (authors.length === 1) return authors[0]
    if (authors.length === 2) return authors.join(' & ')
    return `${authors[0]} & ${authors.length - 1} others`
  };

  return (
    <div className=" bg-white  rounded-2xl shadow-lg border border-gray-100  hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative ">
        {book.cover_i && !imageError ? (
          <img
            src={getCoverUrl(book.cover_i)}
            alt={`${book.title} cover`}
            className="w-full h-52 md:h-60 object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <div className="text-center p-4">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium line-clamp-2">{book.title}</p>
            </div>
          </div>
        )}
        
        {(book.ebook_count_i ?? 0) > 0 && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            eBook
          </div>
        )}
      </div>
      
      <div className="p-5 pb-0">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        
        <p className="text-gray-600 mb-3 text-sm">
          by {formatAuthors(book.author_name || [])}
        </p>
        
        <div className="space-y-2 mb-4">
          {book.first_publish_year && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Published {book.first_publish_year || "N/A"}</span>
            </div>
          )}
          
          {book.ratings_average && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>
                {book.ratings_average.toFixed(1)} 
                {book.ratings_count && ` (${book.ratings_count.toLocaleString()} ratings)`}
              </span>
            </div>
          )}
          
          {book.language && book.language.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Globe className="w-4 h-4" />
              <span>{book.language.slice(0, 3).join(', ')}</span>
            </div>
          )}
        </div>
        
        {book.subject && book.subject.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {book.subject.slice(0, 3).map((subject, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {subject}
                </span>
              ))}
              {book.subject.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{book.subject.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        
      </div>
      <div className="flex gap-2  p-5 pt-0 self-end">
          <button
            onClick={() => onViewDetails(book)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm"
          >
            View Details
          </button>
          
          <a
            href={`https://openlibrary.org${book.key}`}
            target="_blank"
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <ExternalLink className="w-4 h-4 text-gray-600" />
          </a>
        </div>
    </div>
  );
};