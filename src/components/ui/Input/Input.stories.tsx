import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { PasswordInput } from './PasswordInput';

const meta: Meta<typeof Input> = {
  title: 'Design System/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '이메일을 입력하세요',
    label: 'email',
  },
};

export const Password: Story = {
  render: (args) => (
    <PasswordInput
      {...args}
      label="password"
      placeholder="비밀번호를 입력하세요"
    />
  ),
};
