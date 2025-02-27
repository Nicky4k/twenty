import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '@/ui/button/components/Button';
import { IconFileUpload, IconTrash, IconUpload } from '@/ui/icon';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Picture = styled.button<{ withPicture: boolean }>`
  align-items: center;
  background: ${({ theme, disabled }) =>
    disabled ? theme.background.secondary : theme.background.tertiary};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.light};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  height: 66px;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  transition: background 0.1s ease;

  width: 66px;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  ${({ theme, withPicture, disabled }) => {
    if (withPicture || disabled) {
      return '';
    }

    return `
      &:hover {
        background: ${theme.background.quaternary};
      }
    `;
  }};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-left: ${({ theme }) => theme.spacing(4)};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  > * + * {
    margin-left: ${({ theme }) => theme.spacing(2)};
  }
`;

const Text = styled.span`
  color: ${({ theme }) => theme.font.color.light};
  font-size: ${({ theme }) => theme.font.size.xs};
`;

const StyledHiddenFileInput = styled.input`
  display: none;
`;

type Props = Omit<React.ComponentProps<'div'>, 'children'> & {
  picture: string | null | undefined;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
  disabled?: boolean;
};

export function ImageInput({
  picture,
  onUpload,
  onRemove,
  disabled = false,
  ...restProps
}: Props) {
  const theme = useTheme();
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const onUploadButtonClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <Container {...restProps}>
      <Picture
        withPicture={!!picture}
        disabled={disabled}
        onClick={onUploadButtonClick}
      >
        {picture ? (
          <img
            src={picture || '/images/default-profile-picture.png'}
            alt="profile"
          />
        ) : (
          <IconFileUpload size={theme.icon.size.md} />
        )}
      </Picture>
      <Content>
        <ButtonContainer>
          <StyledHiddenFileInput
            type="file"
            ref={hiddenFileInput}
            onChange={(event) => {
              if (onUpload) {
                if (event.target.files) {
                  onUpload(event.target.files[0]);
                }
              }
            }}
          />
          <Button
            icon={<IconUpload size={theme.icon.size.sm} />}
            onClick={onUploadButtonClick}
            variant="secondary"
            title="Upload"
            disabled={disabled}
            fullWidth
          />
          <Button
            icon={<IconTrash size={theme.icon.size.sm} />}
            onClick={onRemove}
            variant="secondary"
            title="Remove"
            disabled={!picture || disabled}
            fullWidth
          />
        </ButtonContainer>
        <Text>
          We support your best PNGs, JPEGs and GIFs portraits under 10MB
        </Text>
      </Content>
    </Container>
  );
}
