import React from 'react'

export default function Bookseach(props) {
    const handleChange = (evt) => {
        props.search(evt.target.value);
    }
  return (
    <>
            <input className="form-control" type="text" onChange={handleChange} />
        </>
  )
}
