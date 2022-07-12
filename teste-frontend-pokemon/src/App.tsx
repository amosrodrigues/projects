import { Route, Routes, BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Home from './pages/Home';
import Details from './pages/Details';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
