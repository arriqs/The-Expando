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
            <h1>About Us</h1>
          </Grid>
          <Grid item>
            <img src="/images/dkc-lecture-auditorium.jpg" height="auto" width="100vw" style={{maxWidth:"100vw", width:"60vw", height: '80vh'}} />
          </Grid>
          <Grid item>
            <p>DEBATE-Kansas City provides students K-12 with debate workshops, tournaments, scholarships, resources, and interactive experiences. As these students matriculate into college, we continue to support them with coaching, research, and mentoring. #DKCFam is among the core elements of our approach. We pride ourselves on the lifelong connections we are able to foster with our students as, together, we build an ever-growing and lasting community. The youth with whom we are so privileged to work are dedicated to the enduring struggle of being and becoming advocates for those most vulnerable among them.
            </p>
            <br />
            <h2>DEBATE-Kansas City History</h2>
            <p>DKC program graduates have made collegiate debate history. The most famous DKC graduate is Ryan Wash. Wash a graduate of Central High, was part of the first policy debate team to ever win both collegiate debate championships in the same year for Emporia State. In April of 2013 Ryan and his partner Elijah Smith (a fellow UDL graduate from New Jersey) won the 66-year old National Debate Tournament (NDT) after winning the Cross Examination Debate Association (CEDA) tournament the weekend before. They were the first all black team to win the NDT and first team to ever win both CEDA and the NDT. The history-making tournament victories were document in The Kansas City Star. Only one other team has accomplished this tremendous achievement Devane Murphy and Nicole Nave of Rutgers University and it so happens they were coached by Mr. Ryan Wash.</p>
            <p>
              Ryan may be DKC’s greatest debater but most DKC graduates find success in college, life and industry. Our community has so many vibrant and captivating stories it would be impossible to relate them all here.
            </p>
            <p>DKC supports students, coaches and members of the community in expanding their horizons through critical thinking and argument. Since 1998, DKC has provided thousands of students the opportunity to learn and grow by participating in academic debate. DEBATE-Kansas City has served 852 active participants this season.</p>
            <p>DKC held 12 tournaments with 1,938 total entries this season, an 18% increase over the previous season. DKC also held two student workshops, four coach professional development trainings, a summer camp for students and coaches, as well as hosted a public engagement workshop for coaches and students. Additionally, DKC provided students substantial research support, over 450 on-site visits and mentoring from DKC graduates and college debaters culminating in over 1000 hours of mentoring to our member schools. DKC also engages and activates hundreds of volunteers in the community to judge at our tournaments and mentor in our schools.</p>
            <p>One unique aspect of the DKC program is how it serves students from sixth grade to college graduation. A student can literally grow up with DKC. In addition to its regular middle and high school services, DKC provides opportunities for local college students to act as mentors to DKC students via our coaching connections program. These mentoring partnerships include UMKC, KU, Johnson County Community College, and Kansas City Kansas Community College. DKC is also instrumental in connecting our students to scholarships and college opportunities across the country.</p>
            <p>DKC has mounted a robust and timely response to the COVID-19 pandemic, insuring full programming and activities are afforded to students and teachers. Following CDC guidelines, DKC has moved all operations online to insure the safety of the league. This has included video-conferencing for student coaching/mentoring, online speech competitions, a live stream of our annual awards night celebration on YouTube, and a transfer of league content, resources, and curriculum to an online format to supplement asynchronous learning.</p>
            <p>DKC has primed itself to launch all debate competitions and activities in an online format in the fall if schools remain closed. This will include the summer debate camp, student workshops, professional developments for coaches, and fully operational debate tournaments. COVID-19 has created a significant strain on our league and partners, but through innovative planning DKC will continue to offer speech and debate to the KC Metro without pause or interruption. Now more than ever, speech and debate stand as a vital component of education and civic engagement.</p>
            <h2>Success by the Numbers</h2>
            <h3>Major Publications Supporting Urban Debate</h3>
            <h4>Educational Research Spring 2019 The BUDL Effect</h4>
            <p>This study adds to the limited literature based on extracurricular debate, examining a 10-year longitudinal sample of Baltimore City Public School System students.</p>
            <h4>Journal of Negro Education, Summer 2015</h4>
            <p>Positive Youth Development and Participation in an Urban Debate League: Results from Chicago Public Schools, 1997-2007 Susannah Anderson Policy & Research Group of New Orleans Briana Mezuk Virginia Commonwealth University Research suggests that participation in co-curricular and extracurricular activities improves students’ academic outcomes.</p>
            <h4>Minnesota Public Schools Evaluation of the Urban Debate Program 2014-2015</h4>
            <p>The evaluation found that UDL has the potential to be a positive addition to MPS schools out-of-school time offerings.</p>
            <h4>Journal of Adolescence 1997-2007</h4>
            <p>This study investigates the relationship between participating in a high school debate program on college-readiness in the Chicago Public School district over a 10-year period.</p>
            <h4>Educational Research and Reviews September, 2011</h4>
            <p>This study investigates the relationship between participating in a high school debate program on college-readiness in the Chicago Public School district over a 10-year period.</p>
            <p>Allen, Mike; Berkowitz, Sandra; Hunt, Steve; and Louden, Allen. “Measuring the Impact of Forensics and Communication Education on Critical Thinking: A Meta-Analytic Summary.” Presented at the Annual Meeting of the National Communication Association, Chicago. November, 1997</p>
            <p>Hall, G. (2006). Civic connections: Urban debate and democracy in action during out-of-school time.  Afterschool Matters: Occasional Paper Series, 7.Debaters are significantly more likely to become engaged democratic citizens</p>
            <h2>Testimonials</h2>
            <p>DEBATE-Kansas City has impacted thousands of students, educators and community members. The following are a few testimonials that demonstrate the effect that this powerful activity can have at the individual-level.</p>
            <p>“The biggest gift that debate gives students is a belief in themselves. I know of few other classes that can make that statement. After success at their first few encounters with debates, students see themselves in a different way. It becomes obvious that by working at this activity they can do anything. That is the “magic”, if you will, that happens in the debate room.” <br /> – Jane Rinehart, <span>Member of DKC Coaches Hall of Fame</span></p>
            <p>“..School lets out at about 2:15, and that leaves plenty of hours before the parents get home for kids just to roam the streets. And that’s where their problems really tend to happen, immediately after school. And there’s just nothing to do. People starting losing faith and reasons to come to school because they don’t see what’s at the end of the road, and that’s what debate provides.” <br /> – Marcus Leach, <span>DKC alumni and recent Howard Law graduate on NPR’s Talk of the Nation</span></p>
            <p>The award-winning 2006 book Cross-X chronicled the success of Central’s debate team. Head coach Jane Rinerhart inspired debaters like Marcus Leach to break barriers and win championships.</p>
            <p>“Wash said he saved his education by joining Central’s debate team, which traveled to private prep schools across the Midwest.” <br /> - Ryan Wash DKC Alumnus commenting in the Kansas City Star 2010</p>
            <p>“To be a part of that top 20 – you could have told me that I got twentieth and it would have felt like first place,” Williams- Green said. It resonated and was very symbolic for me…it’s a white male dominant activity and so for any minority to come in and do well is not only unheard of but speaks volumes to the evolutionary patterns of debate – it was good, it was real good.” <br /> – LaToya Green-Williams, DKC Alumnus commenting on her national speaking award in the ESU Bulletin, 2011</p>
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
