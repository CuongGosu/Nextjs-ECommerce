'use client';

import { formatPrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncateText';
import Image from 'next/image';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
interface ProductCardProps {
  data: any;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const productRating = data.reviews.length
    ? data.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) /
      data.reviews.length
    : 0;

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className='col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm'
    >
      <div className='flex flex-col items-center w-full gap-1'>
        <div className='aspect-square overflow-hidden relative w-full'>
          <Image
            src={data.images[0].image}
            alt={data.name}
            fill
            className='w-full object-contain'
          />
        </div>
        <div className='mt-4 min-h-[3rem] max-h-[3rem] overflow-hidden'>
          {truncateText(data.name)}
        </div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className='font-semibold'>{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
