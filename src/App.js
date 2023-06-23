import logo from './logo.svg';
import './App.css';
import Comentarios from './Comentarios';
import Formulario from './Formulario';

function App() {
  return (
    <div className="app">
      <header>
        <h1>API</h1>
      </header>
      
      <main>

        <div className="result">
          < Comentarios/>
        </div>
        
      </main>
      <footer>
        <p>&copy; 2023 API. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
