import React from 'react'
import { Link } from 'react-router'
import { toast } from 'react-hot-toast';
import { Edit2Icon, Trash2Icon, ViewIcon } from 'lucide-react';
import { formatDate } from '../lib/utils';
import axiosInstance from '../lib/axios.js'
const NoteCard = ({ note }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const confirm = window.confirm("Are you sure you want to delete this note?");
    if (!confirm) return;
    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };


  return (
   <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#2f2f2f]"
    >
      <div className="card-body border-b border-solid border-[#7e7e7e] shadow-2xl">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
          {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
           
            <button

              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
           
           
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
