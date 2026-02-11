import { Button } from '@/components/ui/paper';

type AttendanceQuickActionsProps = {
  buttonBorderColor: string;
  onViewYearTotals: () => void;
  onViewSummary: () => void;
};

export function AttendanceQuickActions({
  buttonBorderColor,
  onViewYearTotals,
  onViewSummary,
}: AttendanceQuickActionsProps) {
  return (
    <>
      <Button
        mode="outlined"
        onPress={onViewYearTotals}
        className="rounded-xl mb-2"
        style={{ borderColor: buttonBorderColor }}
      >
        View Year Totals
      </Button>
      <Button
        mode="outlined"
        onPress={onViewSummary}
        className="rounded-xl"
        style={{ borderColor: buttonBorderColor }}
      >
        View Full Summary
      </Button>
    </>
  );
}
