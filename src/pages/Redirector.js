import axios from 'axios'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'

const Redirector = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const history = useHistory()
  const location = useLocation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const code = location.search.split('code=')[1]
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('client_id', process.env.REACT_APP_KAKAO_CLIENT_ID)
    params.append('redirect_uri', process.env.REACT_APP_KAKAO_REDIRECT_URL)
    params.append('code', code)

    const kakaoRes = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      withCredentials: false,
      data: params,
    })
      .then((data) => data.data)
      .catch((err) => {
        if (err.response.status === 500 || err.response.status === 400) {
          console.debug('')
          alert('카카오 서버요청이 정상적으로 처리되지 않았습니다.')
          history.push('/login')
          throw new Error('요청 에러')
        }
      })
    console.debug(kakaoRes.access_token)

    const tokenRes = await axios({
      method: 'post',
      url: '/users/join-by-oauth',
      headers: {
        Authorization: `bearer ${kakaoRes.access_token}`,
      },
      data: { provideType: 'KAKAO' },
    })
      .then((data) => data.data)
      .catch((err) => {
        console.error(err)
        if (err.response === 500 || err.response === 400) {
          alert('서버요청이 정상적으로 처리되지 않았습니다.')
          history.push('/login')
        }
      })

    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common[
      'Authorization'
    ] = `bearer ${tokenRes.act.token}`

    history.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div></div>
}
export default Redirector
