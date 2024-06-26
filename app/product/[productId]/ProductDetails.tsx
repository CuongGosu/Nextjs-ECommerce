'use client';

import SetColor from '@/app/components/products/SetColor';
import SetQuantity from '@/app/components/products/SetQuantity';
import Button from '@/app/components/products/Button';
import { Rating } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ProductImage from '@/app/components/products/ProductImage';
import { useCart } from '@/app/hooks/useCart';
import { MdCheckCircle } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface ProductDetailsProps {
  product: any;
}
export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
const Horizontal = () => {
  return <hr className='w-[30%] my-2' />;
};
const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductCart, setIsProductCart] = useState(false);
  const { cartTotalQuantity } = useCart();
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: product.images[0],
    quantity: 1,
    price: product.price,
  });
  const router = useRouter();
  useEffect(() => {
    setIsProductCart(false);
    console.log('CartContextProvider rendered');
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductCart(true);
      }
    }
  }, [cartProducts]);
  const productRating = product.reviews.length
    ? product.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) /
      product.reviews.length
    : 0;
  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );
  const handleQuantityIncrease = useCallback(() => {
    console.log(cartProduct.quantity);
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);
  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className='text-3xl font-medium text-slate-700'>
        <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
        <div className='flex items-center gap-2'>
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className='text-justify'>{product.description}</div>
        <div>
          <span>CATEGORY:</span>
          <span>{product.category}</span>
        </div>
        <div>
          <span>BRAND:</span>
          <span>{product.brand}</span>
        </div>
        <div className={product.inStock ? 'text-teal-400' : 'text-rose-400'}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <Horizontal />
        {isProductCart ? (
          <>
            <p className='mb-2 text-slate-500 flex items-center gap-1'>
              <MdCheckCircle className='text-teal-400' size={20} />
              <span>Product added to cart</span>
            </p>
            <div className='max-w-[300px]'>
              <Button
                label='View Cart'
                outline
                onCLick={() => {
                  router.push('/cart');
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityIncrease={handleQuantityIncrease}
              handleQuantityDecrease={handleQuantityDecrease}
            />
            <Horizontal />
            <div className='max-w-[300px]'>
              <Button
                label='Add to cart'
                onCLick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
