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
            <h1>Debater Resources</h1>
          </Grid>
          <Grid item>
            <img src="/images/books3.jpg" height="auto" width="100vw" style={{maxWidth:"100vw", width:"60vw", height: '80vh'}} />
          </Grid>
          <Grid item>
            <p>DEBATE-Kansas City has provided support to over 10,000 students since 1998. DKC offers middle and high school students the opportunity to compete in policy debate and student congress. Below, students can access our Camp Application (we ask that all camp attendees complete the Student Participation Form), and various resources that can aid their research and help them prepare for competetion.</p>
            <h2>Camp Materials</h2>
            <p>DKC Camp Application</p>
            <p>Student Participation Form (Required)</p>
            <br />
            <h2>Student Congress</h2>
            <p>2021 Student Congress Legislation</p>
            <br />
            <h2>2021 Policy Evidence</h2>
            <h3>Camp 2021</h3>
            <p>DKC Camp 2021 Affirmative</p>
            <p>DKC Camp 2021 Negative</p>
            <br />
            <h3>Open Source</h3>
            <p>NAUDL</p>
            <p>NDCA Open Evidence</p>
            <p>NDCA Open Video</p>
            <p>Debate Central</p>
            <p>Cross-x.com</p>
            <p>Planet Debate (Partially Free)</p>
            <br />
            <h2>Research Resources</h2>
            <h3>General Search Guidance</h3>
            <p>Use terms from the debate topic resolution or congress legislation.</p>
            <p>Start general, then get more specific based on what you conclude from the books and articles that you read. You may cast your net wide as you begin, then refine your search. As you gather results, you will gain a better understanding of what you need, and can further narrow your focus. Throughout this process</p>
            <p>Look for cited works, and mine the citations. If you are reading an article, and it references another author's work, look up the cited work as well. This will help you deepen your understanding of the field and potentially find other useful articles.</p>
            <p>Note authors who get cited throughout multiple academic books and journals. This will allow you to gain a sense of said author's standing in their field. Additionally, you can google their name to see what other works they have produced. Often, writers will publish more than once about the same subject.</p>
            <h3>Research with Google</h3>
            <p>Google is generally considered the best search engine around. The search tips above directly apply for using Google. In addtion, here are a few other tips:</p>
            <ul>
              <li>
                <h4>Filter by date:</h4>
                <p>After searching you can use the "more search tools" bar on the left to narrow your search to the newest articles. You can also limit down to the last year, month, week, etc.</p>
              </li>
              <li>
                <h4>Filter by PDF Filetype:</h4>
                <p>There are two ways you can filter your results by filetype: a) use the advanced search settings or b) add parameters after your search terms. To accomplish the former: click on the advanced search button below the search box. Use the "file type" tool to limit search results to only PDF documents. To filter your search using the latter method, simply type "filetype:pdf" after your enter your desired keywords.</p>
              </li>
            </ul>
            <br />
            <h3>Research with Google News</h3>
            <p>If you are looking for the most recent information on a topic then Google News is a great option. Google News generally limits results to articles in the past 30 days. To search older articles, you need to click "Advanced News Search". Next, click the "Archive Search" button. You can then adjust the dates to keep your results recent.</p>
            <br />
            <h3>Research with Google Scholar</h3>
            <p>Google Scholar searches only academic books and journals, making it very useful for finding credible sources. The only problem is that many of the journals require a subscription.</p>
            <br />
            <h3>Research with Think Tanks</h3>
            <ul>
              <li>Here is a list of think tanks that you can use a basis to begin your search: <a>Think Tanks List</a></li>
              <li>University of Michigan Database</li>
            </ul>
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
