import { SearchIcon } from "lucide-react";

export default function SearchPlaceholder() {
    return (
        <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find any books matching your search criteria. 
              Try different keywords or adjust your filters.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Start a new search
            </button>
          </div>
    )
}