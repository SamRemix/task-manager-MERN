import './styles.scss'

import { memo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import cn from 'classnames'

import { motion } from 'framer-motion'
import config from './motion.config'

import useBoards from '../../hooks/useBoards'

import { Form, Button } from 'semantic-ui-react'
// import { HiOutlineTrash } from 'react-icons/hi2'

const BoardSettings = () => {
  const { board_id } = useParams()
  const navigate = useNavigate()

  const { loading, boards: board, error, getBoard, updateBoard, deleteBoard } = useBoards()

  const [title, setTitle] = useState('')

  const [visible, setVisible] = useState(false)

  const displayMessage = () => {
    !visible ? setVisible(true) : setVisible(false)
  }

  const handleSubmit = e => {
    e.preventDefault()

    updateBoard(board_id, title)
  }

  return (
    <section className="container board__settings">
      {/* <h1>{board.title}</h1> */}
      <Form onSubmit={handleSubmit}>
        <motion.div {...config.titleInputAnimation}>
          <Form.Input
            type="text"
            className={`title__input${error && ' error'}`}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            maxLength="24"
            autoFocus />
          <p className="title__input-remaining">{24 - title.length} remaining character{title.length < 23 && 's'}</p>
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          {!loading ? (
            <Form.Button className="submit" content="Update board" secondary />
          ) : (
            <Form.Button className="submit" content="Update board" loading secondary />
          )}
        </motion.div>

        {error && (
          <div
            className="error-message">
            <motion.p {...config.errorMessageAnimation}>
              {error}
            </motion.p>
          </div>
        )}
      </Form>

      <div className="board__settings-delete">
        <div className="board__settings-delete-button">
          <Button content={visible ? "Cancel" : "Delete"} secondary onClick={displayMessage} />
          {visible && (
            <Button
              {...config.deleteAnimation}
              className="btn-confirm"
              color="red"
              onClick={() => deleteBoard(board_id)}>
              yes
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default memo(BoardSettings)