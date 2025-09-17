import { SearchForm } from "./components/SearchForm";
import BookCard from "./components/BookCard";
import { useBooks } from "./hooks/useBooks";
import type { Book, SearchFilters } from "./types/book";
import { useState } from "react";
import { Pagination } from "./components/Pagination";
import { BookModal } from "./components/BookModal";
import Header from "./components/Header";
import Error from "./components/Error";
import SearchPlaceholder from "./components/SearchPlaceholder";
import Loading from "./components/Loading";
import SearchNotFound from "./components/SearchNotFound";
import { limit } from "./constants/limit";

export default function App() {

  const { loading, error, books, searchBooks, totalResults, currentPage } = useBooks()
  const [lastSearch, setLastSearch] = useState<SearchFilters | null>(null)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);
  // const books = mockData.docs

  const handleSearch = (filters: SearchFilters) => {
    setLastSearch(filters)
    searchBooks(filters, 1)
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book)
    setShowModal(true)
  };

  const handlePageChange = (page: number) => {
    if (lastSearch) {
      searchBooks(lastSearch, page)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:px-8 lg:py-8">

        {/* search form */}
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* error */}
        {error && <Error errorMessage={error} />}

        {/* display all the books number that found */}
        {(books.length > 0 || loading) && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Search Results
              </h2>
              {!loading && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {`${totalResults.toString()} found`}
                </span>
              )}
            </div>
          </div>
        )}

        {/* display no books found */}
        {!loading && lastSearch === null && books.length === 0 && !error && <SearchNotFound />}

        {/* No Results Found */}
        {!loading && lastSearch !== null && books.length === 0 && !error && <SearchPlaceholder />}

        {/* display loading */}
        {loading && <Loading />}

        {/* display books */}
        {!loading && books.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  isFavorite={false}
                  onToggleFavorite={() => { }}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </>
        )}

        {/* display pages */}
        {!loading && <Pagination
            currentPage={currentPage}
            totalResults={totalResults}
            resultsPerPage={limit}
            onPageChange={handlePageChange}
          />
        }
      </main>

      {/* display modal */}
      <BookModal
        book={selectedBook}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

    </div>
  )
}