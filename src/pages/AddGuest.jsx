import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAuthGuard from '../hooks/useAuthGuard';
import Input from '../components/form/Input';
import Button from '../components/form/Button';
import GuestService from '../services/guest.service';
import { ROUTES } from '../utils/static';
import { getActiveUser } from '../store/auth/authSlice';

function AddGuest() {
  useAuthGuard(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
  } = useForm();

  const handleInvite = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    try {
      await GuestService.addGuest(formData);
    } catch (error) {
      const errorData = error.response.data;
      if (errorData) {
        Object.keys(errorData).forEach((field) => {
          setError(field, { message: errorData[field] });
        });
      }
    }
  });

  if (isSubmitSuccessful) {
    dispatch(getActiveUser());
    navigate(`${ROUTES.EXPENSES}?page=1`);
  }
  return (
    <div className="container p-3 mb-3 mt-5 w-50">
      <div className="card p-3">
        <h3 className="my-0 mr-md-auto font-weight-normal pb-3">
          Invite other users to see your expenses
        </h3>
        <form className="p-20" onSubmit={handleInvite}>
          <Input
            name="email"
            id="email"
            label="Insert email of the user you want to invite:"
            type="email"
            rules={{ required: 'Email is required' }}
            register={register}
            errors={errors}
            placeholder="email..."
          />
          <Button text="Invite" />
          <Link to={ROUTES.EXPENSES} className="ms-3 btn btn-outline-primary">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AddGuest;
