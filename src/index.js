import App from './App.js';

(id => {
  const root = document.getElementById(id);
  const app = new App(root);
})('root');
