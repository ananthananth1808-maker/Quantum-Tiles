import AppRouter from './app/router/AppRouter';
import { CartProvider } from './entities/cart/model/CartProvider';
import { ToastProvider } from './shared/ui/ToastProvider';
import ToastContainer from './shared/ui/ToastContainer';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AppRouter />
        <ToastContainer />
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
