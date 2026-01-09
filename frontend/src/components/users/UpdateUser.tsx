// frontend/src/components/users/UpdateUser.tsx

import React, { useState } from "react";
import UserService from "../../utils/api/service/UserService";
import type { UpdateUserObject, UserDataObject } from "../../utils/interface/UsersInterfaces";


const UpdateUser: React.FC = () => {
  const [id, setId] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userObject, setUserObject] = useState<UserDataObject | null>(null);

  const update = async () => {
    const payload: UpdateUserObject = {
      bio: bio.trim() || undefined,
      avatarUrl: avatarUrl.trim() || undefined
    };

    try {
      const res = await UserService.updateUser(id, payload);
      setUserObject(res.data);
    } catch {
      setUserObject(null);
    }
  };

  return (
    <div>
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder="User id" />
      <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="Avatar URL" />
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
      <button onClick={update}>Update</button>
      <pre>{JSON.stringify(userObject, null, 2)}</pre>
    </div>
  );
};

export default UpdateUser;
