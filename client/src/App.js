import React from 'react';
import { PostCreate } from './Post/PostCreate';
import {PostList} from './Post/PostList'

const App = () =>{
  return (
    <div className="App">
      <h1>Blogs</h1>  
      <PostCreate></PostCreate>
      <hr></hr>
      <h1>Posts</h1>
      <PostList></PostList>
    </div>
  );
}

export default App;
