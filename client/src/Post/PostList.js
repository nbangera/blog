import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const PostList = () => {
    const [posts, setPosts] = useState([]);

    const fetch = async () => {
        await axios.get('http://localhost:4000/posts').then((res) => {
            const data = Object.values(res.data);
            setPosts(data);
        })
    }

    useEffect(() => {
        fetch();
    }, []);


    const renderedPost = posts.map(post => {
        return (
            post && <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
                <div className="card-body"><h3>{post.title}</h3></div>
            </div>
        )
    });

    return (

        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPost}
        </div>);

}
