import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { todoStatusMutation } from "@/api/todos";
import UpdateTodoButton from "@/modules/todo/update-button";
import DeleteTodoButton from "@/modules/todo/delete-button";
import { Todo } from "@/api/types";

type Props = {
  todo: Todo;
};

export default function TodoCard({ todo }: Props) {
  const { title, description, isComplete, subTasks } = todo;
  const { mutate: setStatus } = todoStatusMutation();

  // Calculate completed subtasks
  const completedSubtasks = subTasks.filter(
    (subTask) => subTask.isComplete
  ).length;
  const totalSubtasks = subTasks.length;

  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        {/* Todo Title and Checkbox */}
        <Box display="flex" alignItems="center" gap={1}>
          <Checkbox
            checked={isComplete}
            onChange={(e) =>
              setStatus({ id: todo._id, isComplete: e.target.checked })
            }
            color="primary"
          />
          <Typography
            variant="h6"
            sx={{ textDecoration: isComplete ? "line-through" : "none" }}
          >
            {title}
          </Typography>
        </Box>

        {/* Todo Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ ml: 6, mb: 2 }}
        >
          {description}
        </Typography>

        {/* Subtasks Progress */}
        {totalSubtasks > 0 && (
          <Box sx={{ ml: 6, mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Subtasks: {completedSubtasks}/{totalSubtasks}
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap" sx={{ mt: 1 }}>
              {subTasks.map((subTask, index) => (
                <Chip
                  key={index}
                  label={subTask.title}
                  size="small"
                  variant="outlined"
                  color={subTask.isComplete ? "success" : "default"}
                  sx={{
                    textDecoration: subTask.isComplete
                      ? "line-through"
                      : "none",
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Actions */}
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <UpdateTodoButton todo={todo} />
          <DeleteTodoButton todo={todo} />
        </Box>
      </CardContent>
    </Card>
  );
}
