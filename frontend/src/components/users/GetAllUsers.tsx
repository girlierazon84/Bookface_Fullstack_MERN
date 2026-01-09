// frontend/src/components/users/GetAllUsers.tsx

import React, { useState } from "react";
import UserService from "../../utils/api/service/UserService";
import type { UserDataObject } from "../../utils/interface/UsersInterfaces";


const GetAllUsers: React.FC = () => {
  const [allUsersInDatabase, setAllUsersInDatabase] = useState<UserDataObject[]>([]);

  const getUsers = async () => {
    try {
      const res = await UserService.getAllUsers();
      setAllUsersInDatabase(res.data);
    } catch {
      setAllUsersInDatabase([]);
    }
  };

  return (
    <div>
      <button onClick={getUsers}>Get Users</button>
      <pre>{JSON.stringify(allUsersInDatabase, null, 2)}</pre>
    </div>
  );
};

export default GetAllUsers;
