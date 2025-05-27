import { useState, useEffect, useRef } from 'react';

export const useAudio = (url: string) => {
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      const audio = new Audio(url);
      audio.loop = true;
      audioRef.current = audio;
    }
    
    // Play or pause based on state
    if (playing) {
      // Use a user interaction to trigger audio play (autoplay policies)
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented
          // Show a UI element to let the user manually start playback
          setPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [playing, url]);
  
  const togglePlay = () => {
    setPlaying(!playing);
  };
  
  return { playing, togglePlay };
};