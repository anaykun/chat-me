import { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chats({
  userName,
  roomId,
  socket,
  message,
  setMessage,
  sendMessage,
  listMessage,
}) {
  const [listChat, setListChat] = useState(listMessage);

  useEffect(() => {
    setListChat(listMessage);
  });
  return (
    <div>
      <div className="chat-header bg-light">
        <h3 className="text-danger text-center">Chatme-Live {roomId}</h3>
      </div>
      <div className="" style={{ height: "89vh" }}>
        <ScrollToBottom className="chat-body d-flex">
          {listChat.map((itemMessage, index) => {
            return (
              <div
                key={index}
                className=" d-flex"
                id={userName === itemMessage.author ? "you" : "other"}
              >
                <div className="mb-2 message-you ">
                  <div className="align-justify message-content">
                    <p className=" align-justify text-light h6 fw-light mb-1 px-3 py-1 bg-danger rounded">
                      {itemMessage.message}
                    </p>
                  </div>
                  <div className="fw-lighter h6 d-flex text-light message-meta">
                    <p id="time" className="m-0 mx-2">
                      {itemMessage.time}
                    </p>
                    <p id="author" className="m-0">
                      {itemMessage.author}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer d-flex">
        <input
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          className="form-control"
          type="text"
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button type="button" onClick={sendMessage} className="btn btn-danger">
          &#9658;
        </button>
      </div>
    </div>
  );
}
