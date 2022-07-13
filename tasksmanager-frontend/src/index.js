import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { TaskContextProvider } from './context/taskContext';

ReactDOM.render(
  <BrowserRouter>
    <TaskContextProvider>
      <App />
    </TaskContextProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
