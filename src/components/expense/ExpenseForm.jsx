import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import Button from '../form/Button';
// import ROUTES from '../../utils/static';

function ExpenseForm({ expense, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm();

  useEffect(() => {
    if (expense) {
      reset(expense);
    }
  }, [expense]);

  const formSubmitHandler = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('date', data.date);
    formData.append('time', data.time);
    formData.append('description', data.description);
    formData.append('amount', data.amount);
    formData.append('comment', data.comment);
    try {
      await onSubmit(formData);
      if (!expense) reset();
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
    <div className="container card p-3 mb-3 mt-5">
      <h2 className="my-0 mr-md-auto font-weight-normal pb-3">
        {expense ? 'Edit expense' : 'Add new expense'}
      </h2>
      <form className="p-20" onSubmit={formSubmitHandler}>
        <Input
          name="date"
          rules={{ required: 'Date is required' }}
          id="date"
          label="Date"
          type="date"
          register={register}
          errors={errors}
        />
        <Input
          name="time"
          id="time"
          label="Time"
          type="time"
          register={register}
          step={1}
          errors={errors}
        />
        <Textarea
          name="description"
          id="description"
          label="Description"
          register={register}
          rules={{ required: 'Description is required' }}
          rows={5}
          placeholder="Expense description..."
          errors={errors}
        />
        <Input
          name="amount"
          rules={{ required: 'Amount is required' }}
          id="amount"
          label="Spent amount"
          type="number"
          register={register}
          min={0}
          step={0.1}
          placeholder="0.0"
          errors={errors}
        />
        <Textarea
          name="comment"
          id="comment"
          label="Comment"
          register={register}
          rows={3}
          placeholder="Comment..."
          errors={errors}
        />
        {isSubmitSuccessful && (
          <div className="alert alert-success mt-3" role="alert">
            <p>
              {expense
                ? 'You successfully edited an expense!'
                : 'You successfully added an expense!'}
            </p>
          </div>
        )}
        <div className="d-flex justify-content-between">
          {expense ? <Button text="Edit" /> : <Button />}
          <Link to="..">Back to list</Link>
        </div>
      </form>
    </div>
  );
}

ExpenseForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  expense: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  expense: undefined,
};

export default ExpenseForm;
