import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react';

function ConfirmDialog({ id, handleConfirm, type = 'post' }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const remove = () => {
    console.log('ID', id);
    if (handleConfirm) {
      handleConfirm(id);
    }
    onClose();
  };
  return (
    <>
      <Button onClick={onOpen}>remove {type}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove {type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Really want to proceed and remove this {type} ?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={remove}>
              Yes Remove {type}
            </Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmDialog;
