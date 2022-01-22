import React from 'react'
import { useQuery } from "@apollo/client";

import { getBookDetail } from '../queries/queries'

const BookDetails = props => {
    const {loading, error, data} = useQuery(getBookDetail, {
        variables: {id: props.book}
    }); // GET the book detail from graphql server

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;

    const { book } = data;
    const { author } = book;
    return (
        <div id='book-details'>
            <h1>{book.name}</h1>
            <p>Genre: {book.genre}</p>
            <p>Author: {author.name}</p>
            <p>Author Age: {author.age}</p>
            <p>All books by this author:</p>
            <ul className='other-books'>
                {author.books.map(book => (
                    <li key={book.id} >{book.name}</li>
                ))}
            </ul>

        </div>
    )
}

export default BookDetails;