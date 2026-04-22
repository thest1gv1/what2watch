
import {HashRouter as Router} from 'react-router-dom';
import Header from "./components/Header/Header.tsx";

import RouterApp from "./router/RouterApp.tsx";

function App() {

  return (
    <Router>
      <Header />
      <main className="container">
        <RouterApp />
      </main>
    </Router>
  );
}

export default App
