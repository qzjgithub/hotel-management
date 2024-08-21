type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({children, onClick}: ButtonProps) => {
  return (
    <button
      className='flex flex-1 justify-center items-center gap-2 p-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200'
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  )
};

export default Button;
