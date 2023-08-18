import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseService from '../../services/expense.service';
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import Button from '../form/Button';
import ROUTES from '../../utils/static';
import { expenseSelect } from '../../store/expense/expenseSelector';
import { getExpense } from '../../store/expense/expenseSlice';

function ExpenseForm() {
  const { id } = useParams();
  const expense = useSelector(expenseSelect);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getExpense(id));
    }
  }, []);

  useEffect(() => {
    if (expense && id) {
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
      if (id) {
        await ExpenseService.edit(id, formData);
        navigate(ROUTES.EXPENSES);
      } else {
        await ExpenseService.create(formData);
        reset();
      }
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
        {id ? 'Edit expense' : 'Add new expense'}
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
          step={0.01}
          placeholder="0.00"
          pattern="^\d*(\.\d{0,2})?$"
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
              {id
                ? 'You successfully edited an expense!'
                : 'You successfully added an expense!'}
            </p>
          </div>
        )}
        <div className="d-flex justify-content-between">
          {id ? <Button text="Edit" /> : <Button />}
          <Button
            type="button"
            text="Back to list"
            classButton="btn-outline-primary"
            onClick={() => navigate(ROUTES.EXPENSES)}
          />
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
