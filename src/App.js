import './App.css';
import Comentarios from './Comentarios';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Fórum de Discussão</h1>
      </header>
      
      <main>

        <div className="result">
          < Comentarios/>
        </div>
        
      </main>
      <footer>
        <p>&copy; Douglas Araújo, 2023. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
