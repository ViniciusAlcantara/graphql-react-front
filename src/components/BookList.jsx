import React, { useState } from 'react'
import { useQuery } from "@apollo/client";

import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails';

const BookList = props => {
    const {loading, error, data} = useQuery(getBooksQuery); // GET the books from graphql server
    const [ selectedId, setSelectedId ] = useState('')
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;

    return (
        <div>
            <ul id="book-list">
                {data.books.map(book => (
                    <li key={book.id} onClick={() => setSelectedId(book.id)}>{book.name}</li>
                ))}
            </ul>
            {
                selectedId ? (<BookDetails book={selectedId} />) : false
            }
        </div>
    )
}

export default BookList