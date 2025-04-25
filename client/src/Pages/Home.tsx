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
// import Lenovo from './Lenovo';
// import Testing from './Pages/Testing';
// import Border from './Components/Border';
// import YouTubeEmbed from './Pages/Video'
// import PageScroll from './Pages/PageScroll';
// import PageScroll from './Pages/PageScroll';
// import Dashboard from './Dashboard';
export default function Home() {
  const buttonText = "Ask AI for Specifications"
  const buttonText2 = "Trending laptops"
  return (
    <div className='w-full h-screen bg-black'>
      <div className='navbar line flex gap-10 absolute top-0 left-1/2 -translate-x-1/2 m-4 border-gray-500'>{["Home", "Services", "Ask AI", "Payments", "Your Orders", "Stay in Touch"].map((e) => (<a href='' className='text-gray-500 font-[500] text-sm'>{e}</a>))}</div>
      <div className="absolute flex flex-col items-center top-40 left-1/2 -translate-x-1/2    

        
      text-white text-center">

        <h3 className='masked text-6xl tracking-tighter font-[600] text-center'><ExampleComponent /></h3>
        {/* <h5 className='text-white text-center'>Oh so pro!</h5> */}
        <p className='text-center w-[3/4] text-gray-500 m-4'>All rights reserved | 2025</p>
        <div className='flex flex-row'>
          <Button text={buttonText} />
          <Button text={buttonText2} />

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
  );
}
