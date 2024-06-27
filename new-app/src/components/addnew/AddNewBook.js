import React from 'react'
import {useFormik} from "formik";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const formvalidation = Yup.object().shape({
    code: Yup.string().matches(/^BO\d{4}$/,"Code validator is BO-XXXX with X is number").required("Required"),
    name: Yup.string().min(3,"too short").max(100,"too Long").required("Required"),
    date: Yup.date().max(new Date()).required("Required"),
    quantity: Yup.number().positive("Quantity must bigger than 0").required("Required"),
    typebookId: Yup.string().required("Required")
})
export default function AddNewBook() {
    const navigate = useNavigate()
    const [typebooks, setTypeBooks] = useState([])
    useEffect(() =>{
        axios.get('http://localhost:3301/typebooks')
       .then(res => {
        console.log(res);
        setTypeBooks(res.data)
       })
    },[]);

    const formAdd = useFormik({
        initialValues:{
            code:"",
            name:"",
            typebookId:"1",
            date:"",
            quantity:""
        },
        validationSchema: formvalidation,
        onSubmit: (value) => {
            axios.post('http://localhost:3301/books', value)
            .then(() => {
                alert("Order successfully")
                navigate("/")
            })
        },
    })
  return (
    <>
    <form className="form" onSubmit={formAdd.handleSubmit}>
         <div className="mb-3">
            <label className="form-label">Book's Code</label>
            <input name="code" onChange={formAdd.handleChange} type="text" className="form-control"/>
            {formAdd.errors.code && <p className={"text-danger"}>{formAdd.errors.code}</p>}
        </div>
        <div className="mb-3">
            <label className="form-label">Book's Name</label>
            <input name="name" onChange={formAdd.handleChange} type="text" className="form-control"/>
            {formAdd.errors.name && <p className={"text-danger"}>{formAdd.errors.name}</p>}
        </div>
        <div>
        <label className="form-label">Book's Type</label>
        <select class="form-select" name='typebookId' aria-label="Default select example">
            {typebooks.map((type) => (
                <option value={type.id} >{type.name_type}</option>
            ))}
            {formAdd.errors.typebookId && <p className={"text-danger"}>{formAdd.errors.typebookId}</p>}
        </select>
        </div>
        <div className="mb-3">
            <label className="form-label">Date</label>
            <input name="date" onChange={formAdd.handleChange} type="date" className="form-control"/>
            {formAdd.errors.date && <p className={"text-danger"}>{formAdd.errors.date}</p>}
        </div>
        <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input name="quantity" onChange={formAdd.handleChange} type="text" className="form-control"/>
            {formAdd.errors.quantity && <p className={"text-danger"}>{formAdd.errors.quantity}</p>}
        </div>
        
        <div className="mb-3">
            <button type="submit" className="btn btn-primary">Save</button>
            <Link to={"/"}>
                <button className="btn btn-info">Cancel</button>
            </Link>
        </div>
    </form>

</>
  )
}
