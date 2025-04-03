// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import styled from '@emotion/styled';
// import { useFetchPostDetailQuery } from '@domains/community/network/communityQueries';

// interface CommunityEditPageProps {
//   params: {
//     postId: string;
//   };
// }

// export default function CommunityEditPage({ params }: CommunityEditPageProps) {
//   const router = useRouter();
//   const { postId } = params;
//   const [formData, setFormData] = useState({
//     title: '',
//     content: ''
//   });

//   const {
//     data: post,
//     isLoading: isLoadingPost,
//     isError: isErrorPost
//   } = useFetchPostDetailQuery(postId, {
//     enabled: !!postId && !isNaN(Number(postId))
//   });

//   //   const updatePostMutation = useUpdatePostMutation();

//   useEffect(() => {
//     if (isNaN(Number(postId))) {
//       notFound();
//     }

//     if (post) {
//       setFormData({
//         title: post.title,
//         content: post.content
//       });
//     }
//   }, [post, postId]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.title.trim() || !formData.content.trim()) {
//       alert('제목과 내용을 모두 입력해주세요.');
//       return;
//     }

//     try {
//       await updatePostMutation.mutateAsync({
//         post_id: Number(postId),
//         title: formData.title,
//         content: formData.content
//       });
//       alert('게시글이 수정되었습니다.');
//       router.push(`/community/${postId}`);
//     } catch (error) {
//       console.error('게시글 수정 오류:', error);
//       alert('게시글 수정에 실패했습니다. 다시 시도해주세요.');
//     }
//   };

//   if (isLoadingPost) {
//     return <LoadingContainer>로딩 중...</LoadingContainer>;
//   }

//   if (isErrorPost || !post) {
//     return <ErrorContainer>게시글을 불러오는 데 실패했습니다.</ErrorContainer>;
//   }

//   return (
//     <Container>
//       <FormContainer>
//         <PageTitle>글 수정</PageTitle>

//         <Form onSubmit={handleSubmit}>
//           <FormGroup>
//             <Label htmlFor="title">제목</Label>
//             <Input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="제목을 입력해주세요"
//               required
//               disabled={updatePostMutation.isPending}
//             />
//           </FormGroup>

//           <FormGroup>
//             <Label htmlFor="content">내용</Label>
//             <Textarea
//               id="content"
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               rows={12}
//               placeholder="내용을 입력해주세요"
//               required
//               disabled={updatePostMutation.isPending}
//             />
//           </FormGroup>

//           <FormActions>
//             <CancelButton href={`/community/${postId}`}>취소</CancelButton>
//             <SubmitButton type="submit" disabled={updatePostMutation.isPending}>
//               {updatePostMutation.isPending ? '수정 중...' : '수정하기'}
//             </SubmitButton>
//           </FormActions>
//         </Form>
//       </FormContainer>
//     </Container>
//   );
// }

// const Container = styled.div`
//   width: 100%;
// `;

// const FormContainer = styled.div`
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//   padding: 32px;

//   @media (max-width: 768px) {
//     padding: 24px 16px;
//   }
// `;

// const PageTitle = styled.h1`
//   font-size: 28px;
//   font-weight: 700;
//   margin-bottom: 32px;
//   color: #1a202c;

//   @media (max-width: 768px) {
//     font-size: 22px;
//     margin-bottom: 24px;
//   }
// `;

// const Form = styled.form`
//   width: 100%;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 24px;
// `;

// const Label = styled.label`
//   display: block;
//   font-size: 15px;
//   font-weight: 500;
//   color: #4a5568;
//   margin-bottom: 6px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 12px 16px;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
//   font-size: 16px;

//   &:focus {
//     outline: none;
//     border-color: #3182ce;
//     box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
//   }

//   &:disabled {
//     background-color: #f7fafc;
//     cursor: not-allowed;
//   }
// `;

// const Textarea = styled.textarea`
//   width: 100%;
//   padding: 12px 16px;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
//   font-size: 16px;
//   resize: vertical;

//   &:focus {
//     outline: none;
//     border-color: #3182ce;
//     box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
//   }

//   &:disabled {
//     background-color: #f7fafc;
//     cursor: not-allowed;
//   }
// `;

// const FormActions = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 12px;
// `;

// const CancelButton = styled(Link)`
//   padding: 10px 16px;
//   background-color: #e2e8f0;
//   color: #4a5568;
//   border-radius: 6px;
//   font-size: 15px;
//   font-weight: 500;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #cbd5e0;
//   }
// `;

// const SubmitButton = styled.button`
//   padding: 10px 16px;
//   background-color: #3182ce;
//   color: #ffffff;
//   border-radius: 6px;
//   font-size: 15px;
//   font-weight: 500;
//   transition: background-color 0.2s;

//   &:hover:not(:disabled) {
//     background-color: #2b6cb0;
//   }

//   &:disabled {
//     background-color: #90cdf4;
//     cursor: not-allowed;
//   }
// `;

// const LoadingContainer = styled.div`
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//   padding: 32px;
//   height: 400px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 16px;
//   color: #4a5568;
// `;

// const ErrorContainer = styled.div`
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//   padding: 32px;
//   height: 200px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 16px;
//   color: #e53e3e;
// `;
