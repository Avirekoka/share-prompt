'use client';
import React, { useState} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {

  const { data: session } = useSession();
  const [copied, setCopied] = useState('');
  const pathName = usePathname();
  const router = useRouter();

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      setCopied(text);
      navigator.clipboard.writeText(text)
        .then(() => {
          setTimeout(() => {
            setCopied('');
          }, 2000);
        })
        .catch((error) => {
          console.error('Error copying text to clipboard:', error);
        });
    }
  };

  return (
    <div className='prompt_card'>
      <div className="flex justify-between items-start gap-5">
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={() => {
          if (prompt?.creator?._id === session?.user?.id) {
            return router.push(`/profile`);
          } else {
            return router.push(`/profile/${prompt?.creator?._id}?name=${prompt?.creator?.username}`);
          }
        }}>
          <Image
            src={prompt?.creator?.image}
            alt="Creator"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {prompt?.creator?.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {prompt?.creator?.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => copyToClipboard(prompt.prompt)}>
          <Image
            src={copied === prompt.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt='Copy/Tick'
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(prompt.tags)}
      >
        {prompt.tags}
      </p>

      {
        session?.user?.id && session?.user?.id === prompt?.creator?._id && pathName === '/profile' && (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
            <p
              className='font-inter text-sm green_gradient cursor-pointer'
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className='font-inter text-sm orange_gradient cursor-pointer'
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard