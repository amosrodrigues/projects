import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { RemedyContextProvider } from './context/remedyContext';

ReactDOM.render(
  <BrowserRouter>
    <RemedyContextProvider>
      <App />
    </RemedyContextProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
