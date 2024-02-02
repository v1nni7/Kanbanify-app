import {
  useState,
  Dispatch,
  ReactNode,
  createContext,
  SetStateAction,
} from 'react'

type Session = {
  name: string
  email: string
  photo: string
}

type SessionContextProps = {
  session: Session
  setSession: Dispatch<SetStateAction<Session>>
}

const SessionContext = createContext<SessionContextProps>({} as any)

export default function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({} as any)

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  )
}
