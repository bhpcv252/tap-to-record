import { useEffect, useState } from 'react';
import prettyMilliseconds from 'pretty-ms';
import slugify from 'react-slugify';

import { randomSentence } from './utils';

import { useAudioRecorder } from 'react-audio-voice-recorder';

import speakerImg from './assets/speaker-filled-audio-tool.png';
import recordImg from './assets/voice.png';
import stopRecordingImg from './assets/stop-button.png';
import refreshImg from './assets/refresh.png';
import './App.css';



function App() {
  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder();

  const [uploadStatus, setUploadStatus] = useState('');
  const [currentSentence, setCurrentSentence] = useState(randomSentence());
  const [audioBlob, setAudioBlob] = useState({
    blob: '',
    url: ''
  });

  const resetAudioBlob = () => {
    setAudioBlob({
      blob: '',
      url: ''
    });
  }

  const startRec = () => {
    resetAudioBlob();
    setUploadStatus('');
    startRecording();
  }

  const refreshSentence = () => {
    setCurrentSentence(randomSentence());
    resetAudioBlob();
  }

  const submitAudio = () => {
    const filename = slugify(currentSentence) + "-" + new Date().getTime() + ".webm";

    // Trigger file upload here with filename and audioBlob.blob
    // Could be like uploadFile(audioBlob.blob, filename)
    // Set upload status accordingly

    setUploadStatus('File uploaded!');
    refreshSentence();
  }

  useEffect(() => {
    if (!recordingBlob) return;
    const url = URL.createObjectURL(recordingBlob);
    setAudioBlob({
      blob: recordingBlob,
      url
    })

  }, [recordingBlob])

  return (
    <div className="app" id='app'>

      <div className="word-wrapper">
        <div className='left'>
          <img src={speakerImg} className='word-icon' />
          <span>{ currentSentence }</span>
        </div>
        <div className='right'>
          <img src={refreshImg} className='refresh-icon' title='Refresh Sentence' onClick={refreshSentence}/>
        </div>
      </div>

      <div className="recording-wrapper">
        <div className='img-wrapper'>
          <img src={stopRecordingImg} className='stop-icon' onClick={stopRecording}/>
          <img src={recordImg} className={`record-icon ${isRecording? 'hide' : ''}`} onClick={startRec} />
        </div>
        <p className='status'>{isRecording? prettyMilliseconds(recordingTime*1000, {verbose: true}) : 'Tap to Record'}</p>
      </div>
      
      { audioBlob.blob && <div className="result-wrapper">
        <audio src={audioBlob.url} controls></audio>
        <div className="btns-wrapper">
          <button type="button" className="rerecord-btn" onClick={startRec}>
            Re-record
          </button>
          <button type="button" className="submit-btn" onClick={submitAudio}>
            Submit
          </button>
        </div>
      </div>}

      {
        uploadStatus && <p className="upload-status">{ uploadStatus }</p>
      }
    </div>
  );
}

export default App;
