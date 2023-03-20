import ListContainer from './components/List/ListContainer';
import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <h1>Rick's List</h1>
      <p>This one will never gonna give you up, will never gonna let you down or run around and desert you.</p>

      <ListContainer />
    </div>
  );
}

export default App;
