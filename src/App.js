import logo from './logo.svg';
import './App.css';




function App() { 
    /*const clientId='809085480924-kd4b5cqfatoiirqu60ehktf5u7iobnnu.apps.googleusercontent.com'*/ 
    const [user,setUser] = useState({});

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://www.instagram.com/jaime14vrs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          te quiero jeje
        </a>
      </header>
    </div>
  );
}

export default App;
