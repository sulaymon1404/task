import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
  Typography
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { forwardRef } from "react";
import * as Yup from "yup";
import { axiosAPI } from "../api/axiosConfig";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  age: Yup.number()
    .required("Required")
    .min(18, "Age must be higher than 18 and lower than 70!")
    .max(70, "Age must be higher than 18 and lower than 70!"),
  city: Yup.string().required("Required"),
  occupation: Yup.string().required("Required"),
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddRecordModal = ({
  showModal,
  setShowModal,
  setHasMore,
  setPage,
  page,
  fetchRecords,
}) => {
  const closeModal = () => setShowModal(false);
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axiosAPI.post("/records", values);
      if (page === 1) {
        fetchRecords();
      }
      window.scrollTo(0, 0);
      setPage(1);
      setHasMore(true);
      closeModal();
    } catch (error) {
      actions.setSubmitting(false);
      actions.setErrors({ submit: "Failed to submit form please try again" });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        open={showModal}
        onClose={closeModal}
        aria-labelledby="responsive-dialog-title"
        maxWidth={"md"}
        scroll="paper"
        fullWidth={true}
        // fullScreen={fullScreen}
      >
        <DialogTitle
          sx={{
            padding: "18px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          id="responsive-dialog-title"
        >
          <Typography
            color={"#262626"}
            fontWeight={"600"}
            fontSize={"18px"}
            lineHeight={"24px"}
          >
            Add Record
          </Typography>
          <IconButton size="small" onClick={closeModal}>
            <Close fontSize="24px" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ padding: "20px" }}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              age: "",
              city: "",
              occupation: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Field
                  name="name"
                  as={TextField}
                  variant="outlined"
                  label="Name"
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name ? errors.name : ""}
                />
                <Field
                  name="city"
                  as={TextField}
                  variant="outlined"
                  label="City"
                  error={touched.city && !!errors.city}
                  helperText={touched.city && errors.city ? errors.city : ""}
                />

                <Field
                  name="age"
                  as={TextField}
                  variant="outlined"
                  label="Age"
                  error={touched.age && !!errors.age}
                  helperText={touched.age && errors.age ? errors.age : ""}
                />
                <Field
                  name="occupation"
                  as={TextField}
                  variant="outlined"
                  label="Occupation"
                  error={touched.occupation && !!errors.occupation}
                  helperText={
                    touched.occupation && errors.occupation
                      ? errors.occupation
                      : ""
                  }
                />
                <Field
                  name="email"
                  as={TextField}
                  variant="outlined"
                  type="email"
                  label="Email"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email ? errors.email : ""}
                />
                {errors?.submit ? <div>{errors?.submit}</div> : null}
                <LoadingButton
                  variant="contained"
                  size="large"
                  type="submit"
                  loading={isSubmitting}
                >
                  Submit
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddRecordModal;
