import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/paper';
import { useThemeColor } from '@/hooks/use-theme-color';

type FooterTab = {
  key: 'attendance' | 'summary' | 'profile';
  label: string;
  href: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  isActive: (pathname: string) => boolean;
};

const FOOTER_TABS: FooterTab[] = [
  {
    key: 'attendance',
    label: 'Attendance',
    href: '/screens/class/select-class/select-class',
    icon: 'calendar-check',
    isActive: (pathname) =>
      pathname.startsWith('/screens/class') ||
      pathname === '/attendance' ||
      pathname === '/students' ||
      pathname === '/year-total',
  },
  {
    key: 'summary',
    label: 'Summary',
    href: '/summary',
    icon: 'chart-bar',
    isActive: (pathname) => pathname === '/summary',
  },
  {
    key: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: 'account-circle',
    isActive: (pathname) => pathname === '/profile',
  },
];

export function FooterTabs() {
  const pathname = usePathname() ?? '';
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'icon');
  const activeColor = useThemeColor({}, 'tabIconSelected');
  const inactiveColor = useThemeColor({}, 'tabIconDefault');

  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor }}>
      <View
        className="flex-row items-center justify-around px-4 pt-2"
        style={{ borderTopWidth: 1, borderTopColor: borderColor }}
      >
        {FOOTER_TABS.map((tab) => {
          const isActive = tab.isActive(pathname);
          const color = isActive ? activeColor : inactiveColor;
          return (
            <Link key={tab.key} href={tab.href} asChild>
              <Pressable
                className="flex-1 items-center py-2"
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <MaterialCommunityIcons name={tab.icon} size={22} color={color} />
                <Text variant="labelSmall" className="mt-1" style={{ color }}>
                  {tab.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
