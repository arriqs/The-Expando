import dynamic from "next/dynamic";
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import MiniDrawer from '../../components/MiniDrawer';
import fire from '../../config/fire-config';
import { useState, useEffect, React } from 'react';
import { Container, Grid } from "@material-ui/core";
import { convertToHTML } from 'draft-convert';


const Edit = dynamic(
  () => {
    return import("../../components/Edit");
  },
  { ssr: false }
);

function PageContent() {
  return (
    <>
      <Grid container>
        <Grid item>
          <h1 style={{ textAlign: 'center', paddingTop: 6 + 'em', paddingBottom: 2 + 'em' }}>Create New Post</h1>
        </Grid>
        <Grid item>
          <Edit />
        </Grid>
        <Grid item>
          <Link href="/">
            <Button>
              <a>Home</a>
            </Button>
          </Link>
        </Grid>
      </Grid>

      <br />
    </>
  )
}


export default function Home() {
  // Content

  // Firestore
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
  return (
    <Container maxWidth='md'>
      <div style={{ minHeight: "1000px" }}>
        <MiniDrawer 
          blogs={blogs}
          loggedIn={loggedIn} 
          handleLogout={handleLogout}
          user={user}
          PageContent={PageContent}
        />
      </div>
    </Container>
    
  );
}