import React from 'react'
import '../styles/search.css'

const Search = () => {
  return (
    <div className='search-bar'>
        <input type="text" name="search" placeholder="Search products..." />
    </div>
  )
}

export default Search