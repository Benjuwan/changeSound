import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { GetDataTypeContextFlagment } from './providers/GetDataContextProvider'
import { PlaySoundContextFlagment } from './providers/PlaySoundContextProvider'
import { AudioPlayContextFlagment } from './providers/AudioPlayContextProvider'
import { SrcNumberingContextFlagment } from './providers/SrcNumberingContextProvider'
import { GetFetchDatasContextFlagment } from './providers/GetFetchDatasContextProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GetDataTypeContextFlagment>
      <PlaySoundContextFlagment>
        <AudioPlayContextFlagment>
          <SrcNumberingContextFlagment>
            <GetFetchDatasContextFlagment>
              <App />
            </GetFetchDatasContextFlagment>
          </SrcNumberingContextFlagment>
        </AudioPlayContextFlagment>
      </PlaySoundContextFlagment>
    </GetDataTypeContextFlagment>
  </React.StrictMode>,
)