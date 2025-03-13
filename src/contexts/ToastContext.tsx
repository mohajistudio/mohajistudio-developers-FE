'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

// 토스트 타입 정의
type ToastType = 'success' | 'warning' | 'error' | 'info';

// 토스트 메시지 인터페이스
interface ToastMessage {
  title: string;
  description?: string;
}

// 토스트 컨텍스트 인터페이스
interface ToastContextType {
  showToast: (type: ToastType, message: ToastMessage) => void;
}

// 토스트 컨텍스트 생성
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Success 토스트 컴포넌트
const SuccessToast = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="toast-container">
      <div className="toast-content">
        <Image
          src="/icon/toast/Success.svg"
          width={24}
          height={24}
          alt=""
          className="toast-icon-direct"
        />
        <div className="toast-text">
          <h4 className="toast-title">{title}</h4>
          {description && <p className="toast-description">{description}</p>}
        </div>
      </div>
    </div>
  );
};

// Warning 토스트 컴포넌트
const WarningToast = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="toast-container">
      <div className="toast-content">
        <Image
          src="/icon/toast/Warning.svg"
          width={24}
          height={24}
          alt=""
          className="toast-icon-direct"
        />
        <div className="toast-text">
          <h4 className="toast-title">{title}</h4>
          {description && <p className="toast-description">{description}</p>}
        </div>
      </div>
    </div>
  );
};

// Error 토스트 컴포넌트
const ErrorToast = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="toast-container">
      <div className="toast-content">
        <Image
          src="/icon/toast/Danger.svg"
          width={24}
          height={24}
          alt=""
          className="toast-icon-direct"
        />
        <div className="toast-text">
          <h4 className="toast-title">{title}</h4>
          {description && <p className="toast-description">{description}</p>}
        </div>
      </div>
    </div>
  );
};

// Info 토스트 컴포넌트
const InfoToast = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="toast-container">
      <div className="toast-content">
        <Image
          src="/icon/toast/Info.svg"
          width={24}
          height={24}
          alt=""
          className="toast-icon-direct"
        />
        <div className="toast-text">
          <h4 className="toast-title">{title}</h4>
          {description && <p className="toast-description">{description}</p>}
        </div>
      </div>
    </div>
  );
};

// 토스트 컨텐츠 컴포넌트
const ToastContent = ({
  type,
  title,
  description,
}: {
  type: ToastType;
  title: string;
  description?: string;
}) => {
  switch (type) {
    case 'success':
      return <SuccessToast title={title} description={description} />;
    case 'warning':
      return <WarningToast title={title} description={description} />;
    case 'error':
      return <ErrorToast title={title} description={description} />;
    case 'info':
      return <InfoToast title={title} description={description} />;
    default:
      return <SuccessToast title={title} description={description} />;
  }
};

// 토스트 프로바이더 컴포넌트
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  // 토스트 표시 함수
  const showToast = (type: ToastType, { title, description }: ToastMessage) => {
    // 타입에 따른 색상 설정
    const progressColors = {
      success: '#4caf50',
      warning: '#FFC107',
      error: '#F44336',
      info: '#2196F3',
    };

    // 토스트 옵션
    const toastOptions: ToastOptions = {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0,
        margin: 0,
        width: '392px',
      },
      bodyStyle: {
        padding: 0,
        margin: 0,
      },
      progressStyle: {
        background: progressColors[type], // 타입에 따른 프로그레스 바 색상
        height: '3px',
      },
      icon: false,
    };

    // 토스트 표시
    toast(
      <ToastContent type={type} title={title} description={description} />,
      toastOptions,
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        closeButton={({ closeToast }) => (
          <button onClick={closeToast} className="toast-close-button">
            <Image
              src="/icon/toast/Close.svg"
              width={24}
              height={24}
              alt="닫기"
            />
          </button>
        )}
      />
    </ToastContext.Provider>
  );
};

// 토스트 훅
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
