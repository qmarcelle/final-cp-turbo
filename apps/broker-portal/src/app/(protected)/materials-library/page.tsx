import Link from 'next/link'

export default function MaterialsLibraryPage() {
  return (
    <div>
      <h1>Materials Library</h1>
      <nav aria-labelledby="materials-library-navigation">
        <h2 id="materials-library-navigation">Available Materials</h2>
        <ul>
          {/* The image suggests search results are a key part of this section. 
              Actual search parameters would be handled by the search page itself. */}
          <li>
            <Link href="/materials-library/search-results">
              Search Materials
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
