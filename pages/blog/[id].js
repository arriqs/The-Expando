import fire from '../../config/fire-config';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import MiniDrawer from '../../components/MiniDrawer'

import { useState, useEffect, React } from 'react';





const Blog = (props) => {
  function PageContent() {
    return (
      <div style={{ paddingTop: 5 + 'em' }}>
        <Grid container justify='center'>
          <Grid item>
            <h2>{props.title}</h2>
          </Grid>
          <br />
          {notification}
          <br/>
          <Grid item>
          { props.imgPath ? <Image alt={props.imgAlt} src={props.imgPath} width={props.imgWidth} height={props.imgHeight} style={{ overflow: 'hidden' }} /> : null }
          </Grid>
          <br />
          <br />
          <Grid item>
            {content.map(paragraph =>
            <>
              <Typography variant='body2'>{paragraph}</Typography>
              <br />
            </>
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
  const content = props.content;
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
export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('blog')
    .doc(query.id)
    .get()
    .then(result => {
      content['title'] = result.data().title;
      content['content'] = result.data().content;
      content['imgPath'] = result.data().imgPath;
      content['imgAlt'] = result.data().imgAlt;
      content['imgHeight'] = result.data().imgHeight;
      content['imgWidth'] = result.data().imgWidth;
    });
  return {
    props: {
      title: content.title,
      content: content.content,
      imgPath: content.imgPath,
      imgAlt: content.imgPath,
      imgHeight: content.imgHeight,
      imgWidth: content.imgWidth,
    }
  }
}
export default Blog