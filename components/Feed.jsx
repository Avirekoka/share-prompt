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
    const prompts = allPrompts.filter(prompt => prompt.prompt.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredPrompts(prompts);
  };
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className='search_input peer'
          name='searchText'
        />
      </form>

      <div className='mt-16 prompt_layout'>
        {
          filteredPrompts.map((prompt) => {
            return (
              <PromptCard
                key={prompt._id}
                prompt={prompt}
                handleTagClick={() => console.log("Clicked")}
              />
            )
          })
        }
      </div>
    </section>
  )
}

export default Feed