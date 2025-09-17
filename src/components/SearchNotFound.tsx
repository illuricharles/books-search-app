import { SearchIcon } from "lucide-react";

export default function SearchNotFound() {
    return <div>
        <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to discover?</h3>
            <p className="text-gray-600 max-w-md mx-auto">
                Search through millions of books by title, author, subject, or ISBN.
                Find your next favorite read with our search tools.
            </p>
        </div>
    </div>
}