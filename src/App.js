import './App.css';
import test from './images/video/bg-StandbyScreen.png'
import vide1 from './images/video/cccd.mp4'
import vide from './images/video/van_tay.mp4'
import Slide from './ViewPager';

function App() {
  const mediaItems = [
    { type: 'video', src: vide1 },
    { type: 'video', src: vide },
    { type: 'image', src: test },

  ];

  return (
    <div>
    <h1>Media Viewer</h1>
    <Slide mediaItems={mediaItems}/>
  </div>
  );
}

export default App;
