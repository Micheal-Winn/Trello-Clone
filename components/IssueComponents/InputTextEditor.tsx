"use client"
import React, { useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
    ['bold', 'italic', 'underline',],        // toggled buttons
    ['blockquote'],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['clean']                                         // remove formatting button
  ];
 

const InputTextEditor = () => {
    const [descValue, setDescValue] = useState<string | undefined>();
    const modules = {
        toolbar: toolbarOptions
      }
  return (
   <div>
     <ReactQuill theme="snow" modules={modules} value={descValue} onChange={setDescValue} className='w-full '/>
   </div>
  )
}

export default InputTextEditor