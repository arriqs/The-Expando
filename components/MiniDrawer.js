import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import SchoolIcon from '@material-ui/icons/School';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Collapse from '@material-ui/core/Collapse';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '../components/Carousel';
import NavTabs from '../components/NavTabs';
import ExpandoCard from '../components/ExpandoCard';
import CutCard from '../components/CutCard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MiniDrawer(props) {
  const { blogs, PageContent, notification, loggedIn, handleLogout, user } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
            <Grid container justify="space-between">
              <Grid item>
                <IconButton 
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton></Grid>
              <Grid item>
                <Typography variant='h6'>
                  DEBATE-Kansas City
                </Typography>
                <Typography>
                  The Expando
                </Typography>
              </Grid>
              <Grid item>
                { props.loggedIn && props.user 
                  ?
                  <>
                  <Typography>{props.user.email}</Typography> 
                  </>
                  :
                  <></>
                }
              </Grid>
            </Grid>
          </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <div style={{ paddingTop: 1 + 'em' }}></div>
        <List>
            <Link href='/' replace>
              <ListItem button key={"Home"}>
                <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link href='/'>
              <ListItem button key={"Browse All Courses"}>
                <ListItemIcon><SchoolIcon /></ListItemIcon>
                <ListItemText primary={"Browse All Courses"} />
              </ListItem>
            </Link>
              <ListItem button key="Blog" onClick={handleMenuClick}>
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary="Blog" />
                {openMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={openMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {blogs.map(blog =>
                    <Link href='/blog/[id]' as={'/blog/' + blog.id} replace>
                      <a style={{ textDecoration: 'none' }} >
                        <ListItem button className={classes.nested}>
                          <ListItemText primary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {blog.title}
                              </Typography>
                            </>
                          } />
                          
                        </ListItem>
                      </a>
                    </Link>
                  )}
                </List>
              </Collapse>
              <Link href='https://shop.debatekansascity.org'>
                <a target='_blank' style={{ color: 'black', textDecoration: 'none' }}>
                  <ListItem button key={"Shop"}>
                    <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                    <ListItemText primary={"Shop"} />
                  </ListItem>
                </a>
              </Link>
              <Link href='https://debatekansascity.org/contribute'>
                <a target='_blank' style={{ color: 'black', textDecoration: 'none' }}>
                  <ListItem button key={"Donate"}>
                    <ListItemIcon><LocalAtmIcon /></ListItemIcon>
                    <ListItemText primary={"Donate"} />
                  </ListItem>
                </a>
              </Link>
        </List>
        <Divider />
        <List>
          { props.loggedIn ?
            <>
              <Link href='/editor' passHref>
                <a>
                  <ListItem button key={"Create"}>
                    <ListItemIcon><EditIcon /></ListItemIcon>
                    <ListItemText primary={"Create"} />
                  </ListItem>
                </a>
              </Link>
              <Link href='/'>
                <ListItem button key={"My Courses"}>
                  <ListItemIcon><CollectionsBookmarkIcon /></ListItemIcon>
                  <ListItemText primary={"My Courses"} />
                </ListItem>
              </Link>
              <Link href='/'>
                <ListItem button key={"My Account"}>
                  <ListItemIcon><FingerprintIcon /></ListItemIcon>
                  <ListItemText primary={"My Account"} />
                </ListItem>
              </Link>
              <ListItem button key={"Logout"}>
                <ListItemIcon><LockIcon onClick={props.handleLogout} /></ListItemIcon>
                <ListItemText primary={ props.loggedIn ? "Logout" : "Login" } />
              </ListItem>
            </>
            :
            <>
              <Link href='/users/login'>
                <ListItem button key={"Login"}>
                  <ListItemIcon><LockOpenIcon /></ListItemIcon>
                  <ListItemText primary={"Login"} />
                </ListItem>
              </Link>
              <Link href='/users/register'>
                <ListItem button key={"Register"}>
                  <ListItemIcon><PersonAddIcon /></ListItemIcon>
                  <ListItemText primary={"Register"} />
                </ListItem>
              </Link>
            </>
          }
        </List>
      </Drawer>
      <PageContent
        blogs={blogs}
        notification={notification}
      />
    </div>
  );
}
