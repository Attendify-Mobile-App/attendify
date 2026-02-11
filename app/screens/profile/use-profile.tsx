import { useRouter } from 'expo-router';

import { LOGIN_SCREEN, RESET_PASSWORD_SCREEN } from '@/constants/navigation/path';
import { useThemePreference } from '@/context/theme-preference-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

export function useProfileLogic() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { preference, setPreference } = useThemePreference();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const buttonBorderColor = useThemeColor({ dark: '#37C8C3', light: '#37C8C3' }, 'tint');

  const handleLogout = () => {
    dispatch(logout());
    router.replace(LOGIN_SCREEN);
  };

  return {
    user,
    preference,
    setPreference,
    backgroundColor,
    textColor,
    buttonBorderColor,
    goToResetPassword: () => router.push(RESET_PASSWORD_SCREEN),
    handleLogout,
  };
}
