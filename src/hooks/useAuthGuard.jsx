import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { ROUTES } from '../utils/static';

function useAuthGuard(authProtection) {
  const navigate = useNavigate();
  const cookie = Cookies.get('login');
  useEffect(() => {
    if (!cookie && authProtection) {
      navigate(ROUTES.LOGIN);
    } else if (cookie && !authProtection) {
      navigate(ROUTES.EXPENSES);
    }
  }, [cookie]);
}

export default useAuthGuard;
