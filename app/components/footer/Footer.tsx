import Link from 'next/link';
import Container from '../Container';
import FooterList from './FooterList';
import { MdFacebook } from 'react-icons/md';
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from 'react-icons/ai';
const Footer = () => {
  return (
    <footer className='bg-slate-700 text-slate-200 text-sm mt-16'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>
          <FooterList>
            <h3 className='text-base font-bold'>Shop categories</h3>
            <Link href='#'>Phones</Link>
            <Link href='#'>Laptops</Link>
            <Link href='#'>Desktop</Link>
            <Link href='#'>Tvs</Link>
            <Link href='#'>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className='text-base font-bold'>Customer service</h3>
            <Link href='#'>Contact us</Link>
            <Link href='#'>Shipping Policy</Link>
            <Link href='#'>Return & Exchanges</Link>
            <Link href='#'>Tvs</Link>
            <Link href='#'>FAQs</Link>
          </FooterList>
          <FooterList>
            <h3 className='text-base font-bold'>About us</h3>
            <p>
              At our electronics store, we are dedicated to providing the latest
              and greatest devices and accessories to our customers. With a wide
              selection of phones, TVs, laptops, watches, and accessories.
            </p>
            <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved</p>
          </FooterList>
          <FooterList>
            <h3 className='text-base font-bold m-2'>Follow Us</h3>
            <div className='flex gap-2'>
              <Link href='#'>
                <MdFacebook size={24} />
              </Link>
              <Link href='#'>
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href='#'>
                <AiFillInstagram size={24} />
              </Link>
              <Link href='#'>
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
