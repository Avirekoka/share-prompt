'use client';
import React from 'react';
import PromptCard from './PromptCard';
import Link from 'next/link'

const MyProfile = ({ name, desc, prompts, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text_left'><span className='blue_gradient'>{name} profile</span></h1>
      <p className="desc text-left">{desc}</p>

      {
        prompts && prompts.length !== 0 ? <div className="mt-10 prompt_layout">
          {
            prompts.map((prompt) => {
              return (
                <PromptCard
                  key={prompt._id}
                  prompt={prompt}
                  handleDelete={() => handleDelete && handleDelete(prompt)}
                  handleEdit={() => handleEdit && handleEdit(prompt)}
                />
              )
            })
          }
        </div> :   
          <div>
            
            <button>
              <p className='desc text-left max-w-md text-sm md:text-lg mb-5'>
                  It's looks like you don't have any prompt as of now. Don't wait to create it. hurry!!!
              </p>
              <Link
                href='/create-prompt'
                className='flex'
              >
                <button
                  type='submit'
                  className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                >
                  Create Prompt
                </button>
              </Link>
            </button>
          </div>
      }
    </section>
  )
}

export default MyProfile;