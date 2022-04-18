import Chats from "./components/Chats";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

let socket;
export default function App() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [listMessage, setListMessage] = useState([]);

  const joinRoom = (event) => {
    event.preventDefault();
    if (userName !== "" && roomId !== "") {
      socket.emit("join room", roomId);
      setShowChat(true);
    }
  };

  const sendMessage = async () => {
    if (message !== "") {
      const dataMessage = {
        room: roomId,
        author: userName,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send message", dataMessage);
      // setListMessage([dataMessage]);
      setListMessage((list) => [...list, dataMessage]);
      setMessage("");
      console.log("ini send data:", dataMessage);
    }
  };

  //connect to socket io
  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER_URL || "http://localhost:4001");

    setMessage();
    setRoomId();

    socket.on("receive message", (data) => {
      setListMessage((list) => [...list, data]);
      console.log("ini data :", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="App">
      <div
        className="d-flex flex-column align-items-center justify-content-center bg-dark"
        style={{ height: "100vh" }}
      >
        {!showChat ? (
          <form action="" className="form-control p-5">
            <div className="text-center my-3">
              <h3>
                Welcome to{" "}
                <span className="text-danger fw-bold text-uppercase fs-1">
                  Chat-me
                </span>
              </h3>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="ID room"
                onChange={(event) => {
                  setRoomId(event.target.value);
                }}
              />
            </div>
            <div className="mb-3 d-grid">
              <button onClick={joinRoom} className="btn btn-primary ">
                Let's Join
              </button>
            </div>
          </form>
        ) : (
          <div className="container-fluid container-md  p-0">
            <Chats
              socket={socket}
              userName={userName}
              roomId={roomId}
              sendMessage={sendMessage}
              message={message}
              setMessage={setMessage}
              listMessage={listMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
