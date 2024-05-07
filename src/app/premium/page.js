'use client';
import Image from "next/image";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter()
  return (
    <div className="calling">
      <div className="primium">
        <h3 className="text-center">Upgrade To Premium</h3>
        <p className="text-center py-2">
          Based on our <span className="text-primary font-weight-bold">users feedback</span> to prevent <span className="text-primary font-weight-bold">bot</span> activity we are allowing
          only <span className="text-primary font-weight-bold">premium</span> users to use our platform. We are always focused on our
          users good experience
        </p>
        <button onClick={()=>router.push('/payment')} className="btn btn-primary w-100">Premium 0.10$</button>
      </div>
    </div>
  );
};

export default page;
