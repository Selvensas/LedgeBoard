import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from '../lib/axios.js'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  
  const handlesubmit = async (e) => {
    e.preventDefault()
  
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      console.log("Validation failed: All fields are required");
      return;
    }

    setLoading(true);
    try {
      
      const res = await axiosInstance.post('/notes', {
        title,
        content
      });
      toast.success("Note created successfully");
      setTitle('');
      setContent('');
      navigate('/');
    } catch (error) {
     
      const status = error?.response?.status;
      if (status === 429) {
        toast.error("You are being rate limited. Please try again later.", { duration: 4000, icon: '⏳🔧' });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }


  // Temporary helper to rapidly send multiple requests to the API so you
  // can trigger and observe the rate limiter from the client side.
  const stressTest = async (count = 8, delayMs = 100) => {
    setLoading(true);
    for (let i = 0; i < count; i++) {
      try {
        await axios.post('http://localhost:3000/api/notes', {
          title: title || `stress-${i + 1}`,
          content: content || `stress-content-${i + 1}`,
        });
        toast.success(`Request ${i + 1} succeeded`, { duration: 1500 });
      } catch (err) {
        const st = err?.response?.status;
        if (st === 429) {
          toast.error(`Rate limited on request ${i + 1}`, { duration: 4000, icon: '⏳🔧' });
        } else {
          toast.error(`Request ${i + 1} failed`);
        }
      }
      // small pause between requests to better reproduce server rate limiting
      await new Promise((r) => setTimeout(r, delayMs));
    }
    setLoading(false);
  };
  } 
  return (
    
    <div className='min-h-screen bg-base-300'>
      
      <div className='container mx-auto px-4 py-10' >
          <Link to="/" className="btn btn-primary mb-6">
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>
          <div className='card bg-base-100 shadow-md'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create a New Note</h2>
              <form onSubmit={handlesubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder='Note Title'
                    className='input input-bordered w-full'
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    
                  />
                </div>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea
                   placeholder='Note Content'
                    className='textarea textarea-bordered w-full h-30'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                   
                  ></textarea>
                </div>
                 <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
               
                </div>
              </form>
            </div>

          </div>
            
          
      </div>
     
    </div>
  )
}

export default CreatePage
