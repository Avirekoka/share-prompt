'use client'
import React, {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import MyProfile from '@components/MyProfile';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {

  const router = useRouter();
  const [prompts, setPrompts] = useState([]);

  const { data: session } = useSession();

  const getUserProfile = async () => {
    try {
      await fetch(`/api/user/${session?.user?.id}/prompts`)
        .then(response => response.json())
        .then(data => setPrompts(data));
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {;
      getUserProfile();
    }
  }, [session?.user]);

  const handleEdit = (prompt) => {
    router.push(`update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    await fetch(`/api/prompt/${prompt._id}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        const filteredPrompts = prompts.filter(prompt => prompt._id === prompt._id);
        setPrompts(filteredPrompts);
        // return alert("Successfully deleted");
      }
    }).catch(error => {
      return alert("Error deleting");
    });
  };


  return (
    <>
      <MyProfile
          name="My"
          desc="Welcome to my profile"
          prompts={prompts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </>
  )
}

export default ProfilePage;