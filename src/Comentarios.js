import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './Formulario';

function Comentarios() {
  const [comments, setComments] = useState([]);
  const [perPage, setPerPage] = useState(10); // Número de itens por página
  const [currentPage, setCurrentPage] = useState(1); // Página atual

  useEffect(() => {
    fetchComments();
  }, [currentPage]);

  const fetchComments = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${perPage}`)
      .then(response => {
        setComments(prevComments => [...prevComments, ...response.data]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCommentAdded = (comment) => {
    setComments(prevComments => [comment, ...prevComments]);
  };

  const handleUpdateComment = (commentId, updatedComment) => {
    axios
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
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
      .then(() => {
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            <button onClick={() => handleUpdateComment(comment.id, { ...comment, body: 'Novo corpo do comentário' })}>
              Atualizar
            </button>
            <button onClick={() => handleDeleteComment(comment.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comentarios;
