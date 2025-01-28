import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { GetDataTypeContextFlagment } from './providers/GetDataContextProvider'
import { PlaySoundContextFlagment } from './providers/PlaySoundContextProvider'
import { AudioPlayContextFlagment } from './providers/AudioPlayContextProvider'
import { GetFetchDatasContextFlagment } from './providers/GetFetchDatasContextProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GetDataTypeContextFlagment>
      <PlaySoundContextFlagment>
        <AudioPlayContextFlagment>
          <GetFetchDatasContextFlagment>
            <App />
          </GetFetchDatasContextFlagment>
        </AudioPlayContextFlagment>
      </PlaySoundContextFlagment>
    </GetDataTypeContextFlagment>
  </React.StrictMode>,
)