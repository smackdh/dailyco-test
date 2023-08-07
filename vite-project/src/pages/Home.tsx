import React from "react";

interface HomeScreenProps {
  createCall: () => Promise<string>;
  startJoiningCall: (url: string) => void;
}

export default function HomeScreen({
  createCall,
  startJoiningCall,
}: HomeScreenProps) {
  const startCall = () => {
    createCall().then((url) => startJoiningCall(url));
  };

  return (
    <div className="home-screen">
      <h1>React Daily Hooks custom video app</h1>
      <p>Start a meeting by clicking the button below</p>
      <button onClick={startCall}>Create an instant meeting</button>
      <p className="small">
        Select “Allow” to use your camera and mic for this call if prompted
      </p>
    </div>
  );
}
