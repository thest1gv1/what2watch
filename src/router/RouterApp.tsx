import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.tsx";
import QuizPage from "../pages/QuizPage/QuizPage.tsx";
import MoviePage from "../pages/MoviePage/MoviePage.tsx";


const RouterApp = () => (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
);

export default RouterApp