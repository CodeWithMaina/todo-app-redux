import { Provider } from 'react-redux'
import './App.css'
import { TodoComponent } from './components/TodoComponent'
import { store } from './app/store'

function App() {

  return (
    <>
      <Provider store={store}>
        <TodoComponent/>
      </Provider>
    </>
  )
}

export default App
