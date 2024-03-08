import React from 'react'
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container'
// import Footer from '../components/Footer'

function Home() {
  return (
    <>
     <Stack spacing={12}>
        <div className='hero-section'>
        <section className="dark:bg-gray-100 dark:text-gray-800">
          <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
            <div className="flex flex-col justify-center p-6 mx-20 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
              <h1 className="text-5xl font-bold leadi sm:text-6xl">Empower Your Coding Journey with 
                <span className="dark:text-violet-800"> ByteBuddy</span>
              </h1>
              <p className="mt-6 mb-8 text-lg sm:mb-12">
                <br  className="hidden md:inline lg:hidden" />
              </p>
              <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-800 dark:text-gray-100">Start Coding Now</a>
                <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800">Go to Playground</a>
              </div>
            </div>
            <div className="flex items-center justify-center p-32 mt-8 lg:mt-0 h-90 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
              <img src="logo.png" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
            </div>
          </div>
        </section>
        </div>
        <div className='banner'>
          <Container id="how-it-works" maxWidth="lg">
            <img src="banner1.png" alt="banner" />
          </Container>
        </div>
        <div id="features" className="support">
        <section className="dark:bg-gray-100 dark:text-gray-800">
          <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
            <div>
              <h2 className="text-3xl font-bold tracki text-center sm:text-5xl dark:text-gray-900">Code,Learn & Excel.</h2>
              <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-700">Simplify learning coding with an AI assistant. Master coding with step-by-step guidance, interactive challenges, and personalized learning paths. Enhance skills with integrated resources and community collaboration, all within one IDE.</p>
            </div>
            <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 className="text-2xl font-bold tracki sm:text-3xl dark:text-gray-800">Let Bytebuddy give you hints</h3>
                <p className="mt-3 text-lg dark:text-gray-700">ByteBuddy serves as an intelligent coding assistant, helping students understand and solve complex coding problems with real-time guidance.</p>
                <div className="mt-12 space-y-12">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leadi dark:text-gray-800">Problem-Solving Assistance</h4>
                      <p className="mt-2 dark:text-gray-700">Offers step-by-step guidance, hints, and suggestions to assist students when they are stuck while solving coding challenges.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leadi dark:text-gray-800">Progress Tracking</h4>
                      <p className="mt-2 dark:text-gray-700">Track and boost your coding progress.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leadi dark:text-gray-800">Integrated IDE</h4>
                      <p className="mt-2 dark:text-gray-700">Code on the go.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="mt-10 lg:mt-0">
                <img src="sm_banner_1.png" alt="img" className="mx-auto rounded-lg shadow-lg dark:bg-gray-500" />
              </div>
            </div>
            <div>
              <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                <div className="lg:col-start-2">
                  <h3 className="text-2xl font-bold tracki sm:text-3xl dark:text-gray-900">Customize your learning experience</h3>
                  <p className="mt-3 text-lg dark:text-gray-700">Come try a wide range of coding challenges everyday in various programming languages and domains, designed to expand your skills and knowledge!</p>
                  <div className="mt-12 space-y-12">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leadi dark:text-gray-800">Streak Maintainance</h4>
                      <p className="mt-2 dark:text-gray-700">Maintain Streak and improve your coding efficiency</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leadi dark:text-gray-800">Adaptive Learning Paths</h4>
                      <p className="mt-2 dark:text-gray-700">It understands your learning patterns, and suggests the best way of learning.</p>
                    </div>
                  </div>
                 
                  </div>
                </div>
                <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                  <img src="sm_banner_1.png" alt="" className="mx-auto rounded-lg shadow-lg dark:bg-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </section>            
        </div>
      </Stack> 
    </>
  )
}

export default Home
