import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import type { SearchFilters } from '../types/book';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    searchType: 'general',
    query: '',
    sortBy: 'relevance'
  });
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAdvanced(false)
    onSearch(filters)
  }

  const resetFilters = () => {
    setFilters({
      searchType: 'general',
      query: '',
      sortBy: 'relevance'
    })
    setShowAdvanced(false)
  }

  return (
    <div className="bg-white rounded-md shadow-lg border border-gray-100 p-3 sticky top-0 z-40 backdrop-blur-3xl mb-8 md:p-5 lg:p-6">
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-0">
        {/* Main Search */}
        <div className="flex  gap-x-2 md:gap-x-2.5 lg:gap-x-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                placeholder="Search for books..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                disabled={loading}
              />
            </div>
          </div>

          <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center cursor-pointer gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>

            {/*  hide submit button up to medium screen for ui*/}
            <div className="gap-2 justify-center hidden md:flex">
            <button
              type="submit"
              disabled={loading || !filters.query.trim()}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:bg-gray-500 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed md:min-w-[100px] "
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>

        {/* hide submit button in medium screen */}
        <div className="flex gap-2 justify-center md:hidden">
            <button
              type="submit"
              disabled={loading || !filters.query.trim()}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:bg-gray-500 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed w-full "
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                'Search'
              )}
            </button>
          </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="border-t border-gray-100 pt-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Advanced Search</h3>
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Reset
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Type</label>
                <select
                  value={filters.searchType}
                  onChange={(e) => setFilters({ ...filters, searchType: e.target.value as SearchFilters['searchType'] })}
                  className=" cursor-pointer w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="subject">Subject</option>
                  <option value="isbn">ISBN</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as SearchFilters['sortBy'] })}
                  className="w-full cursor-pointer p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="relevance">Relevance</option>
                  <option value="new">Newest First</option>
                  <option value="old">Oldest First</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year From</label>
                <input
                  type="number"
                  value={filters.yearFrom || ''}
                  onChange={(e) => setFilters({ ...filters, yearFrom: e.target.value ? parseInt(e.target.value) : undefined })}
                  placeholder="e.g. 1990"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year To</label>
                <input
                  type="number"
                  value={filters.yearTo || ''}
                  onChange={(e) => setFilters({ ...filters, yearTo: e.target.value ? parseInt(e.target.value) : undefined })}
                  placeholder="e.g. 2023"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};