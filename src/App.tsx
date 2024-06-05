import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { PokeList } from '@components/PokeList'
import { useState } from 'react'

export function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [autoFetch, setAutoFetch] = useState(true)

  return (
    <>
      <Header
        searchTermState={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
        handleSwitch={(checked) => setAutoFetch(checked)}
      />

      <PokeList searchTerm={searchTerm} autoFetch={autoFetch} />

      <Footer />
    </>
  )
}
