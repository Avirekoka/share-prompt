'use client'
import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [allPrompts, setAllPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);

  const getPrompts = async () => {
    try {
      await fetch('/api/prompt/new')
        .then(response => response.json())
        .then(data => {
          setAllPrompts(data);
          setFilteredPrompts(data);
        });
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    getPrompts();
  }, []);

  useEffect(() => {
    getFilteredPrompts();
  }, [searchText]);

  const getFilteredPrompts = () => {
    const prompts = allPrompts.filter(prompt => {
      return prompt.prompt.toLowerCase().includes(searchText.toLowerCase()) || prompt.tags.toLowerCase().includes(searchText.toLowerCase()) || prompt.creator.username.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredPrompts(prompts);
  };

  return (
    <section className='feed'>
      <form className='relative w-full  flex-col'>
        <span className='font-satoshi font-semibold text-base text-gray-700'>
          Search Prompts : {')'}
        </span>

        <div class="relative">
          <input
            type='text'
            placeholder='Search for a prompt, tag or a username'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            required
            className='search_input peer mt-2'
            name='searchText'
          />
          <span onClick={() => setSearchText('')} class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-gray-500">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </span>
        </div>
      </form>

      <div className='mt-16 prompt_layout'>
        {
          filteredPrompts.map((prompt) => {
            return (
              <PromptCard
                key={prompt._id}
                prompt={prompt}
                handleTagClick={setSearchText}
              />
            )
          })
        }
      </div>
    </section>
  )
}

export default Feed