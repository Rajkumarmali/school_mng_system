import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );
}

export default App;
