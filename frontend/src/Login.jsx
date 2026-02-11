import React, { useState } from 'react'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    if(!email) return 'Email is required.'
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    if(!re.test(email)) return 'Enter a valid email.'
    if(!password) return 'Password is required.'
    if(password.length < 6) return 'Password must be at least 6 characters.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const v = validate()
    if(v){ setError(v); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSuccess(true)
  }

  if(success) return (
    <div className="success">
      <p>Signed in successfully — welcome to Water Quality Monitor.</p>
    </div>
  )

  return (
    <form className="login-form" onSubmit={handleSubmit} aria-label="login form">
      {error && <div className="error" role="alert">{error}</div>}

      <label className="field">
        <span className="label">Email</span>
        <input
          type="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="enter your gmail address"
          required
        />
      </label>

      <label className="field">
        <span className="label">Password</span>
        <input
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder="Your password"
          required
          minLength={6}
        />
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={remember}
          onChange={e=>setRemember(e.target.checked)}
        />
        <span>Remember me</span>
      </label>

      <button className="btn" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>

      <div className="help">
        <a href="#">Forgot password?</a>
      </div>
    </form>
  )
}
