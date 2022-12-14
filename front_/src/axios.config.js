import axios from 'axios'

const token = JSON.parse(localStorage.getItem('user'))?.token

const instance = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

export default instance