import React, { useState } from 'react';
import fire from '../config/fire-config';
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button'
import TestCard from './TestCard';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Image from 'next/image';
import BookIcon from '@material-ui/icons/Book';
import CardRating from './CardRating';

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
  avatar: {
    backgroundColor: red[500],
  },
}));


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');
  const classes = useStyles();
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);

  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore()
      .collection('blog')
      .add({
        title: title,
        content: content,
      });
    setTitle('');
    setContent('');
    setNotification('Card created');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  return (
    <div>
      <h3>Add Card</h3>
      {notification}
      <Draggable>
        <div>
          <Card className={classes.root}>
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
              title="Angela Davis"
              subheader="Are Prisons Obsolete? (2003)"
            />
            <Collapse in={expanded1} timeout="auto" unmountOnExit>
            <Image alt="Angela Davis sits with pen and paper." src="/images/angela_davis1.jpg" className={classes.media} title="Angela Takes Notes" width={1000} height={1000} />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
              "An activist. An author. A scholar. An abolitionist. A legend, as revered by my generation of millennials as she is her own. She is Angela Y. Davis." - Ibram X. Kendi
              </Typography>
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
                "We would recognize that 'punishment' does not follow from 'crime' in the neat and logical sequence offered by discourses that insist on the justice of imprisonment, but rather punishment - primarily through imprisonment (and sometimes death) - is linked to the agendas of politicians, the profit drive of corporations, and media representations of crime" (112).
                </Typography>
                <CardRating />
              </CardContent>
            </Collapse>
            </Collapse>
          </Card>
        </div>
      </Draggable>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField value={title} onChange= {({target}) => setTitle(target.value)} type="text" placeholder="Tag"></TextField>
        </div>
        <br />
        <div>
          <TextareaAutosize value={content} onChange={({target}) => setContent(target.value)} aria-label="minimum height" rowsMin={3} placeholder="Type in your content" />
        </div>
        <br />
        <Button variant='contained' color='primary' type="submit">Save</Button>
        <br />
        <br />
      </form>
    </div>
  )
}
export default CreatePost;