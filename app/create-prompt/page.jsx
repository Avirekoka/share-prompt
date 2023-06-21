'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Form from '@components/Form';
import {useRouter} from 'next/navigation';

const CreatePromptPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [prompts, setPrompts] = useState({
    prompt: '',
    tags: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: prompts.prompt,
          tags: prompts.tags,
          userId: session?.user?.id
        })
      });
      if(response.ok) router.push('/');
    } catch (error) {
      console.log("Error : ", error);
    } finally{
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form
        type="Create"
        handleSubmit={createPrompt}
        prompts={prompts}
        setPrompts={setPrompts}
        submitting={submitting}
      />
    </>
  )
}

export default CreatePromptPage;