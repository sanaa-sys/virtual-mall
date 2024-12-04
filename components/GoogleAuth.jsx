'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db, provider } from '@/app/lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { useAppContext } from "../context/AppContext";


export default function GoogleAuth({ mode }) {
    const { userEmail, setUser } = useAppContext();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    const handleGoogleAuth = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            const userRef = doc(db, 'users', user.uid)
            const userSnap = await getDoc(userRef)
            setUser(user.email);
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    createdAt: new Date()
                })
            }

            router.push('/home')
        } catch (error) {
            console.error('Error with Google authentication', error)
            setError('An error occurred during authentication. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Button
                onClick={handleGoogleAuth}
                className="w-full"
                disabled={isLoading}
                aria-busy={isLoading}
            >
                {isLoading ? 'Processing...' : `${mode} with Google`}
            </Button>
            {error && (
                <p className="mt-4 text-red-500 text-center" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}

