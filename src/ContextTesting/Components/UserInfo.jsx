import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const UserInfo = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log("User changed:", user);
  }, [user]);

  if (!user) return <p>No user logged in.</p>;

  return (
    <div>
      <h3>Logged in User</h3>
      <p>Name: {user.name}</p>
      <p>Mobile: {user.mobile}</p>
    </div>
  );
};

export default UserInfo;
