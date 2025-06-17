// components/LogoutButton.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut(auth)}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}
