import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import Interweave from "interweave";

const ModalKeterangan = ({ isOpen, onClose, keterangan }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Keterangan</ModalHeader>
        <ModalBody className="pt-4">
          <Interweave content={keterangan} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalKeterangan;
