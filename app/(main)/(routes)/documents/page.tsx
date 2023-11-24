"use client";
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { PlusCircle } from 'lucide-react';
import { useMutation } from "convex/react";

import { api } from '@/convex/_generated/api';

import Image from 'next/image';
import React from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const Documents = () => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" })
    .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise,{
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note."
    })
  }

  return (
    <div className='h-full flex flex-col justify-center items-center space-y-4'>
      <Image src="/empty.png" width="300" height="300" alt='empty' className='dark:hidden' />
      <Image src="/empty-dark.png" width="300" height="300" alt='empty' className='dark:block hidden' />
      <h1 className='text-lg font-medium'>Welcome to {user?.firstName}&apos;s Jotion </h1>
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4  mr-2'/>
        Create a note
      </Button>
    </div>
  )
}

export default Documents