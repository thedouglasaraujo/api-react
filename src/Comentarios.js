import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './Formulario';
import FormularioAtualizacao from './FormularioAtualizacao';
import './App.css';

function Comentarios() {
  const [comments, setComments] = useState([]); // Estado para armazenar os comentários
  const [commentForUpdate, setCommentForUpdate] = useState(null); // Estado para armazenar o comentário selecionado para edição
  const [page, setPage] = useState(1); // Estado para controlar a página atual dos comentários
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento dos comentários adicionais

  useEffect(() => {
    fetchComments(); // Executa a função fetchComments() uma vez no momento da renderização inicial
  }, []);

  const fetchComments = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setComments(response.data); // Atualiza o estado "comments" com os dados obtidos da API
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCommentAdded = comment => {
    setComments(prevComments => [
      { ...comment, body: comment.message },
      ...prevComments,
    ]); // Adiciona um novo comentário ao estado "comments" com a mensagem renomeada para "body"
  };

  const handleUpdateComment = (commentId, updatedComment) => {
    return axios
      .put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, updatedComment)
      .then(response => {
        setComments(prevComments => {
          const updatedComments = prevComments.map(comment => {
            if (comment.id === commentId) {
              return response.data; // Substitui o comentário atualizado no estado "comments"
            }
            return comment;
          });
          return updatedComments;
        });
        setCommentForUpdate(null); // Limpa o estado "commentForUpdate" após a atualização do comentário
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
        ); // Remove o comentário do estado "comments"
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEditComment = comment => {
    setCommentForUpdate(comment); // Define o comentário selecionado para edição no estado "commentForUpdate"
  };

  const handleCancelEdit = () => {
    setCommentForUpdate(null); // Limpa o estado "commentForUpdate" para cancelar a edição do comentário
  };

  const fetchMoreComments = () => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?_page=${page + 1}`)
      .then(response => {
        setComments(prevComments => [...prevComments, ...response.data]); // Adiciona mais comentários ao estado "comments"
        setPage(prevPage => prevPage + 1); // Atualiza o número da página atual
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
      fetchMoreComments(); // Carrega mais comentários quando o usuário rolar até o final da página
    }
  };

  return (
    <div>
      <Formulario onCommentAdded={handleCommentAdded} /> {/* Componente para adicionar novos comentários */}
      <h2>Comentários</h2>
      <ul>
        {comments.slice(0, page * 10).map(comment => ( /* Renderiza os comentários com base na página atual */
          <li key={comment.id} className="comment-item">
            <p className="name">{comment.name}</p>
            <p className="email">{comment.email}</p>
            <p className="message">{comment.body}</p>
            {commentForUpdate && commentForUpdate.id === comment.id ? (
              <FormularioAtualizacao
                comment={comment}
                onUpdateComment={handleUpdateComment}
              /> /* Renderiza o formulário de atualização se o comentário estiver sendo editado */
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
      {isLoading && <p>Carregando...</p>} {/* Exibe uma mensagem de carregamento enquanto os comentários adicionais estão sendo buscados */}
      {commentForUpdate && (
        <div>
          <h3>Editar Comentário</h3>
          <p>Nome: {commentForUpdate.name}</p>
          <p>Email: {commentForUpdate.email}</p>
          <FormularioAtualizacao
            comment={commentForUpdate}
            onUpdateComment={handleUpdateComment}
          /> {/* Renderiza o formulário de atualização para o comentário selecionado */}
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default Comentarios;
