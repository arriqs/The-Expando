import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import styled from 'styled-components';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ExpandoCard from '../components/ExpandoCard';
import Carousel from '../components/Carousel';
import MiniDrawer from '../components/MiniDrawer';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


/*
Set a variable called defaultEndpoint that simply defines our default API endpoint
Define our getServerSideProps function that we’ll use to fetch our data
In that function, we first use the fetch API to make a request to our endpoint
With it’s response, we run the json method so that we can grab the output in JSON format
Finally, we return an object where we make our data available as a prop in the props property
*/
const defaultEndpoint = `https://api.nasa.gov/planetary/apod?api_key=QxfSkRP2kxtifimAVC8EGEgKjrvW5gzQS7JjBHms`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

function PageContent(props) {
  const { notification, blogs } = props;
  return (
    <Container maxWidth='md'>
      <Grid container justify alignItems='center'>
        <br />
        <br />
        <Toolbar></Toolbar>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item>
            <h1>Contact</h1>
          </Grid>
          <Grid item>
            <img src="/images/apple-on-books.jpg" height="auto" width="100vw" style={{maxWidth:"100vw", width:"60vw", height: '80vh'}} />
          </Grid>
          <Grid item>
            <h2>Talk to Us</h2>
            <p>We would love to hear your feeback. Being in touch with our community is priority number one. You can give us a piece of your mind by emailing us at debtekc@gmail.com</p>
            <p>We are also active on <a>Facebook</a> and <a>Twitter</a></p>
            
          </Grid>
           
        </Grid>
      </Grid>
    </Container>
  )
}



const Home = ( { data } ) => {
  console.log('data', data);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false)
      }
    })
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fire.firestore()
      .collection('blog')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
        
      });
  }, []);
// Card
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [cite1, setCite1] = useState('');
  const [cite2, setCite2] = useState('');
  const [content, setContent] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore()
      .collection('blog')
      .add({
        title: title,
        tag: tag,
        cite1: cite1,
        cite2: cite2,
        content: content,
      });
    setTitle('');
    setTag('');
    setCite1('');
    setCite2('');
    setContent('');
    setNotification('Card created');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  
  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('Logged out')
        setTimeout(() => {
          setNotification('')
        }, 2000)
      });
  }
  const user = fire.auth().currentUser;
   
 /*
  useEffect(() => {
    firebaseCloudMessaging.init()
  }, [])
*/
  return (
    <Container maxWidth="md">
      <div>
        <Head>
          <title>DKC JS</title>
        </Head>
        <Container2>
          <MiniDrawer  
            blogs={blogs} 
            notification={notification} 
            loggedIn={loggedIn} 
            handleLogout={handleLogout}
            user={user}
            PageContent={PageContent}
          />
        </Container2>
      </div>
    </Container>
  )
}

const Container2 = styled.p`
  paddingTop: 2em;
  background: ${props => props.theme.secondary};
`

export default Home;
