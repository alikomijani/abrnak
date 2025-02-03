import { deleteTodoMutation } from "@/api/todos";
import { Todo } from "@/api/types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Delete } from "@mui/icons-material";

type Props = {
  todo: Todo;
};

export default function DeleteTodoButton({ todo }: Props) {
  const [open, setOpen] = useState(false); // State to control modal visibility
  const { mutate } = deleteTodoMutation();

  // Open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handle delete action
  const handleDelete = () => {
    mutate(todo._id); // Call the delete mutation
    handleClose(); // Close the modal
  };
  return (
    <>
      {/* Delete Button */}
      <IconButton color="error" onClick={handleOpen}>
        <Delete fontSize="small" />
      </IconButton>
      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>حذف تسک</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box width={"100%"}>
              <Typography variant="body1">
                آیا از حذف این تسک{" "}
                {
                  <Typography variant="h6" component={"span"}>
                    {todo.title}
                  </Typography>
                }{" "}
                مطمئن هستید؟
              </Typography>
              این عملیات قابل بازگشت نیست.
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Cancel Button */}
          <Button onClick={handleClose} color="secondary" variant="contained">
            بازگشت
          </Button>
          {/* Delete Button */}
          <Button onClick={handleDelete} color="error" variant="outlined">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
