import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/client";

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

const AddBook = props => {
    const {loading, error, data} = useQuery(getAuthorsQuery); // GET the books from graphql server
    const [name, setName ] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [mutateFunction, { dataAddBook, loadingAddBook, errorAddBook }] = useMutation(addBookMutation);

    const renderAuthors = () => {
        if (loading) return <option>Loading Authors...</option>;
        if (error) return <option>Error </option>;
        return data.authors.map(author => (
            <option value={author.id} key={author.id}>{author.name}</option>
        ))
    }

    const addBook = (e) => {
        e.preventDefault()
        console.log(name, genre, authorId)
        mutateFunction({ variables: {name, genre, authorId}, refetchQueries: [{ query: getBooksQuery}]})

        console.log('Success', dataAddBook)
    }

    return (
        <form className="" id="add-book" onSubmit={(e) => addBook(e)}>
            <div className="field">
                <label>Book Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Book Genre:</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Book Author:</label>
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} >
                    <option value="">Select author</option>
                    {
                        renderAuthors()
                    }
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default AddBook;