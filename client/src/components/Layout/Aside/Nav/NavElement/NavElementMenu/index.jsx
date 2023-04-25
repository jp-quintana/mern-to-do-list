import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaRegClone, FaLink, FaEdit } from 'react-icons/fa';
import { TbStar, TbStarOff, TbArrowForwardUp } from 'react-icons/tb';

import { useNote } from 'hooks/useNote';
import { useNotesContext } from 'hooks/useNotesContext';

import styles from './index.module.scss';

const NavElementMenu = ({ id, isFavorite }) => {
  const navigate = useNavigate();

  const { deleteNote, error } = useNote();
  const { selectedNote } = useNotesContext();

  const [navigation, setNavigation] = useState(false);

  const handleDeleteNote = async () => {
    await deleteNote(id);

    console.log(selectedNote.id === id);

    if (id === selectedNote.id) {
      console.log('here');
      setNavigation(true);
    }
  };

  useEffect(() => {
    console.log('running');
    if (navigation && !error) {
      navigate(`notes/${selectedNote.id}`);
    } else {
      setNavigation(false);
    }
  }, [navigation]);

  // TODO: Complete last edited
  return (
    <div className={styles.container}>
      <div className={styles.list_wrapper}>
        <ul className={styles.list}>
          <li onClick={handleDeleteNote} className={styles.list_item}>
            <FaTrashAlt size={`1.6rem`} />
            <p>Delete</p>
          </li>
          <li className={styles.list_item}>
            <>
              {!isFavorite && (
                <>
                  <TbStar size={`1.6rem`} />
                  <p>Add to Favorites</p>
                </>
              )}
              {isFavorite && (
                <>
                  <TbStarOff size={`1.6rem`} />
                  <p>Remove from Favorites</p>
                </>
              )}
            </>
          </li>
          <li className={styles.list_item}>
            <FaRegClone size={`1.6rem`} />
            <p>Duplicate</p>
          </li>
          <li className={styles.list_item}>
            <FaLink size={`1.6rem`} />
            <p>Copy Link</p>
          </li>
          <li className={styles.list_item}>
            <FaEdit size={`1.6rem`} />
            <p>Rename</p>
          </li>
        </ul>
      </div>
      <div className={styles.move_to_wrapper}>
        <div className={styles.move_to}>
          <TbArrowForwardUp size={`1.6rem`} />
          <p>Move to</p>
        </div>
      </div>
      <div className={styles.last_edit_wrapper}>
        <p className={styles.last_edit}>Last edited...</p>
      </div>
    </div>
  );
};

export default NavElementMenu;
