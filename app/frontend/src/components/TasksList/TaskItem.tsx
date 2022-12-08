import React from 'react'
import { Box, Checkbox, IconButton, ListItemText } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

interface IProps {
  index: number
  status: boolean
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void
  description: string
  id: number | string
  userId: number | string
  handleEditBtn: (
    index: number,
    id: number | string,
    userId: number | string
  ) => void
  onEdit: boolean
}

interface ITaskItem {
  props: IProps
}

const TaskItem: React.FC<ITaskItem> = ({
  props: {
    index,
    status,
    handleCheck,
    description,
    id,
    userId,
    handleEditBtn,
    onEdit
  }
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        id={`${index}`}
        name="status"
        checked={status}
        onChange={handleCheck}
      />

      <ListItemText>{description}</ListItemText>
      {!onEdit && (
        <IconButton
          onClick={() => handleEditBtn(index, id, userId)}
          type="button"
        >
          <ModeEditIcon color="primary" fontSize="small" />
        </IconButton>
      )}
    </Box>
  )
}

export default TaskItem
