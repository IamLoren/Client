import { Store } from 'redux';
import { RootState } from './src/redux/store'; 

declare global {
  interface Window {
    store: Store<RootState>;
  }
}
export {};