import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import Bookseach from '../booksearch/Bookseach';

export default function BooksList() {
    const [books, setBooks] = useState([])
    const [reBooks, setReBooks] = useState(books)
    const [typebooks, setTypeBooks] = useState([])
    useEffect(() =>{
        axios.get('http://localhost:3301/typebooks')
       .then(res => {
        console.log(res.data);
        setTypeBooks(res.data)
       })
    },[]);
    useEffect(() =>{
        axios.get(`http://localhost:3301/books?_expand=typebook&_sort=quantity&_order=desc`)
        .then(res => {
           setBooks(res.data)
           setReBooks(res.data)
        })
    },[])

    const formSearch = useFormik({
        initialValues: {
            typebookId: "1"
        },
        onSubmit: (values) => {
           let listSearch = []
           for(let i=0; i<books.length; i++){
            if(books[i].typebookId == values.typebookId){
              listSearch.push(books[i])
            }
           }
           setReBooks(listSearch)
        }
    })

    const handleSearch = (keyword) => {
      let usersF = [];
      for (let i = 0; i < books.length; i++) {
          if (books[i].name.toLowerCase().includes(keyword.toLowerCase())) {
              usersF.push(books[i]);
          }
      }
        setReBooks(usersF)
    }
  return (
    <>
    <div>
      <Bookseach search={handleSearch}/>
    </div>
    <div>
      <form onSubmit={formSearch.handleSubmit}>
      <div>
        <label className="form-label">Book's Type</label>
        <select class="form-select" name='typebookId' onChange={formSearch.handleChange} aria-label="Default select example">
            {typebooks.map((type) => (
                <option value={type.id} >{type.name_type}</option>
            ))}
        </select>
        </div>
        <button type="submit" class="btn btn-primary">Search</button>
        <Link to={"/"}>
        <button type="button" class="btn btn-pro">Cacle</button>
        </Link>
      </form>
    </div>
    <Link to={`/books/create`}>
        <button type="button" class="btn btn-primary">Add New Book</button>
    </Link>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Code Book</th>
      <th scope="col">Book's Name</th>
      <th scope="col">Book's Type</th>
      <th scope="col">Date</th>
      <th scope="col">Quantity</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {reBooks.map((or, index) => (
      <tr key={index}>
        <td>{index +1}</td>
        <td>{or.code}</td>
        <td>{or.name}</td>
        <td>{or.typebook.name_type}</td>
        <td>{new Date(or.date).toLocaleDateString('en-GB')}</td>
        <td>{or.quantity}</td>
        <td>
          <Link to={`/books/${or.id}/edit`}>
          <button type="button" class="btn btn-primary">Edit</button>
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </>
  )
}
