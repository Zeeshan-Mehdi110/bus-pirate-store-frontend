"use client"
// import { Metadata } from "next"
// import { useRouter } from 'next/navigation';
// import LoginTemplate from "@modules/account/templates/login-template"
import React, { useState } from 'react';
// import UnderlineLink from "@modules/common/components/interactive-link"
import Input from "@modules/common/components/input"
import { useParams } from "next/navigation";
import { Button } from "@medusajs/ui"


export default function ChangePassword() {

  const params = useParams();
  const token = params.token;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isErr, setIsErr] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsErr(true);
      return;
    }


    fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/customers/password-reset`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
        token,
      }),
    })
      .then(response => {
        if (response.ok) {
          setMessage("Password successfully changed. Please log in with your new password.");
          setIsErr(false);
          setIsSuccess(true);
        } else {
          setMessage("Failed to change password. Please try again or contact support.");
          setIsErr(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage("An error occurred. Please try again later.");
        setIsErr(true);
      });
  };

  return (
    <>
      <div className="w-full flex justify-center lg:mr-60">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 mb-6">
          <h1 className="text-xl font-semibold mt-9">Choose New Password</h1>
          <label htmlFor="email">Email:</label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            name="Email"
            type="email"
            title="Email"
            autoComplete="Email"
            required
          />
          <label htmlFor="new-password">New Password:</label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="New password"
            name="New password"
            type="password"
            title="New password"
            autoComplete="password"
            required
          />
          <label htmlFor="new-password">Confirm New Password:</label>
          <Input
            id="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm new password"
            name="Confirm new password"
            type="password"
            title="Confirm new password"
            autoComplete="password"
            required
          />
          {message && (
            <p className={isErr ? "text-red-500" : "text-green-500"} style={{ maxWidth: '224px', textAlign: 'center' }}>{message}</p>
          )}
          {isSuccess ? (
            <a className="bg-c_blue hover:bg-c_pink text-white w-full mt-6 pt-3 pb-3 rounded-md text-center" href='/account'>Go to Homepage</a>
          ) : (
            <Button className="mt-6 w-full bg-c_blue hover:bg-c_pink" size="large" onClick={() => setMessage('')} disabled={isSuccess}>Reset Password</Button>
          )}
        </form>
      </div>
    </>
  );
}


