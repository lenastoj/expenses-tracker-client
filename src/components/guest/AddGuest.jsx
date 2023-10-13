import { Link } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Input from '../form/Input';
import Button from '../form/Button';
import { ROUTES } from '../../utils/static';
import guestService from '../../services/guest.service';
import { getGuests } from '../../store/auth/authSlice';

function AddGuest() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const handleInvite = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    try {
      await guestService.addGuest(formData);
      dispatch(getGuests({ page: 1 }));
      reset();
    } catch (error) {
      const errorData = error.response.data;
      if (errorData) {
        Object.keys(errorData).forEach((field) => {
          setError(field, { message: errorData[field] });
        });
      }
    }
  });
  return (
    <div className="border-bottom p-3 bg-body-tertiary rounded-top">
      <h4 className="my-0 mr-md-auto font-weight-normal pb-3">
        Invite other users to see your expenses
      </h4>
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
  );
}
export default AddGuest;
