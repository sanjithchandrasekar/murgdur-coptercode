import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const MongoTest = () => {
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('Initializing connection test...');
    const [dbData, setDbData] = useState(null);

    const testConnection = async () => {
        setStatus('loading');
        setMessage('Pinging Backend API...');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || '/api';
            console.log("Testing API URL:", apiUrl);

            const res = await fetch(`${apiUrl}/test-db`);

            let data;
            try {
                data = await res.json();
            } catch (e) {
                throw new Error(`Server returned invalid JSON (${res.status} ${res.statusText}). Check server logs.`);
            }

            setDbData(data); // Save data to show technical details

            if (!res.ok) {
                // Use the error message from the backend if available
                const backendError = data.error || data.message || res.statusText;
                throw new Error(`Server Error: ${backendError}`);
            }

            if (data.success) {
                setStatus('success');
                setMessage('Successfully connected to MongoDB Atlas!');
            } else {
                setStatus('error');
                setMessage(`Database Error: ${data.error || 'Unknown error'}`);
            }

        } catch (err) {
            console.error(err);
            setStatus('error');
            setMessage(err.message);
        }
    };

    useEffect(() => {
        testConnection();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-32 flex flex-col items-center">
            <div className="max-w-2xl w-full bg-gray-900 border border-white/10 rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
                    <div className="p-3 bg-green-500/20 rounded-full">
                        <Database className="text-green-500" size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-serif text-royal-gold">System Diagnostics</h1>
                        <p className="text-gray-400 text-sm">MongoDB Database Connectivity Check</p>
                    </div>
                </div>

                {/* Status Display */}
                <div className={`p-4 rounded border mb-6 flex items-start gap-4 ${status === 'loading' ? 'bg-blue-500/10 border-blue-500/30' :
                        status === 'success' ? 'bg-green-500/10 border-green-500/30' :
                            'bg-red-500/10 border-red-500/30'
                    }`}>
                    {status === 'loading' && <RefreshCw className="text-blue-500 animate-spin mt-1" />}
                    {status === 'success' && <CheckCircle className="text-green-500 mt-1" />}
                    {status === 'error' && <XCircle className="text-red-500 mt-1" />}

                    <div>
                        <h3 className={`font-bold ${status === 'loading' ? 'text-blue-400' :
                                status === 'success' ? 'text-green-400' :
                                    'text-red-400'
                            }`}>
                            {status === 'loading' ? 'Testing Connection...' :
                                status === 'success' ? 'Connection Successful' :
                                    'Connection Failed'}
                        </h3>
                        <p className="text-sm text-gray-300 mt-1 font-mono">{message}</p>
                    </div>
                </div>

                {/* Technical Details */}
                {dbData && (
                    <div className="bg-black p-4 rounded border border-white/10 font-mono text-xs text-gray-400 overflow-auto">
                        <p className="text-royal-gold mb-2 font-bold">Server Response Payload:</p>
                        <pre>{JSON.stringify(dbData, null, 2)}</pre>
                    </div>
                )}

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={testConnection}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded transition-colors"
                    >
                        <RefreshCw size={18} /> Retry Connection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MongoTest;
