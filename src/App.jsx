import { useEffect, useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Loading from './components/Loading'

import { TWITCH_STATE } from './config/config'

function App () {
  const [panel, setPanel] = useState('loading')

  useEffect(() => {
    const urlHash = document.location.hash
    const hashRegex = /^#access_token=.+&scope=.*&state=.+&token_type=bearer/

    if (localStorage.getItem('token')) {
      fetch('https://id.twitch.tv/oauth2/validate', {
        headers: {
          Authorization: `OAuth ${localStorage.getItem('token')}`
        }
      })
        .then(data => data.json())
        .then(data => {
          if (data.status && data.status === 401) {
            setPanel('login')
          } else {
            setPanel('dashboard')
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else if (urlHash && hashRegex.test(urlHash) && urlHash.includes(TWITCH_STATE)) {
      const token = urlHash.substring('#access_token='.length, urlHash.indexOf('&'))

      localStorage.setItem('token', token)
      setPanel('dashboard')
    } else {
      setPanel('login')
    }
  }, [])

  return (
    <>
      <h1 className='title'>Get twitch follows</h1>
      {panel === 'login' && <Login />}
      {panel === 'dashboard' && <Dashboard />}
      {panel === 'loading' && <Loading />}
    </>
  )
}

export default App
