import Link from 'next/link';
import Container from '../Container';
import { Redressed } from 'next/font/google';
const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });
const NavBar = () => {
  return (
    <div
      className='sticky
  top-0
  w-full
  bg-slate-200
  z-30
  md:gap-0
  shadow-sm'
    >
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div>
            <Link
              href='/'
              className={`${redressed.className} font-bold text-2xl`}
            >
              E-Commerce Store
            </Link>
            <div>Search</div>
            <div className='flex items-center gap-8 md:gap-12'>
              <div>CartCount</div>
              <div>UserMenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
