import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'

import { TWITCH_CLIENT_ID } from '../config/config'
import UserFollowers from './UserFollowers'

function Dashboard () {
  const [userFollowers, setUserFollowers] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const TWITCH_USERNAME = e.target.username.value
    const TOKEN = localStorage.getItem('token')

    if (!TWITCH_USERNAME) {
      toast('You must send a valid username.')
      return
    }

    setUserFollowers([])
    setLoading(true)

    const USER_DATA = await fetch(`https://api.twitch.tv/helix/users?login=${TWITCH_USERNAME}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Client-Id': TWITCH_CLIENT_ID
        }
      }
    )

    const USER_DATA_JSON = await USER_DATA.json()

    if (USER_DATA_JSON.error) {
      toast('Something went wrong. :(')
      setLoading(false)
      return
    }

    if (USER_DATA_JSON.data.length === 0) {
      toast('User not found.')
      setLoading(false)
      return
    }

    const USER_ID = USER_DATA_JSON.data[0].id

    const USER_FOLLOWS_DATA = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${USER_ID}&first=100`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Client-Id': TWITCH_CLIENT_ID
        }
      }
    )

    const USER_FOLLOWS_DATA_JSON = await USER_FOLLOWS_DATA.json()

    if (USER_FOLLOWS_DATA_JSON.error) {
      toast('Something went wrong. :(')
      setLoading(false)
      return
    }

    setLoading(false)
    setUserFollowers({ ...USER_FOLLOWS_DATA_JSON, userid: USER_ID })
  }

  return (
    <>
      <div className='dashboard'>
        <div className='form-div'>
          <form onSubmit={handleSubmit} className='form-user'>
            <input type='text' id='username' className='input-user' />
            <input type='submit' value='Enviar' className='input-send-user' />
          </form>
        </div>
        <div className='users-followers'>
          <UserFollowers followsData={userFollowers} setFollows={setUserFollowers} />
          <ClipLoader color='#52d9ff' loading={loading} size={150} cssOverride={{ marginTop: '20px', borderWidth: '10px' }} />
        </div>
      </div>
      <Toaster
        position='bottom-center'
        toastOptions={{
          style: {
            border: '1px solid #ff3056',
            padding: '16px',
            color: '#ff3056'
          }
        }}
      />
    </>
  )
}

export default Dashboard
