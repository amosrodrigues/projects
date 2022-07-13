import { Route, Routes } from 'react-router-dom';

import Main from './pages/Main/Main';
import Tables from './pages/Tables/Tables';

import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tables" element={<Tables />} />
      </Routes>
    </>
  );
}

export default App;
