'use client';
import Image from 'next/image';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
    return (
        <div className='calling'>
            <div className='content'>
                <div className='d-flex justify-content-center align-content-center pt-3 pb-3'>
                <Image src={'/icons/zoom.png'} alt='' height={75} width={75} />
                </div>
                <h3 className='text-center pt-3 pb-3'>Incoming call ....</h3>
                <div className='d-flex justify-content-center align-content-center gap-5 cursor pt-2 pb-3'>
                <Image onClick={()=>router.push('/premium')} src={'/icons/video-call.png'} alt='' height={65} width={65} />
                <Image onClick={()=>router.push('/premium')} src={'/icons/missed-call.png'} alt='' height={65} width={65} />
                </div>
            </div>
        </div>
    );
};

export default page;