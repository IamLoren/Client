import { createRoot } from "react-dom/client";
import { Store } from 'redux';
import { RootState } from './redux/store'; 
import App from "./App.tsx";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
interface MyWindow extends Window {
  store: Store<RootState>;
}
declare const window: MyWindow;
window.store=store;

createRoot(document.getElementById("root")!).render(
  <Provider store={store} >
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);
