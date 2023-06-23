import React, { useState } from 'react';
import axios from 'axios';

function Formulario({ onCommentAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar os campos do formulário
    if (!name || !email || !message) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    const user = {
      name,
      email,
      message,
    };

    axios
      .post('https://jsonplaceholder.typicode.com/users', user)
      .then((response) => {
        setSuccessMessage('Comentário realizado com sucesso');
        setName('');
        setEmail('');
        setMessage('');
        onCommentAdded(response.data);
        setErrorMessage(''); // Limpar a mensagem de erro
      })
      .catch((error) => {
        setErrorMessage('Erro ao realizar comentário');
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Mensagem:
          <input type="text" className="input" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <br />
        <button className="button" type="submit">Enviar</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Formulario;
