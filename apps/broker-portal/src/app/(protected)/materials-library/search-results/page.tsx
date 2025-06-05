'use client'; // This page will likely use searchParams, requiring it to be a Client Component

import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category');

  // In a real app, you would fetch search results based on query/category
  // const [results, setResults] = React.useState([]);
  // React.useEffect(() => { /* fetch logic */ }, [query, category]);

  return (
    <div>
      <h2>Materials Search Results</h2>
      {query && <p>Showing results for: <strong>{query}</strong></p>}
      {category && <p>Filtered by category: <strong>{category}</strong></p>}
      {!query && !category && <p>Please enter a search term or select a category in the Materials Library.</p>}
      {/* Display search results here */}
      {/* Example: results.map(result => <div key={result.id}>{result.title}</div>) */}
    </div>
  );
}

// Wrap the component that uses useSearchParams in Suspense
export default function MaterialsSearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
} 