import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { createOrUpdateMutation, TodoData } from "@/api/todos";

// Props for the CreateTodoModal component
interface CreateTodoModalProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  defaultValues?: TodoData & { _id: string | undefined }; // Pre-fill form for edit mode
}
const initialValues = {
  _id: undefined,
  title: "",
  description: "",
  subTasks: [],
};
export default function CreateTodoModal({
  open,
  onClose,
  mode,
  defaultValues = initialValues,
}: CreateTodoModalProps) {
  // React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoData>({
    defaultValues,
  });
  const { mutateAsync, isPending } = createOrUpdateMutation(mode);
  // Dynamic subtask fields
  const { fields, append, remove } = useFieldArray<TodoData, "subTasks", "id">({
    control,
    name: "subTasks", // <-- Type assertion
  });

  // Handle form submission
  const onSubmit = (data: TodoData) => {
    data.subTasks = data.subTasks?.filter(
      (subTask) => subTask.title.trim() !== ""
    ); // Remove empty subtasks
    mutateAsync({ id: defaultValues._id, data }).then(() => onClose());
  };

  // Reset form when modal closes
  React.useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "create" ? "ایجاد تسک جدید" : "ویرایش تسک"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title Field */}
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="عنوان"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          {/* Description Field */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="توضیحات"
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
            )}
          />

          {/* Subtasks Section */}
          <Typography variant="subtitle1" fontWeight="bold" mt={2}>
            وظایف
          </Typography>
          {fields.map((field, index) => (
            <Box
              key={field.id}
              display="flex"
              alignItems="center"
              gap={1}
              mt={1}
            >
              <Controller
                name={`subTasks.${index}.title`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={`وظیفه ${index + 1}`}
                    fullWidth
                  />
                )}
              />

              <IconButton onClick={() => remove(index)}>
                <Remove fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => append({ title: "" })}
            sx={{ mt: 1 }}
          >
            اضافه کردن
          </Button>
          <DialogActions sx={{ p: 0 }}>
            {/* Cancel Button */}
            <Button onClick={onClose} color="secondary">
              بازگشت
            </Button>
            {/* Save Button */}
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={isPending}
            >
              {isPending ? <CircularProgress size={24} /> : "ذخیره"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
