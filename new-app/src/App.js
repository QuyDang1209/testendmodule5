import logo from './logo.svg';
import './App.css';
import {Routes, Route } from 'react-router-dom';
import BooksList from './components/bookslist/BooksList';
import AddNewBook from './components/addnew/AddNewBook';
import Master from './components/mapper/Master';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Master />} >
      <Route path="/" element={<BooksList />} />
      <Route path="/books/create" element={<AddNewBook />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
