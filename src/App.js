import logo from './logo.svg';
import './App.css';
import MostrarDados from './Http';

function App() {
  return (
    <div className="app">
      <header>
        <h1>API</h1>
      </header>
      <main>

        <input className="input" type="text" placeholder="Nome" />
        <input className="input" type="email" placeholder="E-mail" />

        <button className="button">Enviar</button>

        <div className="result">
          < MostrarDados/>
        </div>
      </main>
      <footer>
        <p>&copy; 2023 API. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
