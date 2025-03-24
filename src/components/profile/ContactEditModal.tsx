'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Contact as ContactType } from '@/types/blog';
import {
  getContactTypes,
  ContactType as ContactTypeAPI,
} from '@/apis/contact-types';

interface ContactEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contacts: ContactType[]) => void;
  initialContacts?: ContactType[];
}

interface ContactItemData {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  url: string;
  checked: boolean;
}

// 사용 가능한 아이콘 목록
const AVAILABLE_ICONS = [
  { id: 'github', name: 'Github', path: '/icon/Github.svg' },
  { id: 'email', name: 'Email', path: '/icon/Email.svg' },
  { id: 'tistory', name: 'Tistory', path: '/icon/Tistory.svg' },
  { id: 'blog', name: 'Blog', path: '/icon/Blog.svg' },
];

export default function ContactEditModal({
  isOpen,
  onClose,
  onSave,
  initialContacts = [],
}: ContactEditModalProps) {
  const [contacts, setContacts] = useState<ContactItemData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customContacts, setCustomContacts] = useState<ContactItemData[]>([]);
  const [showIconSelector, setShowIconSelector] = useState<string | null>(null);

  const iconSelectorStyle = {
    position: 'absolute' as const,
    left: '-20px',
    top: '40px',
    background: '#FCFCFC',
    borderRadius: '20px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #E4E6EB',
    zIndex: 10,
    width: '136px',
    height: '40px',
  };

  const arrowStyle = {
    top: '-8px',
    left: '28px',
    filter: 'drop-shadow(0 -1px 1px rgba(0,0,0,0.1))',
  };

  // 이미지 선택기 ref
  const iconSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadContactTypes();
      setCustomContacts([]);
      setShowIconSelector(null);
    }
  }, [isOpen, initialContacts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        iconSelectorRef.current &&
        !iconSelectorRef.current.contains(event.target as Node) &&
        showIconSelector !== null
      ) {
        setShowIconSelector(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showIconSelector]);

  // 연락처 유형 및 기존 데이터 로드
  const loadContactTypes = async () => {
    setIsLoading(true);
    try {
      const contactTypes = await getContactTypes();

      // 기존 연락처 데이터와 유형 정보 결합
      const contactItems = contactTypes.map((type) => {
        const existingContact = initialContacts.find(
          (c) => c.name.toLowerCase() === type.name.toLowerCase(),
        );

        return {
          id: type.id,
          name: type.name,
          displayName:
            existingContact?.displayName ||
            type.name.charAt(0).toUpperCase() + type.name.slice(1),
          imageUrl: type.imageUrl,
          url: existingContact?.url || '',
          checked: !!existingContact,
        };
      });

      setContacts(contactItems);
    } catch (error) {
      console.error('연락처 유형 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 체크박스 변경 처리
  const handleCheckboxChange = (id: string, isCustom = false) => {
    if (isCustom) {
      setCustomContacts(
        customContacts.map((contact) =>
          contact.id === id
            ? { ...contact, checked: !contact.checked }
            : contact,
        ),
      );
    } else {
      setContacts(
        contacts.map((contact) =>
          contact.id === id
            ? { ...contact, checked: !contact.checked }
            : contact,
        ),
      );
    }
  };

  // URL 변경 처리
  const handleUrlChange = (id: string, url: string, isCustom = false) => {
    if (isCustom) {
      setCustomContacts(
        customContacts.map((contact) =>
          contact.id === id ? { ...contact, url } : contact,
        ),
      );
    } else {
      setContacts(
        contacts.map((contact) =>
          contact.id === id ? { ...contact, url } : contact,
        ),
      );
    }
  };

  // 이름 변경 처리
  const handleNameChange = (
    id: string,
    displayName: string,
    isCustom = false,
  ) => {
    if (isCustom) {
      setCustomContacts(
        customContacts.map((contact) =>
          contact.id === id ? { ...contact, displayName } : contact,
        ),
      );
    } else {
      setContacts(
        contacts.map((contact) =>
          contact.id === id ? { ...contact, displayName } : contact,
        ),
      );
    }
  };

  // 커스텀 연락처 추가
  const handleAddCustomContact = () => {
    const newCustomContact: ContactItemData = {
      id: `custom-${Date.now()}`,
      name: 'custom',
      displayName: 'Display name',
      imageUrl: '',
      url: '',
      checked: true,
    };
    setCustomContacts([...customContacts, newCustomContact]);
  };

  // 전체 선택 처리
  const handleSelectAll = () => {
    const allChecked = [...contacts, ...customContacts].every(
      (contact) => contact.checked,
    );

    setContacts(
      contacts.map((contact) => ({ ...contact, checked: !allChecked })),
    );

    setCustomContacts(
      customContacts.map((contact) => ({ ...contact, checked: !allChecked })),
    );
  };

  // 삭제 처리
  const handleDelete = () => {
    setContacts(contacts.map((contact) => ({ ...contact, checked: false })));
    setCustomContacts(
      customContacts.map((contact) => ({ ...contact, checked: false })),
    );
  };

  // 아이콘 선택 모달 표시
  const handleShowIconSelector = (id: string) => {
    setShowIconSelector(id === showIconSelector ? null : id);
  };

  // 아이콘 선택
  const handleSelectIcon = (contactId: string, iconPath: string) => {
    if (contactId.startsWith('custom-')) {
      setCustomContacts(
        customContacts.map((contact) =>
          contact.id === contactId
            ? { ...contact, imageUrl: iconPath }
            : contact,
        ),
      );
    } else {
      setContacts(
        contacts.map((contact) =>
          contact.id === contactId
            ? { ...contact, imageUrl: iconPath }
            : contact,
        ),
      );
    }
    setShowIconSelector(null);
  };

  // 저장 처리
  const handleSave = () => {
    // 체크된 연락처만 저장 (기본 연락처 + 커스텀 연락처)
    const selectedContacts = [
      ...contacts.filter((contact) => contact.checked && contact.url),
      ...customContacts.filter((contact) => contact.checked && contact.url),
    ].map(({ id, name, displayName, imageUrl, url }) => ({
      id,
      name,
      displayName,
      imageUrl: imageUrl || '/icon/Github.svg',
      url,
    }));

    onSave(selectedContacts);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-[560px] bg-white rounded-[16px] shadow-md">
        <div className="p-6">
          <h2 className="text-[30px] font-bold text-[#0A0A0A]">Contact Edit</h2>
          <p className="text-[16px] text-[#666666] mt-1">
            연락 정보를 수정할 수 있습니다.
          </p>
        </div>

        <div className="px-6 flex justify-end space-x-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="cursor-pointer" onClick={handleSelectAll}>
              <Image
                src={
                  [...contacts, ...customContacts].every(
                    (contact) => contact.checked,
                  )
                    ? '/icon/CheckBox_Check.svg'
                    : '/icon/CheckBox.svg'
                }
                alt="체크박스"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <label
              onClick={handleSelectAll}
              className="text-[14px] text-[#4D4D4D] cursor-pointer"
            >
              전체선택
            </label>
          </div>
          <button
            onClick={handleDelete}
            className="text-[#F44336] text-[14px] font-medium"
          >
            삭제
          </button>
        </div>

        {isLoading ? (
          <div className="h-40 flex items-center justify-center">
            <p>로딩 중...</p>
          </div>
        ) : (
          <div className="px-6 overflow-y-auto" style={{ maxHeight: '460px' }}>
            <div className="flex flex-col space-y-6">
              {/* Github 연락처 */}
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div
                    className="mr-4 cursor-pointer"
                    onClick={() => {
                      const github = contacts.find(
                        (c) => c.name.toLowerCase() === 'github',
                      );
                      if (github) handleCheckboxChange(github.id);
                    }}
                  >
                    <Image
                      src={
                        contacts.find((c) => c.name.toLowerCase() === 'github')
                          ?.checked
                          ? '/icon/CheckBox_Check.svg'
                          : '/icon/CheckBox.svg'
                      }
                      alt="체크박스"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div
                    className="cursor-pointer relative"
                    onClick={() => {
                      const github = contacts.find(
                        (c) => c.name.toLowerCase() === 'github',
                      );
                      if (github) handleShowIconSelector(github.id);
                    }}
                  >
                    <Image
                      src={
                        contacts.find((c) => c.name.toLowerCase() === 'github')
                          ?.imageUrl || '/icon/Github.svg'
                      }
                      alt="Github"
                      width={32}
                      height={32}
                      className="w-8 h-8 mr-4"
                    />
                    {/* Github 아이콘 선택기 */}
                    {showIconSelector ===
                      contacts.find((c) => c.name.toLowerCase() === 'github')
                        ?.id && (
                      <div style={iconSelectorStyle}>
                        {/* 말풍선 화살표 */}
                        <div
                          className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#FCFCFC]"
                          style={arrowStyle}
                        ></div>
                        <div className="flex flex-row items-center justify-between gap-[8px] px-[12px] h-full">
                          {AVAILABLE_ICONS.map((icon) => (
                            <div
                              key={icon.id}
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                const github = contacts.find(
                                  (c) => c.name.toLowerCase() === 'github',
                                );
                                if (github)
                                  handleSelectIcon(github.id, icon.path);
                              }}
                            >
                              <Image
                                src={icon.path}
                                alt={icon.name}
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={
                      contacts.find((c) => c.name.toLowerCase() === 'github')
                        ?.displayName || 'github'
                    }
                    onChange={(e) => {
                      const github = contacts.find(
                        (c) => c.name.toLowerCase() === 'github',
                      );
                      if (github) handleNameChange(github.id, e.target.value);
                    }}
                    className="flex-1 p-2 border border-[#E4E6EB] rounded-md bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-5 opacity-0 mr-4"></div>
                  <div className="w-8 mr-4 flex justify-start">
                    <span className="text-[#666666]">URL</span>
                  </div>
                  <input
                    type="text"
                    value={
                      contacts.find((c) => c.name.toLowerCase() === 'github')
                        ?.url || ''
                    }
                    onChange={(e) => {
                      const github = contacts.find(
                        (c) => c.name.toLowerCase() === 'github',
                      );
                      if (github) handleUrlChange(github.id, e.target.value);
                    }}
                    placeholder="https://github.com/"
                    className="flex-1 p-2 border border-[#E4E6EB] rounded-md bg-white"
                  />
                </div>
              </div>

              {/* Email 연락처 */}
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div
                    className="mr-4 cursor-pointer"
                    onClick={() => {
                      const email = contacts.find(
                        (c) => c.name.toLowerCase() === 'email',
                      );
                      if (email) handleCheckboxChange(email.id);
                    }}
                  >
                    <Image
                      src={
                        contacts.find((c) => c.name.toLowerCase() === 'email')
                          ?.checked
                          ? '/icon/CheckBox_Check.svg'
                          : '/icon/CheckBox.svg'
                      }
                      alt="체크박스"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div
                    className="cursor-pointer relative"
                    onClick={() => {
                      const email = contacts.find(
                        (c) => c.name.toLowerCase() === 'email',
                      );
                      if (email) handleShowIconSelector(email.id);
                    }}
                  >
                    <Image
                      src={
                        contacts.find((c) => c.name.toLowerCase() === 'email')
                          ?.imageUrl || '/icon/Email.svg'
                      }
                      alt="Email"
                      width={32}
                      height={32}
                      className="w-8 h-8 mr-4"
                    />
                    {/* Email 아이콘 선택기 */}
                    {showIconSelector ===
                      contacts.find((c) => c.name.toLowerCase() === 'email')
                        ?.id && (
                      <div style={iconSelectorStyle}>
                        {/* 말풍선 화살표 */}
                        <div
                          className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#FCFCFC]"
                          style={arrowStyle}
                        ></div>
                        <div className="flex flex-row items-center justify-between gap-[8px] px-[12px] h-full">
                          {AVAILABLE_ICONS.map((icon) => (
                            <div
                              key={icon.id}
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                const email = contacts.find(
                                  (c) => c.name.toLowerCase() === 'email',
                                );
                                if (email)
                                  handleSelectIcon(email.id, icon.path);
                              }}
                            >
                              <Image
                                src={icon.path}
                                alt={icon.name}
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={
                      contacts.find((c) => c.name.toLowerCase() === 'email')
                        ?.displayName || 'email'
                    }
                    onChange={(e) => {
                      const email = contacts.find(
                        (c) => c.name.toLowerCase() === 'email',
                      );
                      if (email) handleNameChange(email.id, e.target.value);
                    }}
                    className="flex-1 p-2 border border-[#E4E6EB] rounded-md bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-5 opacity-0 mr-4"></div>
                  <div className="w-8 mr-4 flex justify-start">
                    <span className="text-[#666666]">URL</span>
                  </div>
                  <input
                    type="text"
                    value={
                      contacts.find((c) => c.name.toLowerCase() === 'email')
                        ?.url || ''
                    }
                    onChange={(e) => {
                      const email = contacts.find(
                        (c) => c.name.toLowerCase() === 'email',
                      );
                      if (email) handleUrlChange(email.id, e.target.value);
                    }}
                    placeholder="mohaji_123@gmail.com"
                    className="flex-1 p-2 border border-[#E4E6EB] rounded-md bg-white"
                  />
                </div>
              </div>

              {/* Tistory 연락처 */}
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div
                    className="mr-4 cursor-pointer"
                    onClick={() => {
                      const tistory = contacts.find(
                        (c) => c.name.toLowerCase() === 'tistory',
                      );
                      if (tistory) handleCheckboxChange(tistory.id);
                    }}
                  >
                    <Image
                      src={
                        contacts.find((c) => c.name.toLowerCase() === 'tistory')
                          ?.checked
                          ? '/icon/CheckBox_Check.svg'
                          : '/icon/CheckBox.svg'
                      }
                      alt="체크박스"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div
                    className="cursor-pointer relative"
                    onClick={() => {
                      const tistory = contacts.find(
                        (c) => c.name.toLowerCase() === 'tistory',
                      );
                      if (tistory) handleShowIconSelector(tistory.id);
                    }}
                  >
                    <Image
                      src={
                        contacts.find((c) => c.name.toLowerCase() === 'tistory')
                          ?.imageUrl || '/icon/Tistory.svg'
                      }
                      alt="Tistory"
                      width={32}
                      height={32}
                      className="w-8 h-8 mr-4"
                    />
                    {/* Tistory 아이콘 선택기 */}
                    {showIconSelector ===
                      contacts.find((c) => c.name.toLowerCase() === 'tistory')
                        ?.id && (
                      <div style={iconSelectorStyle}>
                        {/* 말풍선 화살표 */}
                        <div
                          className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#FCFCFC]"
                          style={arrowStyle}
                        ></div>
                        <div className="flex flex-row items-center justify-between gap-[8px] px-[12px] h-full">
                          {AVAILABLE_ICONS.map((icon) => (
                            <div
                              key={icon.id}
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                const tistory = contacts.find(
                                  (c) => c.name.toLowerCase() === 'tistory',
                                );
                                if (tistory)
                                  handleSelectIcon(tistory.id, icon.path);
                              }}
                            >
                              <Image
                                src={icon.path}
                                alt={icon.name}
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={
                      contacts.find((c) => c.name.toLowerCase() === 'tistory')
                        ?.displayName || 'tistory'
                    }
                    onChange={(e) => {
                      const tistory = contacts.find(
                        (c) => c.name.toLowerCase() === 'tistory',
                      );
                      if (tistory) handleNameChange(tistory.id, e.target.value);
                    }}
                    className="flex-1 p-2 border border-[#E4E6EB] rounded-md bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-5 opacity-0 mr-4"></div>
                  <div className="w-8 mr-4 flex justify-start">
                    <span className="text-[#666666]">URL</span>
                  </div>
                  <input
                    type="text"
                    value={
                      contacts.find((c) => c.name.toLowerCase() === 'tistory')
                        ?.url || ''
                    }
                    onChange={(e) => {
                      const tistory = contacts.find(
                        (c) => c.name.toLowerCase() === 'tistory',
                      );
                      if (tistory) handleUrlChange(tistory.id, e.target.value);
                    }}
                    placeholder="https://tistory.com/"
                    className="flex-1 p-2 border border-[#E4E6EB] rounded-md bg-white"
                  />
                </div>
              </div>

              {/* Blog 연락처 */}
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div
                    className="mr-4 cursor-pointer"
                    onClick={() => {
                      const blog = contacts.find(
                        (c) => c.name.toLowerCase() === 'blog',
                      );
                      if (blog) handleCheckboxChange(blog.id);
                    }}
                  >
                    <Image
                      src={
                        contacts.find((c) => c.name.toLowerCase() === 'blog')
                          ?.checked
                          ? '/icon/CheckBox_Check.svg'
                          : '/icon/CheckBox.svg'
                      }
                      alt="체크박스"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div
                    className="cursor-pointer relative"
                    onClick={() => {
                      const blog = contacts.find(
                        (c) => c.name.toLowerCase() === 'blog',
                      );
                      if (blog) handleShowIconSelector(blog.id);
                    }}
                  >
                    <Image
                      src={
                        contacts.find((c) => c.name.toLowerCase() === 'blog')
                          ?.imageUrl || '/icon/Blog.svg'
                      }
                      alt="Blog"
                      width={32}
                      height={32}
                      className="w-8 h-8 mr-4"
                    />
                    {/* Blog 아이콘 선택기 */}
                    {showIconSelector ===
                      contacts.find((c) => c.name.toLowerCase() === 'blog')
                        ?.id && (
                      <div style={iconSelectorStyle}>
                        {/* 말풍선 화살표 */}
                        <div
                          className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#FCFCFC]"
                          style={arrowStyle}
                        ></div>
                        <div className="flex flex-row items-center justify-between gap-[8px] px-[12px] h-full">
                          {AVAILABLE_ICONS.map((icon) => (
                            <div
                              key={icon.id}
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                const blog = contacts.find(
                                  (c) => c.name.toLowerCase() === 'blog',
                                );
                                if (blog) handleSelectIcon(blog.id, icon.path);
                              }}
                            >
                              <Image
                                src={icon.path}
                                alt={icon.name}
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={
                      contacts.find((c) => c.name.toLowerCase() === 'blog')
                        ?.displayName || 'Blog'
                    }
                    onChange={(e) => {
                      const blog = contacts.find(
                        (c) => c.name.toLowerCase() === 'blog',
                      );
                      if (blog) handleNameChange(blog.id, e.target.value);
                    }}
                    className="flex-1 p-2 border border-[#E4E6EB] rounded-md bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-5 opacity-0 mr-4"></div>
                  <div className="w-8 mr-4 flex justify-start">
                    <span className="text-[#666666]">URL</span>
                  </div>
                  <input
                    type="text"
                    value={
                      contacts.find((c) => c.name.toLowerCase() === 'blog')
                        ?.url || ''
                    }
                    onChange={(e) => {
                      const blog = contacts.find(
                        (c) => c.name.toLowerCase() === 'blog',
                      );
                      if (blog) handleUrlChange(blog.id, e.target.value);
                    }}
                    placeholder="https://tistory.com/"
                    className="flex-1 p-2 border border-[#E4E6EB] rounded-md bg-white"
                  />
                </div>
              </div>

              {/* 커스텀 연락처 목록 */}
              {customContacts.map((contact) => (
                <div key={contact.id} className="relative">
                  <div className="flex items-center mb-4">
                    <div
                      className="mr-4 cursor-pointer"
                      onClick={() => handleCheckboxChange(contact.id, true)}
                    >
                      <Image
                        src={
                          contact.checked
                            ? '/icon/CheckBox_Check.svg'
                            : '/icon/CheckBox.svg'
                        }
                        alt="체크박스"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <div
                      className="cursor-pointer relative"
                      onClick={() => handleShowIconSelector(contact.id)}
                    >
                      {contact.imageUrl ? (
                        <Image
                          src={contact.imageUrl}
                          alt={contact.displayName}
                          width={32}
                          height={32}
                          className="w-8 h-8 mr-4"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-[#F2F3F5] rounded-full flex items-center justify-center mr-4">
                          <span className="text-[#999999] text-lg">+</span>
                        </div>
                      )}
                      {/* 커스텀 아이콘 선택기 */}
                      {showIconSelector === contact.id && (
                        <div style={iconSelectorStyle}>
                          {/* 말풍선 화살표 */}
                          <div
                            className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#FCFCFC]"
                            style={arrowStyle}
                          ></div>
                          <div className="flex flex-row items-center justify-between gap-[8px] px-[12px] h-full">
                            {AVAILABLE_ICONS.map((icon) => (
                              <div
                                key={icon.id}
                                className="cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectIcon(contact.id, icon.path);
                                }}
                              >
                                <Image
                                  src={icon.path}
                                  alt={icon.name}
                                  width={24}
                                  height={24}
                                  className="w-6 h-6"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      value={contact.displayName}
                      onChange={(e) =>
                        handleNameChange(contact.id, e.target.value, true)
                      }
                      className="flex-1 p-2 border border-[#E4E6EB] rounded-md bg-white"
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 opacity-0 mr-4"></div>
                    <div className="w-8 mr-4 flex justify-start">
                      <span className="text-[#666666]">URL</span>
                    </div>
                    <input
                      type="text"
                      value={contact.url}
                      onChange={(e) =>
                        handleUrlChange(contact.id, e.target.value, true)
                      }
                      placeholder="https://example.com/"
                      className="flex-1 p-2 border border-[#E4E6EB] rounded-md bg-white"
                    />
                  </div>
                </div>
              ))}

              {/* 스켈레톤 형태의 연락처 추가 UI */}
              <div>
                <div
                  className="flex items-center mb-4 cursor-pointer"
                  onClick={handleAddCustomContact}
                >
                  <div className="mr-4">
                    <Image
                      src="/icon/CheckBox.svg"
                      alt="체크박스"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="w-8 h-8 bg-[#F2F3F5] rounded-full mr-4"></div>
                  <div className="flex-1 p-2 text-[#999999]">Display name</div>
                </div>
                <div className="flex items-center">
                  <div className="w-5 opacity-0 mr-4"></div>
                  <div className="w-8 mr-4 flex justify-start">
                    <span className="text-[#999999]">URL</span>
                  </div>
                  <div className="flex-1 p-2 bg-[#F7F8FA] text-[#999999] rounded-md">
                    https://example.com/
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 p-6 border-t border-[#E4E6EB] mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#F2F3F5] text-[#4D4D4D] rounded-md hover:bg-[#E4E6EB]"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#388E3C]"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
