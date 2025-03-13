import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { ToastProvider } from '@/contexts/ToastContext';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    type: 'success',
    title: '성공 메시지입니다.',
    description:
      '회원가입이 정상적으로 처리되었습니다.\n모하지 스튜디오에 오신 것을 환영합니다!',
  },
};

export const SuccessWithoutDescription: Story = {
  args: {
    type: 'success',
    title: '성공 메시지입니다.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: '주의 메시지입니다.',
    description:
      '마지막으로 비밀번호를 변경한 시점이 오래되었습니다.\n새로운 비밀번호를 설정해주세요!',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: '경고 메시지입니다.',
    description: '오류로 인해 로그인에 실패하였습니다!\n다시 시도해주세요.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: '정보 메시지입니다.',
    description:
      '최근 업데이트에 게시물에 댓글이 추가되었습니다.\n확인해보세요!',
  },
};

export const AllToasts: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Toast
        type="success"
        title="성공 메시지입니다."
        description="회원가입이 정상적으로 처리되었습니다."
      />
      <Toast
        type="warning"
        title="주의 메시지입니다."
        description="비밀번호를 변경한 시점이 오래되었습니다."
      />
      <Toast
        type="error"
        title="경고 메시지입니다."
        description="로그인에 실패하였습니다!"
      />
      <Toast
        type="info"
        title="정보 메시지입니다."
        description="게시물에 댓글이 추가되었습니다."
      />
    </div>
  ),
};
