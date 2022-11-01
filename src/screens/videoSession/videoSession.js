import React, { useState } from "react";
import TableCustom from "../../components/Table";
import { UserData } from "../../data/User";
import CreateSession from "./createSession";

const VideoSessionContainer = () => {
  const [table, setTable] = useState(true);
  const [sessionType, setSessionType] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const handleTable = () => {
    if (table) {
      setTable(false);
    } else {
      setTable(true);
    }
  };

  const handleSession = (e) => {
    setSessionType(e);
  };

  const handleUserId = (e) => {
    setSelectedUser(e);
  };
  return (
    <>
      <div className="box shadow">
        {table && (
          <TableCustom
            data={UserData}
            setTable={handleTable}
            sessionType={handleSession}
            selectedUserId={handleUserId}
          />
        )}
        {sessionType == "videoCall" && (
          <>
            <CreateSession selectedUserId={selectedUser} />
          </>
        )}
        {sessionType == "gameSession" && <>gmae</>}
      </div>
    </>
  );
};

export default VideoSessionContainer;
