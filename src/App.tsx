import Home from "./pages/Home.tsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/Header.tsx";

function App() {

  return (
    <Router>
      <Header/>
      <main className='container'>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App
