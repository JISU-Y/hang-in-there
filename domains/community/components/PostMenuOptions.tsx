'use client';

import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { usePostActions } from '../hooks/usePostActions';

interface PostMenuOptionsProps {
  postId: string;
  postAuthorId?: string;
  onClose?: () => void;
}

const PostMenuOptions = ({
  postId,
  postAuthorId,
  onClose
}: PostMenuOptionsProps) => {
  const { isAuthor, handleEdit, handleDelete, handleReport } = usePostActions({
    postId,
    postAuthorId,
    onClose
  });

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="더보기"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        }
        variant="ghost"
      />
      <MenuList>
        {isAuthor && (
          <>
            <MenuItem onClick={handleEdit}>수정하기</MenuItem>
            <MenuItem onClick={handleDelete}>삭제하기</MenuItem>
          </>
        )}
        <MenuItem onClick={handleReport}>신고하기</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PostMenuOptions;
