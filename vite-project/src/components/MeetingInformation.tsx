import { useDaily, useParticipantIds } from "@daily-co/daily-react";

export default function MeetingInformation() {
  const callObject = useDaily();
  const state = callObject?.meetingState();
  const allParticipants = useParticipantIds()?.toString();

  return (
    <ul>
      <li>Meeting state: {state ?? "unknown"}</li>
      <li>Participant IDs: {allParticipants}</li>
    </ul>
  );
}
