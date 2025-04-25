import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ScrollControls } from '@react-three/drei';
import MacContainer from './MacContainer';
import Interior from './Interior'
import TypewriterEffect from './Components/TyperEffect'
import ExampleComponent from '@/components/ExampleComponent';
// import TypewriterEffect, { ExampleComponent } from './Components/TyperEffect';
// import './App.css'
import Midpage from './Components/Midpage';
import Button from '@/components/Button';
import Footer from '@/components/ui/Footer';
import Chatbot from './Chatbot';
import Navbar from '@/components/Navbar';

// import Lenovo from './Lenovo';
// import Testing from './Pages/Testing';
// import Border from './Components/Border';
// import YouTubeEmbed from './Pages/Video'
// import PageScroll from './Pages/PageScroll';
// import PageScroll from './Pages/PageScroll';
// import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const buttonText = "Ask AI for Specifications"
  const buttonText2 = "Trending laptops";
  const button3 = "ListofLaptops"
  const navigate = useNavigate();




  const handleChatbotClick = () => {
    navigate('/chatbot');
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {/* <Midpage /> */}
      {/* <TypewriterEffect /> */}
      {/* <YouTubeEmbed /> */}
      {/* <PageScroll /> */}
      {/* <Border /> */}
      {/* <Testing /> */}
      {/* <Interior /> */}
      {/* <Lenovo /> */}
      <div className='w-full h-screen bg-black'>

        <div className="absolute flex flex-col items-center top-40 left-1/2 -translate-x-1/2    

        
      text-white text-center">

          <h3 className='masked text-6xl tracking-tighter font-[600] text-center'><ExampleComponent /></h3>
          {/* <h5 className='text-white text-center'>Oh so pro!</h5> */}
          <p className='text-center w-[3/4] text-gray-500 m-4'>All rights reserved | 2025</p>
          <div className='flex flex-row gap-4'>
            {/* Button to navigate to Chatbot */}
            <Button text={buttonText} onClick={() => navigate('/chatbot')} />
            <Button text={buttonText2} onClick={() => navigate('/products')} />
          </div>

        </div>
        <Canvas camera={{ fov: 20, position: [0, -10, 150] }}>

          <Environment
            files={[
              "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_09_2k.hdr"
            ]} />
          <ScrollControls pages={3}>

            <MacContainer />
          </ScrollControls>
          {/* <Dashboard/> */}



        </Canvas>

        <div className="absolute flex flex-col items-center bottom-[120px] left-1/2 -translate-x-1/2    

        
text-gray-600 text-center">
          Design from macbook pro.

        </div>





        <div className='line bg-black'></div>



        <div>
          <Footer />
        </div>




      </div>

    </div>
  );
}
