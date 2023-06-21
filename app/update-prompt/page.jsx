'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';

const UpdatePrompt = () => {

    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [prompts, setPrompts] = useState({
        prompt: '',
        tags: '',
    });

    const getPrompt = async () => {
        await fetch(`/api/prompt/${promptId}`).then(response => response.json()).then(data => setPrompts({
            prompt: data.prompt,
            tags: data.tags
        }));
    }

    useEffect(() => {
        if (promptId) getPrompt();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();

        if (!promptId) return alert("No prompt found");

        try {
            setSubmitting(true);

            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: prompts.prompt,
                    tags: prompts.tags
                })
            });
            if (response.ok) router.push('/profile');
        } catch (error) {
            console.log("Error : ", error);
        } finally {
            setSubmitting(false);
        }
    }

    if (!session?.user?.id) return router.push('/');

    return (
        <>
            <Form
                type="Edit"
                handleSubmit={updatePrompt}
                prompts={prompts}
                setPrompts={setPrompts}
                submitting={submitting}
            />
        </>
    )
}

export default UpdatePrompt;