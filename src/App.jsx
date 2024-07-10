import { AddCircle, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { axiosAPI } from "./api/axiosConfig";
import AddRecordModal from "./components/AddRecordModal";
import DeleteRecordModal from "./components/DeleteRecordModal";
import UpdateRecordModal from "./components/UpdateRecordModal";
import { StyledTableCell } from "./shared/StyledTableCell";
import { StyledTableRow } from "./shared/StyledTableRow";

const App = () => {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      if (page === 1) {
        setRecords([]);
      }
      const response = await axiosAPI.get(
        `/records?_page=${page}&_per_page=10`
      );
      setRecords((prev) => [...prev, ...response.data.data]);
      if (response.data.pages === page) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching records", error);
      setLoading(false);
    }
  };

  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  useEffect(() => {
    fetchRecords();
  }, [page]);

  useEffect(() => {
    if (hasMore && inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <>
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          py: "20px",
        }}
      >
        <Button
          startIcon={<AddCircle />}
          variant="contained"
          color="primary"
          onClick={() => setAddModal(true)}
        >
          Add Record
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>№</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">City</StyledTableCell>
              <StyledTableCell align="right">Occupation</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, index) => (
              <StyledTableRow
                key={record.id}
                ref={index === records.length - 1 ? ref : null}
              >
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {record.name}
                </StyledTableCell>
                <StyledTableCell align="right">{record.email}</StyledTableCell>
                <StyledTableCell align="right">{record.age}</StyledTableCell>
                <StyledTableCell align="right">{record.city}</StyledTableCell>
                <StyledTableCell align="right">
                  {record.occupation}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => {
                      setRecord(record);
                      setUpdateModal(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => {
                      setRecord(record);
                      setDeleteModal(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {records.length === 0 && !hasMore && !loading ? <div>empty</div> : null}
      {hasMore && loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
      <AddRecordModal
        showModal={addModal}
        setShowModal={setAddModal}
        setHasMore={setHasMore}
        setPage={setPage}
        page={page}
        fetchRecords={fetchRecords}
      />
      <DeleteRecordModal
        showModal={deleteModal}
        setShowModal={setDeleteModal}
        setHasMore={setHasMore}
        setPage={setPage}
        page={page}
        fetchRecords={fetchRecords}
        record={record}
      />
      <UpdateRecordModal
        record={record}
        showModal={updateModal}
        setShowModal={setUpdateModal}
        setHasMore={setHasMore}
        setPage={setPage}
        page={page}
        fetchRecords={fetchRecords}
      />
    </Container>
    <Toaster
    // position="top-center"
    // reverseOrder={false}
  />
  </>
  );
};

export default App;
