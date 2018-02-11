import jwt from 'jsonwebtoken'

class Auth {
  sign(payload) {
    return jwt.sign(payload, process.env.REACT_APP_AUTH_SECRET, { expiresIn: '1h' })
  }
  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.REACT_APP_AUTH_SECRET, function(err, decoded) {
        if (err) reject(err)
        if ( decoded.username === process.env.REACT_APP_AUTH_USERNAME && 
             decoded.password === process.env.REACT_APP_AUTH_PASSWORD) {
          resolve()
        } else {
          reject('Invalid username and password')
        }
      })
    })
  }
}

export default Auth