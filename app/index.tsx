import { Redirect } from 'expo-router';
import { LOGIN_SCREEN, SELECT_CLASS_SCREEN } from '@/constants/navigation/path';
import { useAppSelector } from '@/store/hooks';

export default function Index() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  return <Redirect href={accessToken ? SELECT_CLASS_SCREEN : LOGIN_SCREEN} />;
}
