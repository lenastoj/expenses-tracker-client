import { Link, useOutletContext } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './form/Button';
import SelectDelete from './form/SelectDelete';
import { ROUTES } from '../utils/static';
import { userSelect } from '../store/auth/authSelector';

function GuestMode({ setGuestName, setPageFromURL, guests }) {
  const user = useSelector(userSelect);
  const { guestId, setGuestId } = useOutletContext();
  const setGuest = (id, name) => {
    setPageFromURL(1);
    setGuestId(id);
    setGuestName(name);
  };

  const resetGuestId = () => {
    setPageFromURL(1);
    setGuestId(null);
    setGuestName(null);
  };
  return (
    <div className="container justify-content-end p-3 mt-4 ">
      {user && guestId && guestId !== user.id ? (
        <div className="d-flex justify-content-end">
          <Button
            text="Exit guest mode"
            classButton="btn btn-outline-primary"
            onClick={resetGuestId}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-end">
          <SelectDelete guests={guests} setGuest={setGuest} />
          <Link className="btn btn-primary ms-2" to={ROUTES.GUEST}>
            Invite guests
          </Link>
        </div>
      )}
    </div>
  );
}
GuestMode.propTypes = {
  setGuestName: PropTypes.func.isRequired,
  setPageFromURL: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  guests: PropTypes.array.isRequired,
};
export default GuestMode;
