import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
} from "@windmill/react-ui";
import { exportFilterExcel } from "../../../context/actions/Export/exportFilterExcel";

const ModalExcel = ({ isModalOpen, closeModal, path }) => {
  const [filterTgl, setFilterTgl] = useState({
    dari_tgl: "",
    error_dari_tgl: false,
    sampai_tgl: "",
    error_sampai_tgl: false,
  });

  // Handle filter tanggal change
  const handleFilterTglChange = (e) => {
    setFilterTgl({
      ...filterTgl,
      [e.target.name]: e.target.value,
    });
  };

  // Handle filter tombol pencarian
  const handleFilterCari = () => {
    console.log(filterTgl);

    exportFilterExcel(path, filterTgl);
    closeModal();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>Filter Export Excel</ModalHeader>
      <ModalBody>
        <Label className="mt-5">
          <span>Dari Tanggal</span>
          <Input
            type="date"
            name="dari_tgl"
            onChange={(e) => handleFilterTglChange(e)}
          />
        </Label>
        <Label className="mt-3">
          <span>Sampai Tanggal</span>
          <Input
            type="date"
            name="sampai_tgl"
            onChange={(e) => handleFilterTglChange(e)}
          />
        </Label>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block">
          <Button layout="outline" onClick={closeModal}>
            Cancel
          </Button>
        </div>
        <div className="hidden sm:block">
          <Button
            onClick={handleFilterCari}
            disabled={
              !filterTgl.dari_tgl || !filterTgl.sampai_tgl ? true : false
            }
          >
            Export
          </Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={closeModal}>
            Cancel
          </Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button
            block
            size="large"
            onClick={handleFilterCari}
            disabled={
              !filterTgl.dari_tgl || !filterTgl.sampai_tgl ? true : false
            }
          >
            Export
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ModalExcel;
