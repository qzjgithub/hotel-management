import React, { useEffect, useState } from 'react'

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOk: (text: string) => Promise<void>;
  defaultText?: string;
};

const InfoEditModal = ({isOpen, onClose, onOk, defaultText}: Props) => {
  const [textInfo, setTextInfo] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTextInfo(defaultText || '');
    } else {
      setTextInfo('');
    }
  }, [isOpen, defaultText]);

  const handleConfirm = async() => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      if (onOk) {
        await onOk(textInfo);
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed z-[61] inset-0 flex items-center justify-center ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='bg-white w-96 p-4 rounded-lg shadow-lg'>
        <h2 className='text-xl dark:text-gray-800 font-semibold mb-2'>
          Edit About Info
        </h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            About
          </label>

          <textarea
            value={textInfo}
            onChange={e => setTextInfo(e.target.value)}
            rows={4}
            className='w-full px-2 py-3 border rounded-md'
            placeholder='Write something about yourself'
          />
        </div>
        <div className='flex justify-end'>
          <button
            onClick={handleConfirm}
            className='px-4 py-2 bg-primary text-white rounded-md'
            disabled={loading}
          >
            {loading ? 'Submitting' : 'Submit'}
          </button>
          <button
            onClick={onClose}
            className='ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default InfoEditModal