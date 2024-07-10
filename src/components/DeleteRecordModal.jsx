import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, Slide, Typography } from "@mui/material";
import React, { useState } from "react";
import { axiosAPI } from "../api/axiosConfig";

const DeleteRecordModal = ({
  record,
  showModal,
  setShowModal,
  setHasMore,
  setPage,
  page,
  fetchRecords,
}) => {
  const closeModal = () => setShowModal(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosAPI.delete(`/records/${record?.id}`);
      if (page === 1) {
        fetchRecords();
      }
      window.scrollTo(0, 0);
      setPage(1);
      setShowModal(false);
      setHasMore(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showModal}
      onClose={closeModal}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Slide direction="up" in={showModal} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: "320px",
            bgcolor: "white",
            padding: "20px",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography fontWeight={"500"}>
            Are you sure to delete this record
          </Typography>
          <Box sx={{ display: "flex", gap: "8px", justifyContent: "end" }}>
            <LoadingButton
              onClick={handleDelete}
              color="error"
              variant="outlined"
              size="small"
              loading={loading}
            >
              Delete
            </LoadingButton>
            <Button variant="outlined" size="small" onClick={closeModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default DeleteRecordModal;
