import { ReactElement, useRef } from 'react';
import styled from '@emotion/styled';

import { useListenClickOutsideArrayOfRef } from '@/ui/hooks/useListenClickOutsideArrayOfRef';
import { useScopedHotkeys } from '@/ui/hotkey/hooks/useScopedHotkeys';
import { overlayBackground } from '@/ui/themes/effects';

import { BoardCardFieldHotkeyScope } from '../types/BoardCardFieldHotkeyScope';

export const BoardCardFieldEditModeContainer = styled.div<
  Omit<OwnProps, 'onExit'>
>`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  display: flex;
  left: ${(props) =>
    props.editModeHorizontalAlign === 'right' ? 'auto' : '0'};
  margin-left: -2px;
  min-height: 100%;
  min-width: calc(100% + 20px);
  position: absolute;

  right: ${(props) =>
    props.editModeHorizontalAlign === 'right' ? '0' : 'auto'};
  top: ${(props) => (props.editModeVerticalPosition === 'over' ? '0' : '100%')};
  z-index: 1;
  ${overlayBackground}
`;

type OwnProps = {
  children: ReactElement;
  editModeHorizontalAlign?: 'left' | 'right';
  editModeVerticalPosition?: 'over' | 'below';
  onExit: () => void;
};

export function BoardCardEditableFieldEditMode({
  editModeHorizontalAlign,
  editModeVerticalPosition,
  children,
  onExit,
}: OwnProps) {
  const wrapperRef = useRef(null);

  useListenClickOutsideArrayOfRef({
    refs: [wrapperRef],
    callback: () => {
      onExit();
    },
  });

  useScopedHotkeys(
    'enter',
    () => {
      onExit();
    },
    BoardCardFieldHotkeyScope.BoardCardFieldEditMode,
    [onExit],
  );

  useScopedHotkeys(
    'esc',
    () => {
      onExit();
    },
    BoardCardFieldHotkeyScope.BoardCardFieldEditMode,
    [onExit],
  );

  return (
    <BoardCardFieldEditModeContainer
      data-testid="editable-cell-edit-mode-container"
      ref={wrapperRef}
      editModeHorizontalAlign={editModeHorizontalAlign}
      editModeVerticalPosition={editModeVerticalPosition}
    >
      {children}
    </BoardCardFieldEditModeContainer>
  );
}
