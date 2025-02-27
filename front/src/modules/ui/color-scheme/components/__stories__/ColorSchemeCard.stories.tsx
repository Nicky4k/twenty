import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';

import { ComponentDecorator } from '~/testing/decorators';

import { ColorSchemeCard } from '../ColorSchemeCard';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  > * + * {
    margin-left: ${({ theme }) => theme.spacing(4)};
  }
`;

const meta: Meta<typeof ColorSchemeCard> = {
  title: 'UI/ColorScheme/ColorSchemeCard',
  component: ColorSchemeCard,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
    ComponentDecorator,
  ],
  argTypes: {
    variant: { control: false },
  },
  args: { selected: false },
};

export default meta;
type Story = StoryObj<typeof ColorSchemeCard>;

export const Default: Story = {
  render: (args) => (
    <>
      <ColorSchemeCard variant="light" selected={args.selected} />
      <ColorSchemeCard variant="dark" selected={args.selected} />
      <ColorSchemeCard variant="system" selected={args.selected} />
    </>
  ),
};

export const Selected: Story = {
  ...Default,
  args: { selected: true },
};
