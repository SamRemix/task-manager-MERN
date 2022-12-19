import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from '../axios.config'

const initialState = {
  loading: null,
  data: null,
  error: null
}

const LOADING = 'LOADING'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'

const postReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        data: null,
        error: null
      }

    case SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null
      }

    case ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const usePost = url => {
  const [state, dispatch] = useReducer(postReducer, initialState)

  const navigate = useNavigate()

  const postData = async (data, redirect) => {
    dispatch({ type: LOADING })
    try {
      const response = await axios.post(url, data)

      dispatch({ type: SUCCESS, data: response.data })

      navigate(redirect)
    } catch (err) {
      dispatch({ type: ERROR, error: err.response.data.error })
    }
  }

  return {
    ...state,
    postData
  }
}

export default usePost