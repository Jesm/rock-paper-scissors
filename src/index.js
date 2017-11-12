import App from './App.js';
import '../resources/sass/app.scss';

(id => {
  const viewRoot = document.getElementById(id);
  const app = new App({ viewRoot });
})('root');
