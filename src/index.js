import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root'),
)
