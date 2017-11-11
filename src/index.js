import App from './App.js';

(id => {
  const viewRoot = document.getElementById(id);
  const app = new App({ viewRoot });
})('root');
