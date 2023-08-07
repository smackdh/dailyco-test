import {
  useLocalParticipant,
  useParticipantIds,
  useScreenShare,
  useVideoTrack,
} from "@daily-co/daily-react";
import { useEffect, useRef } from "react";
import Tile from "./Tile";

function Call() {
  const localParticipant = useLocalParticipant();
  const session_id = localParticipant?.session_id ?? "";
  const videoTrack = useVideoTrack(session_id);
  const localVideoElement = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoTrack?.persistentTrack) {
      localVideoElement?.current &&
        ((localVideoElement.current.srcObject =
          videoTrack.persistentTrack &&
          new MediaStream([videoTrack?.persistentTrack])),
        [videoTrack.persistentTrack]);
    }
  }, [videoTrack]);

  /* This is for displaying remote participants: this includes other humans, but also screen shares. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { screens } = useScreenShare();
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });

  return (
    <div className="self-view">
      <video autoPlay muted playsInline ref={localVideoElement} />
      {remoteParticipantIds.map((id) => (
        <Tile key={id} id={id} isScreenShare={false} />
      ))}
    </div>
  );
}

export default Call;
