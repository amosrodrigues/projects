import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
