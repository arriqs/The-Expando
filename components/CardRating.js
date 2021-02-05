import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
  0.5: '25',
  0.75: '25.5',
  1: '26',
  1.25: '26.2',
  1.5: '26.5',
  1.75: '26.7',
  2: '27',
  2.25: '27.2',
  2.5: '27.5',
  2.75: '27.7',
  3: '28',
  3.25: '28.2',
  3.5: '28.5',
  3.75: '28.7',
  4: '29',
  4.25: '29.2',
  4.5: '29.5',
  4.75: '29.7',
  5: '30',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export default function CardRating() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.25}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>
  );
}