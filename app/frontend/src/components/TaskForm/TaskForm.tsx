import { Box, Fab, IconButton, Paper, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { ITaskState } from '../../@types/taskTypes'
import { IFetchLoginMessage } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import { saveTask } from '../../helpers/taskFetch'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { useNavigate } from 'react-router-dom'
import { clearLocalStorage } from '../../helpers/localStorage'

const INITIAL_TASK_VALUES: ITaskState = {
  status: false,
  description: ''
}

const TaskForm: React.FC = () => {
  const { updateTasks, openModalWithContent } = useContext(
    AppContext
  ) as ContextType
  const navigate = useNavigate()
  const [taskValues, setTaskValues] = useState<ITaskState>(INITIAL_TASK_VALUES)
  const [creatingTask, setCreatingTask] = useState(false)

  const handleLogout = () => {
    clearLocalStorage()
    navigate('/')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setTaskValues((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const { message } = (await saveTask(taskValues)) as IFetchLoginMessage
    updateTasks()
    setTaskValues(INITIAL_TASK_VALUES)
    setCreatingTask(false)
    if (message !== undefined && taskValues.description !== '') {
      openModalWithContent(message, 'success')
    } else if (message !== undefined) openModalWithContent(message, 'error')
  }
  return (
    <Paper
      elevation={2}
      sx={{
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        bgcolor: '#4fc3f7'
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          py: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <ListAltIcon sx={{ px: 2 }} fontSize="large" color="primary" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {creatingTask ? (
            <>
              <IconButton
                sx={{ position: 'absolute', right: '0', zIndex: 1 }}
                onClick={handleSubmit}
              >
                <AddIcon color="primary" />
              </IconButton>
              <TextField
                color="primary"
                variant="outlined"
                size="small"
                onChange={handleChange}
                id="description"
                label="Adicionar tarefa"
              />
            </>
          ) : (
            <Fab
              color="primary"
              size="small"
              onClick={() => setCreatingTask(true)}
            >
              <AddIcon fontSize="large" />
            </Fab>
          )}
        </Box>

        <Box sx={{ display: 'flex', px: 2 }}>
          <IconButton onClick={handleLogout}>
            <LogoutIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  )
}

export default TaskForm
