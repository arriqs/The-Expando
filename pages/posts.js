import fire from '../config/fire-config';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import MiniDrawer from '../components/MiniDrawer'
import { useState, useEffect, React } from 'react';
import ExpandoCard from '../components/ExpandoCard'

const Posts = () => {
    useEffect(() => {
        fire.firestore()
          .collection('blog')
          .onSnapshot(snap => {
            const blogs = snap.docs.map(doc => ({
              id: doc.id,
              imgTitle: doc.imgTitle,
              imgAlt: doc.imgAlt,
              imgPath: doc.imgPath,
              title: doc.title,
              ...doc.data()
            }));
            setBlogs(blogs);
            
          });
      }, []);
    function PageContent() {
      return (
        <div style={{ paddingTop: 5 + 'em' }}>
          <Grid container justify='center'>
            <Grid item>
                <Typography style={{ paddingBottom: 0.5 + 'em' }} variant='h2'>
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
          <Link href="/">
            <a>Back</a>
          </Link>
        </div>
      )
    }
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
    return (
      <Container maxWidth='sm'>
        <div>
            <MiniDrawer
                blogs={blogs}
                loggedIn={loggedIn} 
                handleLogout={handleLogout}
                user={user}
                PageContent={PageContent}
            />
        </div>
      </Container>
    )
  }

export default Posts
