import { instance } from './instance';
import { Contact } from '@/types/blog';

export interface ContactType {
  id: string;
  name: string;
  imageUrl: string;
}

//  연락처 유형 조회 API

export const getContactTypes = async (): Promise<ContactType[]> => {
  try {
    const response = await instance.get<ContactType[]>('/contact-types');
    return response.data.map((type) => {
      const fileName = type.imageUrl.split('/').pop() || '';
      const capitalizedFileName =
        fileName.charAt(0).toUpperCase() + fileName.slice(1);

      return {
        ...type,
        imageUrl: `/icon/${capitalizedFileName}`,
      };
    });
  } catch (error) {
    console.error('연락처 유형 조회 중 오류 발생:', error);
    throw error;
  }
};

//  사용자 연락처 업데이트 API

export const updateUserContacts = async (
  userId: string,
  contacts: Contact[],
): Promise<Contact[]> => {
  try {
    // API 요청 전 이미지 경로 변환 (클라이언트 → 서버)
    const requestContacts = contacts.map((contact) => {
      // 파일 이름만 추출
      const fileName = contact.imageUrl.split('/').pop() || '';

      return {
        ...contact,
        imageUrl: `/static/${fileName}`,
      };
    });

    const response = await instance.put<Contact[]>(
      `/users/${userId}/contacts`,
      { contacts: requestContacts },
    );

    // 응답 데이터의 이미지 경로 변환 (서버 → 클라이언트)
    return response.data.map((contact) => {
      // 파일 이름 추출
      const fileName = contact.imageUrl.split('/').pop() || '';
      // 대문자로 시작하는 파일 이름 생성
      const capitalizedFileName =
        fileName.charAt(0).toUpperCase() + fileName.slice(1);

      return {
        ...contact,
        imageUrl: `/icon/${capitalizedFileName}`,
      };
    });
  } catch (error) {
    console.error('연락처 업데이트 중 오류 발생:', error);
    throw error;
  }
};
