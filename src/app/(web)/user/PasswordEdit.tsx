import Button from '@/components/Button';
import { ImKey } from 'react-icons/im';

const PasswordEdit = () => {
  return (
    <div className='flex'>
      <Button>
        <span>Change Password</span>
        <ImKey />
      </Button>
    </div>
  )
};

export default PasswordEdit;
