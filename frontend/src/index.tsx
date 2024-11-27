import {createRoot} from 'react-dom/client'
import {App} from './App/App'
import {StrictMode} from 'react'
import {Provider} from 'react-redux'
import './index.css'
import store from './redux/store'
const root = createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
)

