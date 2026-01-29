"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="page">
      <h1>Login</h1>

      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
