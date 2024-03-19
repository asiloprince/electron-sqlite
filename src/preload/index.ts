// // preload/index.ts
// import { contextBridge, ipcRenderer } from 'electron'

// type Data = {
//   name: string
//   // Add other properties as needed
// }

// const api = {
//   ipcRenderer: {
//     send: (channel: string, data: Data): void => ipcRenderer.send(channel, data),
//     on: (channel: string, func: (args: Data) => void): void => {
//       ipcRenderer.on(channel, (event, args) => func(args))
//     }
//   }
// }

// // Use `contextBridge` APIs to expose Electron APIs to
// // renderer only if context isolation is enabled, otherwise
// // just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', api)
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   // @ts-ignore (define in dts)
//   window.electron = api
// }

import { contextBridge, ipcRenderer } from 'electron'

interface User {
  id: number
  name: string
  // Add other properties as needed
}

const api = {
  fetchUsers: async (): Promise<User[]> => {
    return ipcRenderer.invoke('fetch-users')
  },
  submitForm: async (data: User): Promise<void> => {
    ipcRenderer.send('form-submission', data)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = api
}
