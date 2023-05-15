import { ClipLoader } from 'react-spinners'

function Loading () {
  return (
    <div className='loading'>
      <ClipLoader color='#52d9ff' size={250} cssOverride={{ borderWidth: '10px' }} />
    </div>
  )
}

export default Loading
