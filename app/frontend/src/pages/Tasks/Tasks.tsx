/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { Loading } from '../../components/Loading'
import { Modal } from '../../components/Modal'
import { TaskForm } from '../../components/TaskForm'
import { TasksList } from '../../components/TasksList'
import AppContext from '../../context/AppContext'

export default function Tasks() {
  const { loading, userTasks, isModalOpen, updateTasks } = useContext(
    AppContext
  ) as ContextType

  useEffect(() => {
    const getTasks = async () => {
      updateTasks()
    }
    getTasks(), []
  }, [])

  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {loading ? <Loading /> : <TasksList />}
      <TaskForm />
      {isModalOpen && <Modal />}
    </Box>
  )
}
