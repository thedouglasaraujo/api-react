import React, { useState } from 'react';
import axios from 'axios';

function Formulario({ onCommentAdded }) {
  const [name, setName] = useState(''); // Estado para armazenar o valor do campo "Nome"
  const [email, setEmail] = useState(''); // Estado para armazenar o valor do campo "Email"
  const [message, setMessage] = useState(''); // Estado para armazenar o valor do campo "Mensagem"
  const [successMessage, setSuccessMessage] = useState(''); // Estado para exibir uma mensagem de sucesso após o envio do comentário
  const [errorMessage, setErrorMessage] = useState(''); // Estado para exibir uma mensagem de erro em caso de falha no envio do comentário

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar os campos do formulário
    if (!name || !email || !message) {
      setErrorMessage('Por favor, preencha todos os campos.'); // Define a mensagem de erro no estado "errorMessage"
      return;
    }

    const user = {
      name,
      email,
      message,
    }; // Cria um objeto com os dados do usuário

    axios
      .post('https://jsonplaceholder.typicode.com/users', user) // Envia uma requisição POST para a API com os dados do usuário
      .then((response) => {
        setSuccessMessage('Comentário realizado com sucesso'); // Define a mensagem de sucesso no estado "successMessage"
        setName(''); // Limpa o campo "Nome"
        setEmail(''); // Limpa o campo "Email"
        setMessage(''); // Limpa o campo "Mensagem"
        onCommentAdded(response.data); // Chama a função onCommentAdded() passando os dados do comentário adicionado
        setErrorMessage(''); // Limpa a mensagem de erro
      })
      .catch((error) => {
        setErrorMessage('Erro ao realizar comentário'); // Define a mensagem de erro no estado "errorMessage"
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} /> {/* Input para inserir o nome */}
        </label>
        <br />
        <label>
          Email:
          <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Input para inserir o email */}
        </label>
        <br />
        <label>
          Mensagem:
          <input type="text" className="input" value={message} onChange={(e) => setMessage(e.target.value)} /> {/* Input para inserir a mensagem */}
        </label>
        <br />
        <button className="button" type="submit">Enviar</button> {/* Botão para enviar o formulário */}
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Exibe a mensagem de sucesso, se existir */}
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe a mensagem de erro, se existir */}
    </div>
  );
}

export default Formulario;
