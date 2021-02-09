import { Container, Typography } from '@material-ui/core';
import {React, useState, useEffect} from 'react';
import fire from '../../config/fire-config';

const Posts = () => {
    return (
        <Container>
            <Typography variant='h2'>
                Blog Posts
            </Typography>
        </Container>
    )
}

export default Posts