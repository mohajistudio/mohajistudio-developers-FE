'use client';

import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/Button/Button';

export interface ToastProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description?: string;
}

export const Toast = ({ type, title, description }: ToastProps) => {
  const { showToast } = useToast();

  const handleShowToast = () => {
    showToast(type, { title, description });
  };

  // 기존 Button 컴포넌트의 variant 타입에 맞게 매핑
  const getButtonVariant = () => {
    switch (type) {
      case 'success':
      case 'info':
        return 'primary';
      case 'warning':
        return 'third';
      case 'error':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <Button onClick={handleShowToast} variant={getButtonVariant()}>
      {type.charAt(0).toUpperCase() + type.slice(1)} 토스트 보기
    </Button>
  );
};
