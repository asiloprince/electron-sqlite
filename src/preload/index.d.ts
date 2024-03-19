interface User {
  id: number
  name: string
  // Add other properties as needed
}

declare global {
  interface Window {
    electron: {
      fetchUsers: () => Promise<User[]>
      submitForm: (data: any) => void
    }
  }
}

export {}
