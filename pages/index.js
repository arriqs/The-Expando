import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
//import CreatePost from '../components/CreatePost';
import Link from 'next/link';
const Home = () => {
//  const [blogs, setBlogs] = useState([]);
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
/*  useEffect(() => {
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
  */
 
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
    <div>
      <Head>
        <title>Auction JS</title>
      </Head>
      <h1>Auction JS</h1>
      {notification}
      {!loggedIn 
      ?
        <div>
          <Link href="/users/register">
            <a>Register</a>
          </Link> | 
          <Link href="/users/login">
            <a> Login</a>
          </Link>
        </div>
      :
        <button onClick={handleLogout}>Logout</button>
      }
 
      {loggedIn && (user ? <h2>Hello {user.email}</h2> : console.log("User logged out"))}
    </div>
  )
}
export default Home;

/* pulled from bellow last button, but above create post
<ul>
{blogs.map(blog =>
  <li key={blog.id}>
    <Link href="/blog/[id]" as={'/blog/' + blog.id }>
      <a itemProp="hello">{blog.title}</a>
    </Link>
  </li>
)}
</ul>
{loggedIn && <CreatePost />}
*/