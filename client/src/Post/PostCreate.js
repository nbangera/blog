import React, { useState } from 'react'
import axios from 'axios'

export const PostCreate = () => {
    const [title, setTitle] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://posts.com/posts/create',{title})
        setTitle('');
    }
    return (
        <div className="container">
            <h3>Create Post</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className='form-control' ></input>
                </div>
                <button className='btn btn-primary' type="submit">Create</button>
            </form>
        </div>
    )
}