const jwt = require('jsonwebtoken')
import * as dotenv from 'dotenv'

dotenv.config()

export async function accessTokenGenerator(id: number, email: string): Promise<string> {
  let token: string = jwt.sign(
    {
      userId: id,
      email: email,
      iat: Math.floor(Date.now() / 1000),
      // exp: Math.floor(Date.now() / 1000) + 7199, // 카카오 토큰 기준과 동일 (약 2시간)
      exp: Math.floor(Date.now() / 1000) + 7199, //! 테스트: 15초 //! 자꾸 샷다 내려가서 늘려놓음
    },
    process.env.ACCESS_SECRET,
  )
  //console.log('uat', token);
  return token
}
