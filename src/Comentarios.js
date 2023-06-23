import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './Formulario';
import FormularioAtualizacao from './FormularioAtualizacao';
import './App.css';

function Comentarios() {
  const [comments, setComments] = useState([]);
  const [commentForUpdate, setCommentForUpdate] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCommentAdded = comment => {
    setComments(prevComments => [
      { ...comment, body: comment.message },
      ...prevComments,
    ]);
  };

  const handleUpdateComment = (commentId, updatedComment) => {
    return axios
      .put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, updatedComment)
      .then(response => {
        setComments(prevComments => {
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

  const handleDeleteComment = commentId => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
      .then(() => {
        setComments(prevComments =>
          prevComments.filter(comment => comment.id !== commentId)
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEditComment = comment => {
    setCommentForUpdate(comment);
  };

  const handleCancelEdit = () => {
    setCommentForUpdate(null);
  };

  const fetchMoreComments = () => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?_page=${page + 1}`)
      .then(response => {
        setComments(prevComments => [...prevComments, ...response.data]);
        setPage(prevPage => prevPage + 1);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchMoreComments();
    }
  };

  return (
    <div>
      <Formulario onCommentAdded={handleCommentAdded} />
      <h2>Comentários</h2>
      <ul>
        {comments.slice(0, page * 10).map(comment => (
          <li key={comment.id} className="comment-item">
            <p className="name">{comment.name}</p>
            <p className="email">{comment.email}</p>
            <p className="message">{comment.body}</p>
            {commentForUpdate && commentForUpdate.id === comment.id ? (
              <FormularioAtualizacao
                comment={comment}
                onUpdateComment={handleUpdateComment}
              />
            ) : (
              <>
                <button className="edit-button" onClick={() => handleEditComment(comment)}>
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Excluir
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      {isLoading && <p>Carregando...</p>}
      {commentForUpdate && (
        <div>
          <h3>Editar Comentário</h3>
          <p>Nome: {commentForUpdate.name}</p>
          <p>Email: {commentForUpdate.email}</p>
          <FormularioAtualizacao
            comment={commentForUpdate}
            onUpdateComment={handleUpdateComment}
          />
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default Comentarios;
