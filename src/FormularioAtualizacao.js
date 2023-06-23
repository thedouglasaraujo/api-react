import React, { useState } from 'react';

function FormularioAtualizacao({ comment, onUpdateComment }) {
  const [body, setBody] = useState(comment.body); // Estado para armazenar o conteúdo da mensagem atualizada
  const [successMessage, setSuccessMessage] = useState(''); // Estado para exibir uma mensagem de sucesso após a atualização do comentário
  const [errorMessage, setErrorMessage] = useState(''); // Estado para exibir uma mensagem de erro em caso de falha na atualização do comentário

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedComment = {
      ...comment,
      body: body
    }; // Cria um objeto com o comentário atualizado

    onUpdateComment(comment.id, updatedComment) // Chama a função onUpdateComment() para atualizar o comentário
      .then(() => {
        setSuccessMessage('Comentário atualizado com sucesso'); // Define a mensagem de sucesso no estado "successMessage"
      })
      .catch(error => {
        setErrorMessage('Erro ao atualizar comentário'); // Define a mensagem de erro no estado "errorMessage"
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Mensagem:
          <input type="text" className="input" value={body} onChange={e => setBody(e.target.value)} /> {/* Input para editar a mensagem */}
        </label>
        <br />
        <button className="button" type="submit">Atualizar</button> {/* Botão para enviar o formulário de atualização */}
      </form>
      {successMessage && <p>{successMessage}</p>} {/* Exibe a mensagem de sucesso, se existir */}
      {errorMessage && <p>{errorMessage}</p>} {/* Exibe a mensagem de erro, se existir */}
    </div>
  );
}

export default FormularioAtualizacao;
