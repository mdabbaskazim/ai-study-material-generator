"use client"
import { eq } from 'drizzle-orm';
import { USER_TABLE } from "../configs/schema"
import { db } from "../configs/db";
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react'
import axios from 'axios';

function Provider({ children }) {

  const { user } = useUser();

  useEffect(() => {
    user && CheckIsNewUser();
  }, [user]);

  const CheckIsNewUser = async () => {
    // // Logic to check if the user already exists

    // const result = await db.select().from(USER_TABLE)
    // .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

    // console.log(result);
    // if (result?.length == 0) {
    //   //if Not, then add to database
    //   const userResp = await db.insert(USER_TABLE).values({
    //     name: user?.fullName,
    //     email: user?.primaryEmailAddress?.emailAddress,
    //   }).returning({ id: USER_TABLE.id })

    //   console.log("User added to database:", userResp);
    // }
    
    
    // const resp = await axios.post('/api/create-user',{user:user});
    // console.log(resp.data);
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default Provider;
