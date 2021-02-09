import { Container, Typography, Grid } from '@material-ui/core';
import {React, useState, useEffect} from 'react';
import fire from '../../config/fire-config';
import ExpandoCard from '../../components/ExpandoCard';

const Posts = () => {
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
  return (
    <Container maxWidth='md'>
      <Grid container>
        <Grid item>
          <Typography style={{ padding: 0.75 + 'em' }} variant='h2'>
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

export default Posts