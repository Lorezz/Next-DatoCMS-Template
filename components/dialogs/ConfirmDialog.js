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

function ConfirmDialog({ id, handleConfirm, type = 'Delete' }) {
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
      <Button onClick={onOpen}>Confirm {type}}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Really want to proceed ?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={remove}>
              Yes {type}
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
