import { Box, Typography } from '@mui/material'
import React from 'react'
import bg from '../bg.jpg'
const Home = () => {
  return (
    <Box px={4} py={8}>
        <Typography component='h1' variant='h1' sx={{background:`url(${bg}) no-repeat bottom /cover`, color:'transparent', backgroundClip:'text', fontWeight:'bolder'}} >
            Congratulations! <br/>You have logged in.
        </Typography>
    </Box>
  )
}

export default Home