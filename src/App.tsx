import Home from "./pages/HomePage/Home.tsx";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/Header.tsx";
import Quiz from "./pages/QuizPage/Quiz.tsx";

function App() {

  return (
    <Router>
      <Header/>
      <main className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App
