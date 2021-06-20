import Draggable from 'react-draggable'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Typography from "@material-ui/core/Typography"
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Image from 'next/image';
import BookIcon from '@material-ui/icons/Book';
import CardRating from '../components/CardRating';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Link from 'next/link'



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
}));



export default function ExpandoCardStaff(props) {
  const expandedOnLoad = props.expandedOnLoad;
  const [expanded1, setExpanded1] = React.useState(expandedOnLoad);
  const [expanded2, setExpanded2] = React.useState(false);
  const [collapseIn, setCollapseIn] = React.useState(false);
  const classes = useStyles();
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


  const handleExpandClick1 = () => {
    setExpanded1(!expanded1)
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2)
  };
    
  return (
      <> 
            <div>
              <Card elevation={4} className={classes.root}>
                <CardHeader
                  avatar={
                    <BookIcon />
                  }
                  action={
                    <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded1,
                    })}
                    onClick={handleExpandClick1}
                    aria-expanded={expanded1}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                  }
                  title={props.title}
                  subheader={props.author}
                />
                <Collapse in={expanded1} timeout="auto" unmountOnExit>
                  { props.imgPath ? <Image alt={props.imgAlt} src={props.imgPath} className={classes.media} title={props.imgTitle} width={props.imgWidth} height={props.imgHeight} style={{ overflow: 'hidden' }} /> : null }  
                <CardContent>
                  <Typography style={{ textAlign: 'center' }} variant="body2" color="textSecondary" component="p">
                  {props.imgAlt}
                  </Typography>
                  <br />
                  <Divider />
                  <br />
                  <Typography variant="body2" color="textPrimary" component="p">
                  {props.preview}
                  </Typography>
                  <br />
                  <Link href='/blog/[id]' as={'/blog/' + props.id}>
                      <a style={{ textDecoration: 'none' }} >
                        <IconButton>
                          <Typography variant='subtitle1' component='p'>
                            Read More &nbsp;
                          </Typography>
                          <ArrowRightAltIcon />
                        </IconButton>
                      </a>
                  </Link>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded2,
                    })}
                    onClick={handleExpandClick2}
                    aria-expanded={expanded2}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded2} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      Key Excerpt:
                    </Typography>
                    <Typography paragraph>
                      {props.preview}
                    </Typography>
                    <CardRating />
                  </CardContent>
                </Collapse>
                </Collapse>
              </Card>
              <br />
            </div>
      </>
    )
}