import React, { ReactNode, useState } from 'react';
import ErrorPage from '@/components/error/ErrorPage';

interface ErrorState {
  isError: boolean;
  code?: '401' | '404' | '500' | '204';
  title?: string;
  message?: string;
}

interface ErrorResult {
  error: true;
  component: ReactNode;
  resetError: () => void;
}

interface NoErrorResult {
  error: false;
  component?: undefined;
  handleUnauthorized: () => void;
  handleEmpty: (customMessage?: string) => void;
  resetError: () => void;
}

type ErrorHandlerResult = ErrorResult | NoErrorResult;

export const useErrorHandler = (): ErrorHandlerResult => {
  const [error, setError] = useState<ErrorState>({ isError: false });

  const handleUnauthorized = () => {
    setError({
      isError: true,
      code: '401',
      title: 'Unauthorized',
      message: '해당 페이지에 대한 권한이 없습니다.',
    });
  };

  const handleEmpty = (customMessage?: string) => {
    setError({
      isError: true,
      code: '204',
      title: 'Empty',
      message: customMessage || '값이 없습니다.',
    });
  };

  const resetError = () => {
    setError({ isError: false });
  };

  if (error.isError && error.code) {
    return {
      error: true,
      component: (
        <ErrorPage
          code={error.code}
          title={error.title || ''}
          message={error.message || ''}
          showHomeButton={error.code !== '204'}
        />
      ),
      resetError,
    };
  }

  return {
    error: false,
    handleUnauthorized,
    handleEmpty,
    resetError,
  };
};

export default useErrorHandler;
