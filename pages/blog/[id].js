import fire from '../../config/fire-config';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
const Blog = (props) => {
  const content = props.content;
  return (
    <Container maxWidth='sm'>
    <div>
      <Grid container justify='center'>
        <Grid item>
          <h2>{props.title}</h2>
        </Grid>
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
    });
return {
    props: {
      title: content.title,
      content: content.content,
    }
  }
}
export default Blog