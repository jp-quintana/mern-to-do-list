import {
  getNoteContent,
  addNote,
  saveChangesToNote,
  duplicateNote,
  removeNote,
} from '../services/noteService.js';

// TODO: Add User Data
export const getNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const noteContent = await getNoteContent(req.user.id, noteId);

    res.json(noteContent);
  } catch (err) {
    return next(err);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const newNote = await addNote(req.user.id);

    res.json(newNote);
  } catch (err) {
    return next(err);
  }
};

export const editNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    await saveChangesToNote(req.user.id, noteId, req.body);
    res.json({ message: 'Success' });
  } catch (err) {
    return next(err);
  }
};

export const createDuplicateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const newNote = await duplicateNote(req.user.id, noteId);
    res.json(newNote);
  } catch (err) {
    return next(err);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    await removeNote(req.user.id, noteId);
    res.json({ message: 'Success' });
  } catch (err) {
    return next(err);
  }
};
