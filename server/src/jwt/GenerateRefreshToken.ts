const jwt = require('jsonwebtoken')
import * as dotenv from 'dotenv'

dotenv.config()

export async function refreshTokenGenerator(id: number, email: string): Promise<string> {
  let token: string = jwt.sign(
    {
      userId: id,
      email: email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 한 달
      // exp: Math.floor(Date.now() / 1000) + 60 * 2, //! 테스트용 2분
    },
    process.env.REFRESH_SECRET,
  )
  //console.log('urt', token);
  return token
}
