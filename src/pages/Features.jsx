import React from 'react'
import sm_banner_1 from '../assets/sm_banner_1.png'

function Features() {
  return (
    <>
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
                <img src={sm_banner_1} alt="img" className="mx-auto rounded-lg shadow-lg dark:bg-gray-500" />
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
                  <img src={sm_banner_1} alt="" className="mx-auto rounded-lg shadow-lg dark:bg-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </section>            
        </div>
    </>
  )
}

export default Features
