"use client"
import React, { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from "next/navigation";


const Register = () => {
  const [err,setErr]=useState(false)
  const router = useRouter();
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const name=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    try{
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 && router.push("/dashboard/login?success=Account has been created");

    }catch(err){
      setErr(true)

    }
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} type='text' placeholder='User Name' required></input>
        <input className={styles.input} type='email' placeholder='Email' required></input>
        <input className={styles.input} type='password' placeholder='Password' required></input>
        <button className={styles.button}> Register</button>
        {err&&"something want wrong"}
      </form>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/login">
        Login with an existing account
      </Link>
    </div>
  )
}

export default Register