import React, { useState } from 'react'
import axios from 'axios'
import { CommentList } from './CommentList';

export const CommentCreate = ({ postId }) => {

    const [comment, setComment] = useState('');

    const OnCommentAdd = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, { 'comment' : comment })
        setComment('');
    }

    return (
        <div>           
            <form onSubmit={OnCommentAdd}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input value={comment} onChange={(e) => setComment(e.target.value)}></input>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}