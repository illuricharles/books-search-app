import { useState } from 'react';
import type { Book, SearchResponse, SearchFilters } from '../types/book';
import { limit } from '../constants/limit';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const searchBooks = async (filters: SearchFilters, page: number = 1) => {

    if (!filters.query.trim()) return
    setLoading(true)
    setError(null)
    setCurrentPage(page)

    try {
      const offset = (page - 1) * limit

      if(filters.yearFrom && filters.yearTo) {
        const {yearFrom, yearTo} = filters
        if(yearFrom > yearTo) {
          throw new Error("Please enter a valid year range. 'From Year' should be earlier than 'To Year'.")
        }
      }
      
      let searchParam = '';
      const filtersQuery = filters.query.trim()
      switch (filters.searchType) {
        case 'title':
          searchParam = `title:"${filtersQuery}"`
          break
        case 'author':
          searchParam = `author:"${filtersQuery}"`
          break
        case 'subject':
          searchParam = `subject:"${filtersQuery}"`
          break
        case 'isbn':
          searchParam = `isbn:"${filtersQuery}"`
          break
        default:
          searchParam = `"${filtersQuery}"`
      }

      const publishedYearParams = `+AND+first_publish_year:[${filters.yearFrom || "*"}+TO+${filters.yearTo || '*'}]`
      console.log(publishedYearParams)

      let sortParam = ''
      switch (filters.sortBy) {
        case 'new':
          sortParam = '&sort=new'
          break
        case 'old':
          sortParam = '&sort=old'
          break
        default:
          sortParam = ''
      }

      const url = `https://openlibrary.org/search.json?q=${searchParam}${publishedYearParams}${sortParam}&limit=${limit}&offset=${offset}&fields=key,title,author_name,first_publish_year,isbn,cover_i,subject,publisher,language,number_of_pages_median,ratings_average,ratings_count,ebook_count_i`;

      const response = await fetch(url)
      console.log(response)
      if (!response.ok) throw new Error('Failed to fetch books')
      
      const data: SearchResponse = await response.json()
      
      const filteredBooks = data.docs
      
      setBooks(filteredBooks)
      setTotalResults(data.numFound)

    } 
    catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setBooks([])
      setTotalResults(0)
    } 
    finally {
      setLoading(false)
    }
  };
  
  return {
    books,
    loading,
    error,
    totalResults,
    currentPage,
    searchBooks,
    setCurrentPage
  };
};