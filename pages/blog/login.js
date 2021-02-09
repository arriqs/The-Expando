import React from 'react';
import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err.code, err.message)
        setNotification(err.message)
        setTimeout(() => {
          setNotification('')
        }, 2000)
      })
    setUsername('')
    setPassword('')
    router.push("/")
  }
  return (
    <div>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <h1>Login</h1>
        </Grid>
        <Grid item>{notify}</Grid>
        <Grid item>
          <ButtonGroup>
            <form onSubmit={handleLogin}>
              <TextField value={username} onChange= {({target}) => setUsername(target.value)} type="text" placeholder="Enter your email"></TextField>
              <TextField value={password} onChange= {({target}) => setPassword(target.value)} type="password" placeholder="Enter your password"></TextField>
              <Button variant='contained' color='primary' type="submit">Login</Button>
            </form>
          </ButtonGroup>
        </Grid>
      </Grid>
    </div>
  )
}
export default Login