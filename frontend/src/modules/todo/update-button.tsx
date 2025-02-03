import { Todo } from "@/api/types";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import CreateTodoModal from "./create-todo-modal";

type Props = {
  todo: Todo;
};

function UpdateTodoButton({ todo }: Props) {
  const [open, setOpen] = useState(false); // State to control modal visibility

  // Open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Edit fontSize="small" />
      </IconButton>
      <CreateTodoModal
        mode="edit"
        defaultValues={todo}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default UpdateTodoButton;
