'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreatePostMutation } from '@domains/community/network/communityMutations';
import { CreatePostRequestDto } from '@domains/community/types';
import { useState, useRef, useCallback, useEffect } from 'react';
import { uploadFile, UploadImageType } from '@logics/utils/imageHandler';

// yup 스키마 정의
const postSchema = yup.object({
  boardIdx: yup.number().required('게시판을 선택해주세요'),
  title: yup
    .string()
    .required('제목을 입력해주세요')
    .min(1, '최소 1자 이상 입력해주세요')
    .max(100, '최대 100자까지 입력 가능합니다'),
  content: yup.string().required('내용을 입력해주세요')
});

// 태그 추출 정규식
const TAG_REGEX = /#[^\s#]+/g;

// 이미지 확장자 및 크기 검증
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_COUNT = 5;
const VALID_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp'
];

interface ImagePreviewItem {
  file: File;
  previewUrl: string;
}

export default function CommunityWritePage() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreatePostMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [imagePreviewList, setImagePreviewList] = useState<ImagePreviewItem[]>(
    []
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentValue, setContentValue] = useState('');

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: {
      boardIdx: 1, // 기본 게시판 ID (필요에 따라 변경)
      title: '',
      content: ''
    }
  });

  // 태그 추출 함수
  const extractTags = useCallback((text: string): string[] => {
    const matches = text.match(TAG_REGEX) || [];
    return matches.map(tag => tag.slice(1)); // # 제거
  }, []);

  // 태그 하이라이트 처리를 위한 HTML 생성
  const highlightTags = useCallback((text: string): string => {
    if (!text) return '';
    return text.replace(
      TAG_REGEX,
      match => `<span class="tag">${match}</span>`
    );
  }, []);

  // 텍스트 영역 내용 변경 핸들러
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContentValue(newValue);
    setValue('content', newValue);
  };

  // 컨텐츠 값이 변경될 때마다 하이라이트 업데이트
  useEffect(() => {
    if (textareaRef.current && textareaRef.current.nextElementSibling) {
      const highlightedContent = highlightTags(contentValue);
      (textareaRef.current.nextElementSibling as HTMLElement).innerHTML =
        highlightedContent;
    }
  }, [contentValue, highlightTags]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // 파일 크기, 형식, 최대 개수 검증
    const currentImagesCount = imagePreviewList.length;
    const remainingSlots = MAX_IMAGE_COUNT - currentImagesCount;

    if (files.length > remainingSlots) {
      setUploadError(
        `이미지는 최대 ${MAX_IMAGE_COUNT}개까지 업로드 가능합니다.`
      );
      return;
    }

    setUploadError(null);

    // 파일 검증 및 미리보기 URL 생성
    const newImages: ImagePreviewItem[] = [];

    Array.from(files).forEach(file => {
      // 파일 형식 검증
      if (!VALID_IMAGE_TYPES.includes(file.type)) {
        setUploadError(
          '지원하지 않는 이미지 형식입니다. (JPEG, PNG, GIF, WEBP만 가능)'
        );
        return;
      }

      // 파일 크기 검증
      if (file.size > MAX_IMAGE_SIZE) {
        setUploadError('이미지 크기는 5MB를 초과할 수 없습니다.');
        return;
      }

      // 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(file);
      newImages.push({ file, previewUrl });
    });

    if (newImages.length > 0) {
      setImagePreviewList(prev => [...prev, ...newImages]);
    }

    // 파일 인풋 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImagePreviewList(prev => {
      const newList = [...prev];
      // 미리보기 URL 해제
      URL.revokeObjectURL(newList[index].previewUrl);
      newList.splice(index, 1);
      return newList;
    });
  };

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      // 이미지가 있는 경우 실제 업로드 진행
      let uploadedImageUrls: string[] = [];

      if (imagePreviewList.length > 0) {
        const uploadPromises = imagePreviewList.map(async item => {
          try {
            return await uploadFile(item.file, 'event' as UploadImageType);
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
            return null;
          }
        });

        const results = await Promise.all(uploadPromises);
        uploadedImageUrls = results.filter(Boolean) as string[];
      }

      // 컨텐츠에서 태그 추출
      const tags = extractTags(data.content);

      const postData: CreatePostRequestDto = {
        boardIdx: data.boardIdx,
        title: data.title,
        content: data.content,
        tags: tags,
        images: uploadedImageUrls
      };

      await mutateAsync(postData);

      // 미리보기 URL 메모리 해제
      imagePreviewList.forEach(item => URL.revokeObjectURL(item.previewUrl));

      //   alert('게시글이 등록되었습니다.');
      //   router.push('/community');
    } catch (error) {
      console.error('게시글 등록 오류:', error);
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <PageTitle>글 작성</PageTitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="title">제목</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="제목을 입력해주세요 (최대 100자)"
                  disabled={isPending || isSubmitting}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="content">
              내용 (#으로 시작하는 단어는 태그로 인식됩니다)
            </Label>
            <TextareaContainer>
              <ContentTextarea
                ref={textareaRef}
                id="content"
                rows={12}
                placeholder="내용을 입력해주세요. #태그 형식으로 입력하면 태그로 인식됩니다."
                disabled={isPending || isSubmitting}
                value={contentValue}
                onChange={handleContentChange}
              />
              <HighlightLayer className="highlight" aria-hidden="true" />
            </TextareaContainer>
            {errors.content && (
              <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>이미지 (선택사항, 최대 5개, 각 5MB 이하)</Label>
            <ImageUploadContainer>
              <FileInput
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/png, image/gif, image/webp"
                multiple
                onChange={handleImageSelect}
                disabled={
                  isPending ||
                  isSubmitting ||
                  imagePreviewList.length >= MAX_IMAGE_COUNT
                }
              />
              <UploadButton
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={
                  isPending ||
                  isSubmitting ||
                  imagePreviewList.length >= MAX_IMAGE_COUNT
                }
              >
                {isSubmitting ? '처리 중...' : '이미지 선택'}
              </UploadButton>
              <UploadInfo>
                {imagePreviewList.length}/{MAX_IMAGE_COUNT}개 선택됨
              </UploadInfo>
            </ImageUploadContainer>

            {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}

            {imagePreviewList.length > 0 && (
              <ImagePreviewContainer>
                {imagePreviewList.map((item, index) => (
                  <ImagePreviewItem key={index}>
                    <ImagePreview
                      src={item.previewUrl}
                      alt={`업로드 예정 이미지 ${index + 1}`}
                    />
                    <RemoveImageButton
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={isPending || isSubmitting}
                    >
                      ×
                    </RemoveImageButton>
                  </ImagePreviewItem>
                ))}
              </ImagePreviewContainer>
            )}
          </FormGroup>

          <FormActions>
            <CancelButton href="/community">취소</CancelButton>
            <SubmitButton type="submit" disabled={isPending || isSubmitting}>
              {isSubmitting
                ? '등록 중...'
                : isPending
                  ? '처리 중...'
                  : '등록하기'}
            </SubmitButton>
          </FormActions>
        </Form>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 32px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #1a202c;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 24px;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }

  &:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }
`;

const TextareaContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
  background-color: transparent;
  position: relative;
  z-index: 1;
  color: transparent;
  caret-color: #1a202c;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }

  &:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }
`;

const HighlightLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #1a202c;
  font-size: 16px;
  padding: 12px 16px;
  pointer-events: none;
  z-index: 0;

  .tag {
    color: #3182ce;
    font-weight: 500;
    background-color: #ebf8ff;
    padding: 0 2px;
    border-radius: 3px;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelButton = styled(Link)`
  padding: 10px 16px;
  background-color: #e2e8f0;
  color: #4a5568;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 16px;
  background-color: #3182ce;
  color: #ffffff;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #2b6cb0;
  }

  &:disabled {
    background-color: #90cdf4;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 14px;
  margin-top: 4px;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  padding: 8px 16px;
  background-color: #edf2f7;
  color: #4a5568;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #e2e8f0;
  }

  &:disabled {
    background-color: #f7fafc;
    color: #a0aec0;
    cursor: not-allowed;
  }
`;

const UploadInfo = styled.span`
  font-size: 14px;
  color: #718096;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
`;

const ImagePreviewItem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
