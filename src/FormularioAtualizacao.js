import React, { useState } from 'react';

function FormularioAtualizacao({ comment, onUpdateComment }) {
  const [body, setBody] = useState(comment.body);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedComment = {
      ...comment,
      body: body
    };

    onUpdateComment(comment.id, updatedComment)
      .then(() => {
        setSuccessMessage('Comentário atualizado com sucesso');
      })
      .catch(error => {
        setErrorMessage('Erro ao atualizar comentário');
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Mensagem:
          <input type="text" className="input" value={body} onChange={e => setBody(e.target.value)} />
        </label>
        <br />
        <button className="button" type="submit">Atualizar</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default FormularioAtualizacao;
