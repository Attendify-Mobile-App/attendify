import { cssInterop } from 'nativewind';
import {
  Badge as PaperBadge,
  Button as PaperButton,
  Card as PaperCard,
  Chip as PaperChip,
  Divider as PaperDivider,
  FAB as PaperFAB,
  HelperText as PaperHelperText,
  Menu as PaperMenu,
  Surface as PaperSurface,
  Text as PaperText,
  TextInput as PaperTextInput,
} from 'react-native-paper';

export const Badge = cssInterop(PaperBadge, { className: 'style' });
export const Button = cssInterop(PaperButton, { className: 'style' });
export const Card = cssInterop(PaperCard, { className: 'style' });
export const Chip = cssInterop(PaperChip, { className: 'style' });
export const Divider = cssInterop(PaperDivider, { className: 'style' });
export const FAB = cssInterop(PaperFAB, { className: 'style' });
export const HelperText = cssInterop(PaperHelperText, { className: 'style' });
export const Menu = Object.assign(cssInterop(PaperMenu, { className: 'style' }), {
  Item: cssInterop(PaperMenu.Item, { className: 'style' }),
});
export const Surface = cssInterop(PaperSurface, { className: 'style' });
export const Text = cssInterop(PaperText, { className: 'style' });
export const TextInput = cssInterop(PaperTextInput, { className: 'style' });
