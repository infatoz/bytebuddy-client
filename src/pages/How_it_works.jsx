import React from 'react'
import banner1 from '../assets/banner1.png'
import Container from '@mui/material/Container'

function How_it_works() {
  return (
    <>
      <div className='banner my-32'>
          <Container id="how-it-works" maxWidth="lg">
            <img src={banner1} alt="banner" />
          </Container>
        </div>
    </>
  )
}

export default How_it_works
