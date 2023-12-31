'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImagePlusIcon, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  // to prevent a hydration error
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className='flex mb-4 items-center gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] overflow-hidden rounded-md'
          >
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                variant='destructive'
                size='icon'
                onClick={() => onRemove(url)}
              >
                <Trash className='w-4 h-4' />
              </Button>
            </div>
            <Image src={url} fill className='object-cover' alt='Image' />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset='oa3dh5uj'>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type='button'
              disabled={disabled}
              variant='secondary'
              onClick={onClick}
            >
              <ImagePlusIcon className='w-4 h-4 mr-2' />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
export default ImageUpload;
