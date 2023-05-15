import { LOGIN_REDIRECT_URL, TWITCH_CLIENT_ID, TWITCH_STATE } from '../config/config'

function Login () {
  // 'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=ox3m7d9n4crc6au1j4402kc05j2651&redirect_uri=http://localhost:5173&scope=&state=c3ab8aa609ea11e793ae92361f002671'

  return (
    <>
      <a className='login-button' href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${TWITCH_CLIENT_ID}&redirect_uri=${LOGIN_REDIRECT_URL}&scope=&state=${TWITCH_STATE}`}>Sign in</a>

    </>
  )
}

export default Login
