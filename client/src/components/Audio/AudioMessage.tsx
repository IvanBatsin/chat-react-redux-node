import React from 'react';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons/lib/icons';
import './audioMessage.scss';
import Audio from '../../img/audio.svg';
import { timeFormatter } from '../../helpers/timeFormatter';

interface IAudioMessageProps {
  audio: string
}

export const AudioMessage: React.FC<IAudioMessageProps> = ({audio}: IAudioMessageProps): React.ReactElement => {
  const [isPlaying, setPlaying] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const audioElem = React.useRef<HTMLAudioElement>(null);

  const clearAudio = (): void => {
    setPlaying(false);
    setProgress(0);
  }

  const togglePlay = (): void => {
    audioElem.current?.paused ? audioElem.current?.play() : audioElem.current?.pause();
    setPlaying(!audioElem.current?.paused);
  } 

  const progressUpdate = (): void => {
    const totalTime = audioElem.current?.duration;
    const currentTime = audioElem.current?.currentTime;
    setProgress(currentTime! / totalTime! * 100);
    setDuration(currentTime!);
  }

  React.useEffect(() => {
    audioElem.current?.addEventListener('ended', clearAudio);
    audioElem.current?.addEventListener('timeupdate', progressUpdate);

    return () => {
      audioElem.current?.removeEventListener('ended', clearAudio);
      audioElem.current?.removeEventListener('timeupdate', progressUpdate);
    }
  }, []);
  return (
    <div className="message_bubble message_bubble_audio">
      <div className="message_audio_progress" style={{width: progress + '%'}}></div> 
      <audio src={audio} hidden ref={audioElem} preload="auto"></audio>
      <div className="message_audio_info">
          {isPlaying ? 
            <PauseCircleOutlined onClick={togglePlay} className="audio_button"></PauseCircleOutlined>
          :
            <PlayCircleOutlined  onClick={togglePlay} className="audio_button"></PlayCircleOutlined>
          }
          <img className="audio_wawe" src={Audio} alt="Audio img"></img>
          <span className="audio_duration">{timeFormatter(duration)}</span>
        </div> 
    </div>
  )
}