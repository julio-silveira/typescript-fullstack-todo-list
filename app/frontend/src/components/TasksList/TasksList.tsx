import { Box, Divider, List, ListItem } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { ITaskState } from '../../@types/taskTypes'
import { IFetchLoginMessage } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import { deleteTask, editTask } from '../../helpers/taskFetch'
import TaskItem from './TaskItem'
import TaskOnEdit from './TaskOnEdit'

interface IOnEditTask {
  onEdit: boolean
  task: number | null
}

const INITIAL_ONEDIT_TASK: IOnEditTask = {
  onEdit: false,
  task: null
}

const INITIAL_TASK_VALUES: ITaskState = {
  status: false,
  description: ''
}

const TasksList: React.FC = () => {
  const { userTasks, updateTasks, openModalWithContent } = useContext(
    AppContext
  ) as ContextType

  const [onEditTask, setOnEditTask] = useState<IOnEditTask>(INITIAL_ONEDIT_TASK)
  const [taskValues, setTaskValues] = useState<ITaskState>(INITIAL_TASK_VALUES)

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
      setTaskValues(INITIAL_TASK_VALUES)
      setOnEditTask(INITIAL_ONEDIT_TASK)
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
    <>
      {userTasks.length > 0 ? (
        <List
          sx={{
            mt: 2,
            mb: 8,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {userTasks.map(({ id, userId, status, description }, index) => (
            <Box key={index}>
              <ListItem
                sx={{
                  mb: 1,
                  maxWidth: '90%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {onEditTask.onEdit && onEditTask.task === index ? (
                  <TaskOnEdit
                    props={{
                      handleChange,
                      taskValues,
                      index,
                      id,
                      userId,
                      handleEditBtn,
                      handleDelBtn
                    }}
                  />
                ) : (
                  <TaskItem
                    props={{
                      index,
                      status,
                      handleCheck,
                      description,
                      id,
                      userId,
                      handleEditBtn,
                      onEdit: onEditTask.onEdit
                    }}
                  />
                )}
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      ) : (
        <p>Adicione uma Tarefa!</p>
      )}
    </>
  )
}

export default TasksList
