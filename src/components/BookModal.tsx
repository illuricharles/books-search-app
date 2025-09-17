import React from 'react';
import { X, Calendar, Star, Globe, FileText, Users, BookOpen, ExternalLink } from 'lucide-react';
import type { Book } from '../types/book';

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ book, isOpen, onClose }) => {
  if (!isOpen || !book) return null;

  const getCoverUrl = (coverId: number, size: 'S' | 'M' | 'L' = 'L') => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  };

  const formatAuthors = (authors: string[]) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    return authors.join(', ');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/70 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className='m-3 flex justify-end sticky top-3 mr-4'>
          <button
            onClick={onClose}
            className=" top-4 right-4 z-10 p-2 rounded-full shadow-lg text-white bg-red-500 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 pt-0">
            {/* Book Cover */}
            <div className="md:col-span-1">
              {book.cover_i ? (
                <img
                  src={getCoverUrl(book.cover_i)}
                  alt={`${book.title} cover`}
                  className="w-full rounded-xl shadow-lg"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center">
                  <FileText className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Book Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 md:text-3xl">{book.title}</h2>
                <p className="text-lg text-gray-600 md:text-xl">by {formatAuthors(book.author_name || [])}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {book.first_publish_year && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">First Published</p>
                      <p className="text-gray-600">{book.first_publish_year}</p>
                    </div>
                  </div>
                )}
                
                {book.ratings_average && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <div>
                      <p className="font-medium text-gray-900">Rating</p>
                      <p className="text-gray-600">
                        {book.ratings_average.toFixed(1)}/5
                        {book.ratings_count && ` (${book.ratings_count.toLocaleString()})`}
                      </p>
                    </div>
                  </div>
                )}
                
                {book.number_of_pages_median && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Pages</p>
                      <p className="text-gray-600">{book.number_of_pages_median}</p>
                    </div>
                  </div>
                )}
                
                {book.language && book.language.length > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-14 h-14 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Languages</p>
                      <p className="text-gray-600">{book.language.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {book.publisher && book.publisher.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Publishers
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {book.publisher.slice(0, 10).map((publisher, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {publisher}
                      </span>
                    ))}
                    {book.publisher.length> 10 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        +{book.publisher.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {book.subject && book.subject.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 10).map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                    {book.subject.length > 10 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        +{book.subject.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {book.isbn && book.isbn.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">ISBN</h3>
                  <p className="text-gray-600 font-mono text-sm md:text-base">{book.isbn[0]}</p>
                </div>
              )}
              
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <a
                  href={`https://openlibrary.org${book.key}`}
                  target="_blank"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Open Library
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};