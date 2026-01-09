// frontend/src/components/users/GetUsersById.tsx

import React, { useState } from "react";
import UserService from "../../utils/api/service/UserService";
import type { UserDataObject } from "../../utils/interface/UsersInterfaces";


const GetUsersById: React.FC = () => {
  const [id, setId] = useState("");
  const [oneUser, setOneUser] = useState<UserDataObject | null>(null);

  const getUser = async () => {
    try {
      const res = await UserService.getUserById(id);
      setOneUser(res.data);
    } catch {
      setOneUser(null);
    }
  };

  return (
    <div>
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder="User id" />
      <button onClick={getUser}>Get</button>
      <pre>{JSON.stringify(oneUser, null, 2)}</pre>
    </div>
  );
};

export default GetUsersById;
