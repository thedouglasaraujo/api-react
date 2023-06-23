import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './Formulario';
import FormularioAtualizacao from './FormularioAtualizacao';
import './App.css';

function Comentarios() {
  const [comments, setComments] = useState([]);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

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
    setComments((prevComments) => [
      { ...comment, body: comment.message },
      ...prevComments,
    ]);
  };

  const handleUpdateComment = (commentId, updatedComment) => {
    return axios
      .put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, updatedComment)
      .then(response => {
        setComments((prevComments) => {
          const updatedComments = prevComments.map(comment => {
            if (comment.id === commentId) {
              return response.data;
            }
            return comment;
          });
          return updatedComments;
        });
        setCommentForUpdate(null);
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
      .then(() => {
        setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEditComment = (comment) => {
    setCommentForUpdate(comment);
  };

  const handleCancelEdit = () => {
    setCommentForUpdate(null);
  };

  return (
    <div>
      <Formulario onCommentAdded={handleCommentAdded} />
      <h2>Lista de Comentários:</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p className='name'>{comment.name}</p>
            <p className='email'>{comment.email}</p>
            <p className='message'>{comment.body}</p>
            {commentForUpdate && commentForUpdate.id === comment.id ? (
              <FormularioAtualizacao comment={comment} onUpdateComment={handleUpdateComment} />
            ) : (
              <>
                <button className="edit-button" onClick={() => handleEditComment(comment)}>Editar</button>
                <button className="delete-button" onClick={() => handleDeleteComment(comment.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {commentForUpdate && (
        <div>
          <h3>Editar Comentário</h3>
          <p>Nome: {commentForUpdate.name}</p>
          <p>Email: {commentForUpdate.email}</p>
          <FormularioAtualizacao comment={commentForUpdate} onUpdateComment={handleUpdateComment} />
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default Comentarios;

