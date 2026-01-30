import React, { use, useEffect } from 'react'
import NavBar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import axiosInstance from '../lib/axios.js'

const HomePage = () => {
     const [isRateLimited, setIsRateLimited] = useState(false);
     const [notes,setNotes] = useState([]);
     const [loading,setLoading] = useState(true);

     useEffect(() => {
      const fetchnotes = async () => {
        try {
         const res = await axiosInstance.get('/notes')
         console.log(res.data);
         setNotes(res.data);
         setIsRateLimited(false);
        
        }
        catch (error) {
          console.log("Error Fetching Notes");
          if (error.response && error.response.status === 429) {
            setIsRateLimited(true);
            toast.error("You are being rate limited. Please try again later.");
          }
          else{
            toast.error("Error Fetching Notes");
          }
        }
        finally
        {
          setLoading(false);
        }
      };
      fetchnotes();
     }, []);
     
  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-6xl mx-auto px-4 py-8">
         {loading && <div className='text-center text-primary py-12 '>Loading notes...</div>}
          {notes.length === 0 && !isRateLimited && !loading && (
            <div className='text-center text-base-content/70 py-12 '>No notes found. Click "Add Note" to create one!</div>
          )}
         {notes.length > 0 && !isRateLimited && (
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {notes.map((note) => (
            //for every single note make a card
           <NoteCard key={note._id} note={note} />
            

          ))}
        </div>
         ) }
       </div>

    </div>
  )
}

export default HomePage
