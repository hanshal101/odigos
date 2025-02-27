import React from 'react';
import Image from 'next/image';
import { Text } from '../text';
import ReactDOM from 'react-dom';
import { useKeyDown } from '@/hooks';
import styled from 'styled-components';
import { slide, Overlay, CenterThis } from '@/styles';

interface ModalProps {
  isOpen: boolean;
  noOverlay?: boolean;
  header?: {
    title: string;
  };
  actionComponent?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper = styled.div<{ $isOpen: ModalProps['isOpen'] }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: fit-content;
  max-height: 84vh;
  background: ${({ theme }) => theme.colors.translucent_bg};
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  border-radius: 40px;
  box-shadow: 0px 1px 1px 0px rgba(17, 17, 17, 0.8), 0px 2px 2px 0px rgba(17, 17, 17, 0.8), 0px 5px 5px 0px rgba(17, 17, 17, 0.8), 0px 10px 10px 0px rgba(17, 17, 17, 0.8),
    0px 0px 8px 0px rgba(17, 17, 17, 0.8);
  animation: ${({ $isOpen }) => ($isOpen ? slide.in['center'] : slide.out['center'])} 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 24px;
`;

const ModalCloseButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ModalContent = styled(CenterThis)``;

const ModalTitleContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  pointer-events: none;
`;

const ModalTitle = styled(Text)`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.font_family.secondary};
  pointer-events: auto;
`;

const CancelText = styled(Text)`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  font-family: ${({ theme }) => theme.font_family.secondary};
  text-decoration: underline;
  cursor: pointer;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, noOverlay, header, actionComponent, onClose, children }) => {
  useKeyDown(
    {
      key: 'Escape',
      active: isOpen,
    },
    () => onClose(),
  );

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={onClose} style={{ opacity: noOverlay ? 0 : 1 }} />

      <ModalWrapper $isOpen={isOpen}>
        {header && (
          <ModalHeader>
            <ModalCloseButton onClick={onClose}>
              <Image src='/icons/common/x.svg' alt='close' width={15} height={12} />
              <CancelText>{'Cancel'}</CancelText>
            </ModalCloseButton>
            <ModalTitleContainer>
              <ModalTitle>{header.title}</ModalTitle>
            </ModalTitleContainer>
            <HeaderActionsWrapper>{actionComponent}</HeaderActionsWrapper>
          </ModalHeader>
        )}

        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    </>,
    document.body,
  );
};

export { Modal };
