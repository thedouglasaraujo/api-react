import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [addedUser, setAddedUser] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    const user = {
      name,
      email
    };

    axios
      .post('https://jsonplaceholder.typicode.com/users', user)
      .then(response => {
        setSuccessMessage('Usuário criado com sucesso');
        setName('');
        setEmail('');
        setAddedUser(response.data);
      })
      .catch(error => {
        setErrorMessage('Erro ao criar usuário');
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {addedUser && (
        <div>
          <h2>Item Adicionado:</h2>
          <p>Nome: {addedUser.name}</p>
          <p>Email: {addedUser.email}</p>
        </div>
      )}
    </div>
  );
}

export default UserForm;
