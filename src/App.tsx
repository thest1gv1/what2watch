import HomePage from "./pages/HomePage/HomePage.tsx";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/Header.tsx";
import QuizPage from "./pages/QuizPage/QuizPage.tsx";

function App() {

  return (
    <Router>
      <Header/>
      <main className='container'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App
