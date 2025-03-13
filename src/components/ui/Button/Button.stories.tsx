import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F2F3F5' },
        { name: 'surface', value: '#FFFFFF' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '확인',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '취소',
  },
};

export const Third: Story = {
  args: {
    variant: 'third',
    children: '강조',
  },
};

// 모든 크기 비교
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Button size="sm">Small 버튼</Button>
      <Button size="md">Medium 버튼</Button>
      <Button size="lg">Large 버튼</Button>
    </div>
  ),
};

// 모든 변형 비교
export const AllVariants: Story = {
  render: () => (
    <div className="space-x-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="third">Third</Button>
    </div>
  ),
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => (
    <div className="space-x-4">
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="third" disabled>
        Third
      </Button>
    </div>
  ),
};
