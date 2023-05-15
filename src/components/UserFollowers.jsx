import { BiLinkExternal } from 'react-icons/bi'
import { TWITCH_CLIENT_ID } from '../config/config'

function UserFollowers ({ followsData, setFollows }) {
  const loadMoreUsers = (userid, afterPagination) => {
    const TOKEN = localStorage.getItem('token')

    fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userid}&first=100&after=${afterPagination}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Client-Id': TWITCH_CLIENT_ID
      }
    })
      .then(data => data.json())
      .then(dataJson => {
        setFollows({
          ...followsData,
          data: [...followsData.data, ...dataJson.data],
          pagination: dataJson.pagination
        })
      })
      .catch(err => console.log(err))

    setFollows({
      ...followsData,
      data: [...followsData.data]
    })
  }

  const showTotal = (totalFollows) => {
    return (
      <tr>
        <td colSpan={2}>Total follows: {totalFollows}</td>
      </tr>
    )
  }

  return (
    <>
      <table className='table-followers'>
        <thead>
          <tr>
            <td>User</td>
            <td>Date</td>
          </tr>
          {followsData.total && showTotal(followsData.total)}
        </thead>
        <tbody>
          {followsData.data && followsData.data.map((el, index) => {
            return (
              <tr key={index}>
                <td><a className='link-twitch-username' href={`https://www.twitch.tv/${el.to_login}`} target='_blank' rel='noreferrer'>{el.to_login}<BiLinkExternal /></a></td>
                <td>{new Date(el.followed_at).toLocaleString()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {followsData.pagination?.cursor && <button onClick={() => loadMoreUsers(followsData.userid, followsData.pagination.cursor)}>Load more</button>}
    </>
  )
}

export default UserFollowers
