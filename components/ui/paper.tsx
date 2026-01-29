import { cssInterop } from 'nativewind';
import {
  Badge as PaperBadge,
  Button as PaperButton,
  Card as PaperCard,
  Chip as PaperChip,
  FAB as PaperFAB,
  HelperText as PaperHelperText,
  Surface as PaperSurface,
  Text as PaperText,
  TextInput as PaperTextInput,
} from 'react-native-paper';

export const Badge = cssInterop(PaperBadge, { className: 'style' });
export const Button = cssInterop(PaperButton, { className: 'style' });
export const Card = cssInterop(PaperCard, { className: 'style' });
export const Chip = cssInterop(PaperChip, { className: 'style' });
export const FAB = cssInterop(PaperFAB, { className: 'style' });
export const HelperText = cssInterop(PaperHelperText, { className: 'style' });
export const Surface = cssInterop(PaperSurface, { className: 'style' });
export const Text = cssInterop(PaperText, { className: 'style' });
export const TextInput = cssInterop(PaperTextInput, { className: 'style' });
