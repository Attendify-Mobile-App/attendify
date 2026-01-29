import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Text } from '@/components/ui/paper';
import { useThemeColor } from '@/hooks/use-theme-color';

type DropdownItem = { label: string; value: string };

type DropdownPickerFieldProps = {
  label: string;
  open: boolean;
  value: string;
  items: DropdownItem[];
  onOpenChange: (nextOpen: boolean) => void;
  onValueChange: (nextValue: string) => void;
  setItems: (items: DropdownItem[]) => void;
  placeholder: string;
  searchPlaceholder: string;
  zIndex: number;
  zIndexInverse: number;
  dropDownDirection?: 'AUTO' | 'TOP' | 'BOTTOM';
  listMode?: 'SCROLLVIEW' | 'MODAL' | 'FLATLIST';
  modalTitle?: string;
  modalContentContainerStyle?: StyleProp<ViewStyle>;
};

export function DropdownPickerField({
  label,
  open,
  value,
  items,
  onOpenChange,
  onValueChange,
  setItems,
  placeholder,
  searchPlaceholder,
  zIndex,
  zIndexInverse,
  dropDownDirection = 'AUTO',
  listMode = 'SCROLLVIEW',
  modalTitle,
  modalContentContainerStyle,
}: DropdownPickerFieldProps) {
  const activeZIndex = open ? 5000 + zIndex : zIndex;
  const fieldBackground = useThemeColor({ light: '#F8FAFC', dark: '#151A1E' }, 'background');
  const fieldBorder = useThemeColor({ light: '#E2E8F0', dark: '#1F2428' }, 'background');
  const placeholderColor = useThemeColor({ light: '#94A3B8', dark: '#64748B' }, 'text');
  const valueColor = useThemeColor({ light: '#0F172A', dark: '#E2E8F0' }, 'text');
  const labelColor = useThemeColor({ light: '#475569', dark: '#CBD5E1' }, 'text');

  const defaultModalContentStyle = useMemo(
    () => ({
      marginHorizontal: 20,
      marginVertical: 120,
      backgroundColor: fieldBackground,
      borderRadius: 18,
      padding: 12,
    }),
    [fieldBackground]
  );

  const pickerSharedProps = useMemo(
    () => ({
      listMode,
      maxHeight: 220,
      style: {
        backgroundColor: fieldBackground,
        borderColor: fieldBorder,
        borderWidth: 1,
        borderRadius: 16,
        minHeight: 48,
      },
      dropDownContainerStyle: {
        backgroundColor: fieldBackground,
        borderColor: fieldBorder,
        borderWidth: 1,
        borderRadius: 16,
        zIndex: activeZIndex,
        elevation: open ? 12 : 0,
      },
      textStyle: { color: valueColor },
      labelStyle: { color: valueColor },
      placeholderStyle: { color: placeholderColor },
      searchTextInputStyle: {
        borderColor: fieldBorder,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        color: valueColor,
      },
      modalTitle,
      modalContentContainerStyle:
        listMode === 'MODAL' ? (modalContentContainerStyle ?? defaultModalContentStyle) : undefined,
      modalAnimationType: listMode === 'MODAL' ? 'fade' : undefined,
      modalProps: listMode === 'MODAL' ? { transparent: true } : undefined,
    }),
    [
      activeZIndex,
      defaultModalContentStyle,
      fieldBackground,
      fieldBorder,
      listMode,
      modalContentContainerStyle,
      modalTitle,
      open,
      placeholderColor,
      valueColor,
    ]
  );

  return (
    <View className="mb-4" style={{ zIndex: activeZIndex, elevation: open ? 12 : 0 }}>
      <Text variant="labelMedium" className="mb-2" style={{ color: labelColor }}>
        {label}
      </Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={(nextOpen) => {
          const resolved = typeof nextOpen === 'function' ? nextOpen(open) : nextOpen;
          onOpenChange(resolved);
        }}
        setValue={(callback) => {
          const nextValue = typeof callback === 'function' ? callback(value || null) : callback;
          onValueChange(nextValue ?? '');
        }}
        setItems={setItems}
        placeholder={placeholder}
        searchable
        searchPlaceholder={searchPlaceholder}
        dropDownDirection={dropDownDirection}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        {...pickerSharedProps}
      />
    </View>
  );
}
