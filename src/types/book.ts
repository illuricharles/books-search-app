export interface Book {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
  isbn?: string[]
  cover_i?: number
  subject?: string[]
  publisher?: string[]
  language?: string[]
  number_of_pages_median?: number
  ratings_average?: number
  ratings_count?: number
  ebook_count_i?: number
}

export interface SearchResponse {
  docs: Book[]
  numFound: number
  start: number
  q: string
}

export interface SearchFilters {
  searchType: 'title' | 'author' | 'subject' | 'isbn' | 'general'
  query: string
  sortBy: 'relevance' | 'new' | 'old'
  yearFrom?: number
  yearTo?: number
}