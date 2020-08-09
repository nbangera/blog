import React, { useState, useEffect } from "react";
import axios from "axios";

export const CommentList = ({ comments }) => {
  return (
    <div>
      <ul>
        {comments &&
          comments.map((comment) => {
            let content;
            console.log(comment);
            if(comment.status === 'rejected'){
              content = 'content was rejected';
            }
            if(comment.status === 'pending'){
              content = 'content moderation is pending';
            }
            if(comment.status === 'approved'){
              content = comment.comment;
            }
          return<li key={comment.id}>{content}</li>
          })}
      </ul>
    </div>
  );
};
