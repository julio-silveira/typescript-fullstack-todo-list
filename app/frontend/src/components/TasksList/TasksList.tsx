import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material'
import React, { useContext, useState } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { ITaskState } from '../../@types/taskTypes'
import { IFetchLoginMessage } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import { deleteTask, editTask } from '../../helpers/taskFetch'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box } from '@mui/system'

interface IOnEditTask {
  onEdit: boolean
  task: number | null
}

const INITIAL_ON_EDIT_TASK: IOnEditTask = {
  onEdit: false,
  task: null
}

const TasksList: React.FC = () => {
  const { userTasks, updateTasks, openModalWithContent } = useContext(
    AppContext
  ) as ContextType

  const [onEditTask, setOnEditTask] =
    useState<IOnEditTask>(INITIAL_ON_EDIT_TASK)
  const [taskValues, setTaskValues] = useState<ITaskState>({
    status: false,
    description: ''
  })

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target

    const newValue = type === 'checkbox' ? !checked : value
    setTaskValues((prevState) => ({
      ...prevState,
      [name]: newValue
    }))
  }

  const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type } = event.target
    const componentId = Number(id)
    if (type === 'checkbox' && !onEditTask.onEdit) {
      const { id, userId, status, description } = userTasks[componentId]
      await editTask({ id, userId, status: !status, description })
      updateTasks()
    }
  }

  const handleEditBtn = async (
    index: number,
    id: number | string,
    userId: number | string
  ) => {
    if (onEditTask.onEdit) {
      const { status, description } = taskValues
      const { message } = (await editTask({
        id,
        userId,
        status,
        description
      })) as IFetchLoginMessage
      updateTasks()
      setOnEditTask(INITIAL_ON_EDIT_TASK)
      if (message !== undefined) {
        openModalWithContent(message, 'success')
      }
    } else {
      const { status, description } = userTasks[index]
      setTaskValues({ status, description })
      setOnEditTask({ onEdit: true, task: index })
    }
  }

  const handleDelBtn = async (id: number | string, userId: number | string) => {
    const { message } = (await deleteTask(id, userId)) as IFetchLoginMessage
    updateTasks()
    if (message !== undefined) {
      openModalWithContent(message, 'success')
    }
  }

  return (
    <List>
      {userTasks.map(({ id, userId, status, description }, index) => (
        <ListItem style={{ margin: '10px' }} key={index}>
          {onEditTask.onEdit && onEditTask.task === index ? (
            <TextField
              color="primary"
              variant="filled"
              size="small"
              onChange={handleChange}
              id="taskDescription"
              name="description"
              label="Adicionar Tarefa"
              value={taskValues.description}
            />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                id={`${index}`}
                name="status"
                checked={status}
                onChange={handleCheck}
              />

              <ListItemText>{description}</ListItemText>
            </Box>
          )}
          <IconButton
            onClick={() => handleEditBtn(index, id, userId)}
            type="button"
          >
            <ModeEditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => handleDelBtn(id, userId)} type="button">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}

export default TasksList
