import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MostrarDados() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://reqres.in/api/users')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        data.map(item => (
          <div key={item.id}>{item.email}</div>
        ))
      ) : (
        <div>Nenhum dado disponível</div>
      )}
    </div>
  );
}

export default MostrarDados;
