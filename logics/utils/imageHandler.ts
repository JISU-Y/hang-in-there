// export interface PresignedPostDataType {
//   url: string; // 프론트에서 직접 올려야 하는 s3 경로
//   fields: {
//     key: string;
//     'Content-Type': string;
//     bucket: string;
//     'X-Amz-Algorithm': string;
//     'X-Amz-Credential': string;
//     'X-Amz-Date': string;
//     Policy: string;
//     'X-Amz-Signature': string;
//   };
// }

// /**
//  * Image를 aws에 업로드하는 api
//  *
//  * **이미지 업로드 요청 방법**
//  * 1. `/presigned` 요청하여 presignedUrl 및 data 받아오기 (FIP 백엔드로 요청)
//  * 2. `presignedUrl` 에 presignedData와 File 리스트를 함께 요청 (aws s3로 요청)
//  * 3. `/file` 요청하여 s3 저장했던 file 정보를 전달, 백엔드에 저장 (FIP 백엔드로 요청) .
//  * 4. 이후 ids에 들어있는 id: number 를 사용
//  *
//  * @param File - File[] 업로드하려고 하는 file 리스트 (File 객체 배열)
//  *
//  * @returns ResponseCreateFile
//  */
// export async function uploadFiles(files: File[]) {
//   const fileApi = new BaseApi('/files');

//   try {
//     // 1
//     let presignedData: ApiResponseDto<PresignedPostDataType[]>;

//     try {
//       presignedData = await fileApi.post<
//         ApiResponseDto<PresignedPostDataType[]>
//       >('/presigned', {
//         uploadList: files.map(({ name }) => ({ name })) // { uploadList: [{name: "test.png"}] }
//       });
//     } catch (error) {
//       ToastError('Failed to get presigned URL. Please retry.');
//       console.error('Error during presigned URL request:', error);
//       return;
//     }

//     // 2
//     try {
//       const uploadPromises = files.map((file, index) => {
//         const presigned = presignedData.data[index];

//         // NOTE: formData에 presignedData 정보들과 File을 append.
//         const formData = new FormData();
//         for (const key in presigned.fields) {
//           formData.append(key, presigned.fields[key]);
//         }
//         formData.append('file', file);

//         return retryUpload(presigned.url, formData, 3); // NOTE: aws s3 url에 요청
//       });

//       const results = await Promise.allSettled(uploadPromises);

//       const failedUploads = results.filter(
//         ({ status }) => status === 'rejected'
//       );
//       if (failedUploads.length > 0) {
//         const parsedErrorMessage = `${extractMessage(
//           (failedUploads[0] as { reason: any })?.reason?.response?.data
//         )}`;

//         Sentry.captureException({ presignedData, results });

//         throw new Error(parsedErrorMessage);
//       }
//     } catch (error) {
//       ToastError('Failed to upload the image to S3. Please retry.');
//       console.error('Error during file upload to S3:', error.message);

//       throw error;
//     }

//     // 3
//     try {
//       const createFileList = presignedData.data.map(
//         ({ fields, url }, index) => ({
//           // 백엔드에서 DB 저장할 때 필요한 데이터 / 원하는 데이터
//           name: files[index].name,
//           size: files[index].size,
//           key: fields.key,
//           url
//         })
//       );

//       // Event 생성해서 저장 (post할 때)
//       // 프론트 -> 백 { eventImageId: 24, eventTitle: "어쩌구" } -> 데이터 저장하면 됨.
//       // 백 -> 프론트 { eventImageUrl: "https://hanginthere-bucket.asdf.com", eventTitle: "어쩌구", createdAt: "" }
//       const fileIdList = await fileApi.post<ApiResponseDto<ResponseCreateFile>>(
//         '/file',
//         { createFileList } as RequestCreateFile
//       );

//       return fileIdList?.data;
//     } catch (error) {
//       ToastError('Failed to save file information. Please retry.');
//       console.error('Error during file information saving:', error);
//     }
//   } catch (error) {
//     console.error('Unexpected error:', error);

//     throw error;
//   }
// }
