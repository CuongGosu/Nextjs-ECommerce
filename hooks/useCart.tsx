import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CartProductType } from '../app/product/[productId]/ProductDetails';
import { toast } from 'react-hot-toast';
type CartContextType = {
  cartTotalQuantity: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQuantityIncrease: (product: CartProductType) => void;
  handleCartQuantityDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
};
export const CartContext = createContext<CartContextType | null>(null);
interface Props {
  [propName: string]: any;
}
export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  console.log('qty:', cartTotalQuantity);
  console.log('amount:', cartTotalAmount);
  useEffect(() => {
    const cartItems: any = localStorage.getItem('eShopCartItems');
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);

    setCartProducts(cProducts);
  }, []);
  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, quantity } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.quantity += item.quantity;
            return acc;
          },
          {
            total: 0,
            quantity: 0,
          }
        );
        setCartTotalQuantity(quantity);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updateCart;
      if (prev) {
        updateCart = [...prev, product];
      } else {
        updateCart = [product];
      }
      toast.success('Product added to cart successfully');
      localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
      return updateCart;
    });
  }, []);
  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      console.log('?');
      if (cartProducts) {
        const filteredCart = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filteredCart);
        toast.success('Product removed');
        localStorage.setItem('eShopCartItems', JSON.stringify(filteredCart));
      }
    },
    [cartProducts]
  );
  const handleCartQuantityIncrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      if (product.quantity === 99) {
        return toast.error("Can't add more than 99");
      }
      if (cartProducts) {
        updateCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updateCart[existingIndex].quantity += 1;
        }
        setCartProducts(updateCart);
        localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );
  const handleCartQuantityDecrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      if (product.quantity === 1) {
        return toast.error("Can't decrease less than 1");
      }
      if (cartProducts) {
        updateCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updateCart[existingIndex].quantity -= 1;
        }
        setCartProducts(updateCart);
        localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );
  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQuantity(0);
    localStorage.setItem('eShopCartItems', JSON.stringify(null));
  }, [cartProducts]);
  const value = {
    cartTotalQuantity,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    handleClearCart,
  };
  return <CartContext.Provider value={value} {...props} />;
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};
