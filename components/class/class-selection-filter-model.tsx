import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton, Modal, Portal } from 'react-native-paper';

import { Button, Card, Divider, Text } from '@/components/ui/paper';
import { useThemeColor } from '@/hooks/use-theme-color';
import { DropdownPickerField } from '@/components/ui/dropdown-picker-field';

type DistinctValues = {
  schoolNames: string[];
  years: string[];
  classNames: string[];
  divisions: string[];
};

type ClassSelectionFilterModalProps = {
  visible: boolean;
  onDismiss: () => void;
  filterSchoolName: string;
  setFilterSchoolName: (value: string) => void;
  filterYear: string;
  setFilterYear: (value: string) => void;
  filterClassName: string;
  setFilterClassName: (value: string) => void;
  filterDivision: string;
  setFilterDivision: (value: string) => void;
  distinctValues: DistinctValues;
};

export function ClassSelectionFilterModal({
  visible,
  onDismiss,
  filterSchoolName,
  setFilterSchoolName,
  filterYear,
  setFilterYear,
  filterClassName,
  setFilterClassName,
  filterDivision,
  setFilterDivision,
  distinctValues,
}: ClassSelectionFilterModalProps) {
  const insets = useSafeAreaInsets();
  const labelColor = useThemeColor({ light: '#475569', dark: '#CBD5E1' }, 'text');

  const [schoolOpen, setSchoolOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [classOpen, setClassOpen] = useState(false);
  const [divisionOpen, setDivisionOpen] = useState(false);

  const [schoolItems, setSchoolItems] = useState<{ label: string; value: string }[]>([]);
  const [yearItems, setYearItems] = useState<{ label: string; value: string }[]>([]);
  const [classItems, setClassItems] = useState<{ label: string; value: string }[]>([]);
  const [divisionItems, setDivisionItems] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    setSchoolItems([
      { label: 'All Schools', value: '' },
      ...distinctValues.schoolNames.map((value) => ({ label: value, value })),
    ]);
  }, [distinctValues.schoolNames]);

  useEffect(() => {
    setYearItems([
      { label: 'All Years', value: '' },
      ...distinctValues.years.map((value) => ({ label: value, value })),
    ]);
  }, [distinctValues.years]);

  useEffect(() => {
    setClassItems([
      { label: 'All Classes', value: '' },
      ...distinctValues.classNames.map((value) => ({ label: value, value })),
    ]);
  }, [distinctValues.classNames]);

  useEffect(() => {
    setDivisionItems([
      { label: 'All Divisions', value: '' },
      ...distinctValues.divisions.map((value) => ({ label: value, value })),
    ]);
  }, [distinctValues.divisions]);

  const clearFilters = () => {
    setFilterSchoolName('');
    setFilterYear('');
    setFilterClassName('');
    setFilterDivision('');
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          marginHorizontal: 20,
          marginTop: insets.top + 24,
          marginBottom: insets.bottom + 24,
        }}
      >
        <Card className="rounded-2xl">
          <ScrollView
            contentContainerStyle={{ padding: 20, paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row items-start justify-between">
              <Text variant="titleLarge" className="font-semibold">
                Filter Classes
              </Text>
              <IconButton icon="close" size={20} onPress={onDismiss} />
            </View>
            <Text variant="bodySmall" className="mt-1" style={{ color: labelColor }}>
              Refine the list to find the right class.
            </Text>

            <Divider className="my-4" />

            <DropdownPickerField
              label="School"
              leftIconName="school-outline"
              open={schoolOpen}
              value={filterSchoolName}
              items={schoolItems}
              onOpenChange={(nextOpen) => {
                setSchoolOpen(nextOpen);
                if (nextOpen) {
                  setYearOpen(false);
                  setClassOpen(false);
                  setDivisionOpen(false);
                }
              }}
              onValueChange={setFilterSchoolName}
              setItems={setSchoolItems}
              placeholder="Select School Name"
              searchPlaceholder="Search school..."
              zIndex={4000}
              zIndexInverse={1000}
              listMode="MODAL"
              modalTitle="Select School"
            />

            <DropdownPickerField
              label="Academic Year"
              leftIconName="calendar-month-outline"
              open={yearOpen}
              value={filterYear}
              items={yearItems}
              onOpenChange={(nextOpen) => {
                setYearOpen(nextOpen);
                if (nextOpen) {
                  setSchoolOpen(false);
                  setClassOpen(false);
                  setDivisionOpen(false);
                }
              }}
              onValueChange={setFilterYear}
              setItems={setYearItems}
              placeholder="Select Academic Year"
              searchPlaceholder="Search year..."
              zIndex={3000}
              zIndexInverse={2000}
              listMode="MODAL"
              modalTitle="Select Academic Year"
            />

            <DropdownPickerField
              label="Class"
              leftIconName="google-classroom"
              open={classOpen}
              value={filterClassName}
              items={classItems}
              onOpenChange={(nextOpen) => {
                setClassOpen(nextOpen);
                if (nextOpen) {
                  setSchoolOpen(false);
                  setYearOpen(false);
                  setDivisionOpen(false);
                }
              }}
              onValueChange={setFilterClassName}
              setItems={setClassItems}
              placeholder="Select Class"
              searchPlaceholder="Search class..."
              zIndex={2000}
              zIndexInverse={3000}
              listMode="MODAL"
              modalTitle="Select Class"
            />

            <DropdownPickerField
              label="Division"
              leftIconName="view-grid-outline"
              open={divisionOpen}
              value={filterDivision}
              items={divisionItems}
              onOpenChange={(nextOpen) => {
                setDivisionOpen(nextOpen);
                if (nextOpen) {
                  setSchoolOpen(false);
                  setYearOpen(false);
                  setClassOpen(false);
                }
              }}
              onValueChange={setFilterDivision}
              setItems={setDivisionItems}
              placeholder="Select Division"
              searchPlaceholder="Search division..."
              zIndex={1000}
              zIndexInverse={4000}
              listMode="MODAL"
              modalTitle="Select Division"
            />


            <View className="flex-row items-center justify-between mt-10">
              <Button mode="text" onPress={clearFilters}>
                Clear All
              </Button>
              <Button mode="contained" onPress={onDismiss} className="rounded-xl">
                Apply Filters
              </Button>
            </View>
          </ScrollView>
        </Card>
      </Modal>
    </Portal>
  );
}
