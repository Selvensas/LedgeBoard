import express from 'express';
import NoteRouter from '../routes/notesRoutes.js';
import {connectDB} from '../config/db.js';
import mongoose from 'mongoose';
import Note from '../models/Note.js';
const app = express();


export  async function getAllNotes(req,res){
    try{
    const notes = await Note.find(); 
    res.status(200).json(notes);
    }catch(error){
        console.error("Error in getALlNotes ",error)
        res.status(500).json({message:"Internal Server EError"})
    }
    
}

export async function GetSpecificNote(req,res){

    try {
        const GetNote = await Note.findById(req.params.id)
        if(!GetNote)
        {
             return res.status(404).json({message:"No note found with this id"})
        }
          res.status(200).json(GetNote);
    } catch (error) {
          console.error("Error in GetSpecificNote ",error)
        res.status(500).json({message:"Internal Server EError"})
    }
}

export  async function CreateNote(req,res){
    try{
        // const notes = await Note.create({
        //     title:req.body.title,
        //     content:req.body.content
        // }); 
        const {title,content} = req.body;
        const newNote = new Note({title,content});
        await newNote.save();
        //after successful creation show the note
        res.status(201).json(newNote);  
        
    }catch(error){
        console.error("Error in CreateNote ",error)
        res.status(500).json({message:"Internal Server EError"})
    }
   
}

export async function UpdateNote(req,res){
    try {
        const {title,content} = req.body;
     const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content}, {new:true}); //new:true to return the updated note
     if(!updatedNote){
        return res.status(404).json({message:"No note found with this id"})
     }
        res.status(200).json({message:"Note updated successfully",updatedNote});
    } catch (error) {
        console.error("Error in UpdateNote ",error)
        res.status(500).json({message:"Internal Server Error"}) 
    }
    
}

export async function DeleteNote(req,res){

    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message:"No note found with this id"})
         }
         res.status(200).json({message:"Note deleted successfully"});
     
    }catch(error){
        console.error("Error in DeleteNote ",error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
}