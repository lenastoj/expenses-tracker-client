import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../components/form/Input';
import Button from '../components/form/Button';
import ROUTES from '../utils/static';
import AuthService from '../services/auth.service';
import { getActiveUser } from '../store/auth/authSlice';
import useAuthGuard from '../hooks/useAuthGuard';

function Login() {
  useAuthGuard(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
  } = useForm();

  const loginHandler = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    try {
      await AuthService.login(formData);
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
    <div className="container p-3 mb-3 mt-5">
      <div className="card p-3">
        <h3 className="my-0 mr-md-auto font-weight-normal pb-3">Login</h3>
        <form className="p-20" onSubmit={loginHandler}>
          <Input
            name="email"
            id="email"
            label="Email"
            type="email"
            rules={{ required: 'Email is required' }}
            register={register}
            errors={errors}
          />
          <Input
            name="password"
            id="password"
            label="Password"
            type="password"
            rules={{ required: 'Password is required' }}
            register={register}
            errors={errors}
          />
          <Button />
        </form>
      </div>
    </div>
  );
}

export default Login;
