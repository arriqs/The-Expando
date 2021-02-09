import { Container, Typography, Grid } from '@material-ui/core';
import {React, useState, useEffect} from 'react';
import fire from '../../config/fire-config';
import ExpandoCard from '../../components/ExpandoCard';
import MiniDrawer from '../../components/MiniDrawer';

const Posts = () => {
  // Blogs
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
  // User Authentication
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
  // Page Content
  function PageContent() {
    return (
      <Container maxWidth='md'>
        <Grid container>
          <Grid item>
            <Typography style={{ paddingTop: 2 + 'em', paddingBottom: 0.75 + 'em' }} variant='h2'>
              Blog Posts
            </Typography>
          </Grid>
          <Grid container justify='space-evenly' alignItems='center' item>
            {blogs.map(blog =>
            <Grid item>
                <ExpandoCard expandedOnLoad={true} id={blog.id} imgTitle={blog.imgTitle} imgAlt={blog.imgAlt} imgPath={blog.imgPath} title={blog.title} author={blog.author} preview={blog.preview} imgHeight={blog.imgHeight} imgWidth={blog.imgWidth} content={blog.content} value='content' />
            </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    )
  }
  return (
    <MiniDrawer
      blogs={blogs}
      loggedIn={loggedIn} 
      handleLogout={handleLogout}
      user={user}
      PageContent={PageContent}
    />
  )
}

export default Posts