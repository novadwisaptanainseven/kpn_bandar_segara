import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
} from "@windmill/react-ui";

const ModalExcel = ({ isModalOpen, closeModal }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>Filter Export Excel</ModalHeader>
      <ModalBody>
        <Label className="mt-5">
          <span>Dari Tanggal</span>
          <Input type="date" className="mt-1" />
        </Label>
        <Label className="mt-3">
          <span>Sampai Tanggal</span>
          <Input type="date" className="mt-1" />
        </Label>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block">
          <Button layout="outline" onClick={closeModal}>
            Cancel
          </Button>
        </div>
        <div className="hidden sm:block">
          <Button>Export</Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={closeModal}>
            Cancel
          </Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large">
            Export
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ModalExcel;
