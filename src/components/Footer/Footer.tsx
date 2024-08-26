import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='mt-16'>
      <div className='bg-[#f6d77e] h-10 md:h-[70px] mt-2 w-full bottom-0 left-0 flex flex-col justify-center'>
        <div className='container mx-auto px-4 flex justify-between'>
          <Link
            href='/terms'
          >
            Terms & Conditions
          </Link>
          <Link
            href='/privacy'
          >
            Privacy & cookie statement
          </Link>
          <Link
            href='/contact'
          >
            Contact us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
