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

function ReportDialog({ id, handleReport, type = 'post' }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const report = () => {
    console.log('ID', id);
    if (handleReport) {
      handleReport(id, type);
    }
    onClose();
  };
  return (
    <>
      <Button onClick={onOpen}>Report {type}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report {type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Really want to proceed and report this {type} ?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={report}>
              Yes Report {type}
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

export default ReportDialog;
