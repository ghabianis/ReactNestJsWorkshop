// src/components/Greeting.jsx
import { useEffect, useState } from 'react';

export function Greeting() {
    const [greeting, setGreeting] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('vite',import.meta.env.VITE_SERVER_URL)
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/todo/greeting`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch greeting');
                }
                return res.json();
            })
            .then((data) => {
                setGreeting(data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="text-center mb-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mb-5 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-center text-2xl font-bold text-black">
                {greeting}
            </h1>
        </div>
    );
}