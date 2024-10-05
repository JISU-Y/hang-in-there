import { useToast, UseToastOptions } from '@chakra-ui/react';

type UserToastOptionType = Omit<UseToastOptions, 'status'>;

const useToastMessage = () => {
  const toast = useToast();

  const toastSuccess = (options?: UserToastOptionType) => {
    toast({
      duration: 3000,
      isClosable: true,
      status: 'success',
      position: 'top',
      containerStyle: {
        whiteSpace: 'pre-line'
      },
      ...options
    });
  };

  const toastError = (options?: UserToastOptionType) => {
    toast({
      duration: 3000,
      isClosable: true,
      status: 'error',
      position: 'top',
      containerStyle: {
        whiteSpace: 'pre-line'
      },
      ...options
    });
  };

  const toastWarning = (options?: UserToastOptionType) => {
    toast({
      duration: 3000,
      isClosable: true,
      status: 'warning',
      position: 'top',
      containerStyle: {
        whiteSpace: 'pre-line'
      },
      ...options
    });
  };

  const toastInfo = (options?: UserToastOptionType) => {
    toast({
      duration: 3000,
      isClosable: true,
      status: 'info',
      position: 'top',
      containerStyle: {
        whiteSpace: 'pre-line'
      },
      ...options
    });
  };

  return {
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo
  };
};

export default useToastMessage;
