async function createRoom() {
  // const exp = Math.round(Date.now() / 1000) + 60 * 30;
  // const options = {
  //   properties: {
  //     exp,
  //   },
  // };

  const response = await fetch(
    "http://localhost:8000/api/videosdk/meetingroom/create",
    {
      method: "POST",
    }
  );

  const data = await response.json();
  const roomData = data.room_data;
  console.log(roomData);
  return roomData;
}

export default { createRoom };
