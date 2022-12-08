import React from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'

interface IProps {
  index: number
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  taskValues: { status: boolean; description: string }
  id: number | string
  userId: number | string
  handleEditBtn: (
    index: number,
    id: number | string,
    userId: number | string
  ) => void
  handleDelBtn: (id: number | string, userId: number | string) => void
}

interface ITaskItem {
  props: IProps
}

const TaskOnEdit: React.FC<ITaskItem> = ({
  props: {
    handleChange,
    taskValues,
    index,
    id,
    userId,
    handleEditBtn,
    handleDelBtn
  }
}) => {
  return (
    <Box>
      <TextField
        color="primary"
        variant="outlined"
        size="small"
        onChange={handleChange}
        id="taskDescription"
        name="description"
        value={taskValues.description}
      />
      <IconButton
        onClick={() => handleEditBtn(index, id, userId)}
        type="button"
      >
        <DoneIcon color="primary" fontSize="small" />
      </IconButton>
      <IconButton onClick={() => handleDelBtn(id, userId)} type="button">
        <DeleteIcon color="primary" fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default TaskOnEdit
