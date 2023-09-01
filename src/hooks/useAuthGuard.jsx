import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ROUTES from '../utils/static';
import userSelect from '../store/auth/authSelector';

function useAuthGuard(authProtection) {
  const user = useSelector(userSelect);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && authProtection) {
      navigate(ROUTES.LOGIN);
    } else if (user && !authProtection) {
      navigate(ROUTES.EXPENSES);
    }
  }, [user]);
}

export default useAuthGuard;
