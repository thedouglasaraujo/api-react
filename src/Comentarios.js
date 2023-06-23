import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './Formulario';

function Comentarios() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCommentAdded = (comment) => {
    setComments((prevComments) => [comment, ...prevComments]);
  };

  return (
    <div>
      <Formulario onCommentAdded={handleCommentAdded} />
      <h2>Lista de Comentários:</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>Nome: {comment.name}</p>
            <p>Email: {comment.email}</p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default Comentarios;
