"use client"
import React from 'react'
import { useState } from 'react'
interface JoinFormProps {
  onJoin: (username: string) => void;
}
function JoinForm({ onJoin }: JoinFormProps) {
   const [username, setUsername] = useState("")
   const [error, setError] = useState<string | null>(null);

   const submitHandler = (e:React.SubmitEvent<HTMLFormElement> ) =>{
    e.preventDefault();
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Username cannot be empty");
      return;
    }
    setError(null);
  onJoin(trimmedUsername)
}

  return (

    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Join Chat</h1>
      <form onSubmit = {submitHandler}  className='flex flex-col items-center'>
      <input type="text" className='text-amber-800 border-2 border-amber-400 rounded-md p-2 mb-4'
       value= {username}
       onChange={(e)=> setUsername(e.target.value)}
       placeholder='username dalo' />
       {error && <p className="text-red-500 text-sm">{error}</p>}
       <button type="submit" className='bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-amber-500'>
         Submit
       </button>
</form>
    </div>

  )
}

export default JoinForm
