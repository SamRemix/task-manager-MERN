import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { motion } from 'framer-motion'
import config from './motion.config'

import { formatDistanceToNowStrict } from 'date-fns'

import { useTasksContext } from "../../hooks/useTasksContext"

import axios from '../../axios.config'

import { HiCheckCircle, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'

const SingleTask = ({ _id, title, description, status, important, createdAt }) => {
  const { dispatch } = useTasksContext()


  const updateStatus = async () => {
    const response = await axios.patch(`/tasks/${_id}`, {
      status: status === 'To do' ? 'In progress' : 'Done'
    })

    dispatch({ type: 'UPDATE_TASK', payload: response.data })
  }

  const deleteTask = async () => {
    const response = await axios.delete(`/tasks/${_id}`)

    dispatch({ type: 'DELETE_TASK', payload: response.data })
  }

  const setDate = date => (
    formatDistanceToNowStrict(new Date(date), { addSuffix: true })
  )

  return (
    <motion.div
      className={cn('task__content', { 'task__content--important': important })}
      layoutId={_id}
      {...config.singleTaskAnimation}>

      <div className="task__content-infos">
        <p className="task__content-infos-title">{title}</p>
        {description && <p className="task__content-infos-description">{description}</p>}
      </div>

      <div className="task__content-footer">
        <p className="task__content-footer-date">{setDate(createdAt)}</p>
        <p className={cn({
          'task-importance--high': important,
          'task-importance--low': !important
        })}>
          {important ? 'high' : 'low'}
        </p>
        {status !== 'Done' && (
          <div className="button">
            <HiCheckCircle size="1.4em" className="button-validate" onClick={updateStatus} />
            <p className="button-title">{status === 'To do' ? 'In progress' : 'Done'}</p>
          </div>
        )}

        <Link className="button" to={`/update-task/${_id}`}>
          <HiOutlinePencilSquare size="1.4em" className="button-update" />
          <p className="button-title">Update</p>
        </Link>

        <div className="button">
          <HiOutlineTrash size="1.4em" className="button-delete" onClick={deleteTask} />
          <p className="button-title">Delete</p>
        </div>
      </div>
    </motion.div>
  )
}

SingleTask.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dsecription: PropTypes.string,
  status: PropTypes.string.isRequired,
  important: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired
}

SingleTask.defaultProps = {
  dsecription: ''
}

export default memo(SingleTask)