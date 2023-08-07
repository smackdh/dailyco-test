import { useEffect, useRef } from "react";
import { useMediaTrack } from "@daily-co/daily-react";

interface TileProps {
  id: string;
  isScreenShare: boolean;
}

export default function Tile({ id, isScreenShare }: TileProps) {
  const videoTrack = useMediaTrack(id, isScreenShare ? "screenVideo" : "video");
  const audioTrack = useMediaTrack(id, isScreenShare ? "screenAudio" : "audio");

  const videoElement = useRef<HTMLVideoElement | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    /*  The track is ready to be played. We can show video of the remote participant in the UI.*/
    if (videoTrack?.state === "playable" && videoTrack.persistentTrack) {
      const videoMediaStream = new MediaStream([videoTrack.persistentTrack]);
      videoElement.current &&
        (videoElement.current.srcObject = videoMediaStream);
    }
  }, [videoTrack]);

  useEffect(() => {
    if (audioTrack?.state === "playable" && audioTrack.persistentTrack) {
      const audioMediaStream = new MediaStream([audioTrack.persistentTrack]);
      audioElement?.current &&
        (audioElement.current.srcObject = audioMediaStream);
    }
  }, [audioTrack]);

  return (
    <div className={isScreenShare ? "tile-screenshare" : "tile-video"}>
      {videoTrack && <video autoPlay muted playsInline ref={videoElement} />}
      {audioTrack && <audio autoPlay playsInline ref={audioElement} />}
    </div>
  );
}
