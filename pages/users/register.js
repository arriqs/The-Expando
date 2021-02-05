import { useState } from 'react'; 
import fire from '../../config/fire-config';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
const Register = () => {
  const router = useRouter();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notification, setNotification] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setNotification(
       'Password and password confirmation does not match'
      )
      setTimeout(() => {
        setNotification('')
      }, 2000)
      setPassword('');
      setPassConf('');
      return null;
      }
    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message)
      });
    router.push("/")
  }
  return (
    <div>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item>
            <h1>Register a new account</h1>
          </Grid>
          <Grid item>
            {notification}
          </Grid>
          <Grid item>
            <ButtonGroup>
                <TextField value={userName} onChange= {({target}) => setUsername(target.value)} type="text" placeholder="Enter your email"></TextField>
                <TextField value={password} onChange= {({target}) => setPassword(target.value)} type="password" placeholder="Create your password"></TextField>
                <TextField value={passConf} onChange= {({target}) => setPassConf(target.value)} type="password" placeholder="Confirm your password"></TextField>        
                <Button onClick={handleLogin} variant='contained' color='primary' type="submit">Register</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
    </div>
  )
}
export default Register