import { Link, useOutletContext } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './form/Button';
import SelectDelete from './form/SelectDelete';
import { ROUTES } from '../utils/static';
import { userSelect } from '../store/auth/authSelector';

function HostMode({ setPageFromURL, hosts }) {
  const user = useSelector(userSelect);
  const { hostId, setHostId } = useOutletContext();
  const setHost = (id) => {
    setPageFromURL(1);
    setHostId(id);
  };

  const resetGuestId = () => {
    setPageFromURL(1);
    setHostId(null);
  };
  return (
    <div className="container justify-content-end p-3 mt-4 ">
      {user && hostId && hostId !== user.id ? (
        <div className="d-flex justify-content-end">
          <Button
            text="Exit guest mode"
            classButton="btn btn-outline-primary"
            onClick={resetGuestId}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-end">
          <SelectDelete hosts={hosts} setHost={setHost} />
          <Link className="btn btn-primary ms-2" to={ROUTES.GUEST}>
            Your guests / Invite guests
          </Link>
        </div>
      )}
    </div>
  );
}
HostMode.propTypes = {
  setPageFromURL: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  hosts: PropTypes.array.isRequired,
};
export default HostMode;
