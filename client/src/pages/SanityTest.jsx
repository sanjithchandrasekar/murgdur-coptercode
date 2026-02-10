import React, { useState, useEffect } from 'react';
import { client } from '../utils/sanity';
import Button from '../components/common/Button';
import { CheckCircle, XCircle, AlertTriangle, Loader, RefreshCw } from 'lucide-react';

const SanityTest = () => {
    const [status, setStatus] = useState({
        read: 'pending', // pending, success, error
        write: 'pending',
        tokenDetected: false
    });
    const [logs, setLogs] = useState([]);
    const [localUsers, setLocalUsers] = useState([]);
    const [sanityUsers, setSanityUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const addLog = (message, type = 'info') => {
        setLogs(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
    };

    const checkConnection = async () => {
        setStatus({ read: 'pending', write: 'pending', tokenDetected: false });
        setLogs([]);
        addLog("Starting Connection Test...");

        // 1. Check for Token Presence (Client-side check of env var injection)
        // Note: We can't see the actual value securely if it's not prefixed with VITE_, but the client config uses import.meta.env.VITE_SANITY_TOKEN
        // We'll check if the client config has a token set.
        const token = client.config().token;
        const hasToken = !!token;
        addLog(`Token Configuration Detected: ${hasToken ? 'YES' : 'NO'}`, hasToken ? 'success' : 'warning');
        setStatus(prev => ({ ...prev, tokenDetected: hasToken }));

        // 2. Test Read Connection
        try {
            addLog("Attempting to FETCH data from Sanity...");
            await client.fetch('*[_type == "siteSettings"][0]');
            addLog("Read Connection Successful!", 'success');
            setStatus(prev => ({ ...prev, read: 'success' }));
        } catch (error) {
            console.error(error);
            addLog(`Read Connection Failed: ${error.message}`, 'error');
            setStatus(prev => ({ ...prev, read: 'error' }));
        }

        // 3. Test Write Connection (Only if token exists)
        if (hasToken) {
            try {
                addLog("Attempting to WRITE data to Sanity...");
                const doc = {
                    _type: 'testConnection',
                    name: 'Sanity Connection Test',
                    testedAt: new Date().toISOString()
                };
                // We'll try to create a doc. If 'testConnection' schema doesn't exist, it might fail with a specific schema error, 
                // but that still proves we hit the API with write permissions.
                // Better to try creating a known schema or a system document if possible, but 'customer' is safe if we delete it or use a unique ID.
                // Actually, let's just try to create a dummy 'customer' to be safe with strict schemas, then delete it.

                const testId = `test_conn_${Date.now()}`;
                const testDoc = {
                    _id: testId,
                    _type: 'customer',
                    firstName: 'Test',
                    lastName: 'Connection',
                    email: `test_${Date.now()}@example.com`,
                    mobile: '0000000000',
                    createdAt: new Date().toISOString()
                };

                await client.create(testDoc);
                addLog("Write Connection Successful! (Document Created)", 'success');

                // Cleanup
                addLog("Cleaning up test document...");
                await client.delete(testId);
                addLog("Test document deleted.", 'info');

                setStatus(prev => ({ ...prev, write: 'success' }));
            } catch (error) {
                console.error(error);
                let msg = error.message;
                if (error.statusCode === 401 || error.statusCode === 403) {
                    msg = "Permission Denied. Check your VITE_SANITY_TOKEN. It needs 'Editor' or 'Write' permissions.";
                }
                addLog(`Write Connection Failed: ${msg}`, 'error');
                setStatus(prev => ({ ...prev, write: 'error' }));
            }
        } else {
            addLog("Skipping Write Test (No Token Configured).", 'warning');
            setStatus(prev => ({ ...prev, write: 'skipped' }));
        }
    };

    const checkUsers = async () => {
        setLoadingUsers(true);
        // 1. Get Local Users
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        setLocalUsers(storedUsers);

        // 2. Check these emails in Sanity
        if (storedUsers.length > 0) {
            const emails = storedUsers.map(u => u.email).filter(Boolean);
            if (emails.length > 0) {
                try {
                    const query = `*[_type == "customer" && email in $emails]{_id, email, firstName}`;
                    const remoteUsers = await client.fetch(query, { emails });
                    setSanityUsers(remoteUsers);
                } catch (err) {
                    console.error("Failed to fetch users", err);
                }
            }
        }
        setLoadingUsers(false);
    };

    useEffect(() => {
        checkConnection();
        checkUsers();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-24 font-sans">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-royal-gold">System Status: Database Connection</h1>
                    <Button onClick={checkConnection} variant="outline" className="flex items-center gap-2">
                        <RefreshCw size={16} /> Retry
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Token Status */}
                    <div className={`p-6 rounded border ${status.tokenDetected ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            {status.tokenDetected ? <CheckCircle className="text-green-500" /> : <AlertTriangle className="text-yellow-500" />}
                            <h3 className="font-bold">Environment Token</h3>
                        </div>
                        <p className="text-sm text-gray-400">
                            {status.tokenDetected
                                ? "VITE_SANITY_TOKEN is configured."
                                : "Token missing. Write operations will fail."}
                        </p>
                    </div>

                    {/* Read Status */}
                    <div className={`p-6 rounded border ${status.read === 'success' ? 'border-green-500/30 bg-green-500/5' : status.read === 'error' ? 'border-red-500/30 bg-red-500/5' : 'border-gray-700 bg-gray-800'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            {status.read === 'success' ? <CheckCircle className="text-green-500" /> : status.read === 'error' ? <XCircle className="text-red-500" /> : <Loader className="animate-spin text-blue-500" />}
                            <h3 className="font-bold">Read Access</h3>
                        </div>
                        <p className="text-sm text-gray-400">
                            fetching site content.
                        </p>
                    </div>

                    {/* Write Status */}
                    <div className={`p-6 rounded border ${status.write === 'success' ? 'border-green-500/30 bg-green-500/5' : status.write === 'error' ? 'border-red-500/30 bg-red-500/5' : 'border-gray-700 bg-white/5'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            {status.write === 'success' ? <CheckCircle className="text-green-500" /> : status.write === 'error' ? <XCircle className="text-red-500" /> : status.write === 'skipped' ? <AlertTriangle className="text-yellow-500" /> : <Loader className="animate-spin text-blue-500" />}
                            <h3 className="font-bold">Write Access</h3>
                        </div>
                        <p className="text-sm text-gray-400">
                            User registration & updates.
                        </p>
                    </div>
                </div>

                {/* User Sync Diagnosis */}
                <div className="mb-8">
                    <h2 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">User Synchronization Status</h2>
                    <p className="text-gray-400 text-sm mb-4">
                        This section compares users saved on THIS device (Local) with the Cloud Database.
                        <br /><span className="text-royal-gold">If a user is "Local Only", they cannot log in on other devices.</span>
                    </p>

                    {loadingUsers ? <div className="text-royal-gold animate-pulse">Checking user database...</div> : (
                        <div className="bg-white/5 rounded border border-white/10 overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/10 text-xs uppercase font-bold text-gray-300">
                                    <tr>
                                        <th className="p-3">Email / User</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Action Required</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {localUsers.length === 0 ? (
                                        <tr><td colSpan="3" className="p-4 text-center text-gray-500">No local users found on this device.</td></tr>
                                    ) : (
                                        localUsers.map((localUser, idx) => {
                                            const isSynced = sanityUsers.some(su => su.email === localUser.email);
                                            return (
                                                <tr key={idx} className="hover:bg-white/5">
                                                    <td className="p-3">
                                                        <div className="font-bold text-white">{localUser.firstName} {localUser.lastName}</div>
                                                        <div className="text-gray-500">{localUser.email}</div>
                                                    </td>
                                                    <td className="p-3">
                                                        {isSynced ? (
                                                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs border border-green-500/30 flex items-center gap-1 w-fit">
                                                                <CheckCircle size={10} /> Synced (Cloud)
                                                            </span>
                                                        ) : (
                                                            <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs border border-red-500/30 flex items-center gap-1 w-fit">
                                                                <AlertTriangle size={10} /> Local Only
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-3 text-gray-400">
                                                        {isSynced ? "None. Works everywhere." : "Sign Up again to sync."}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Console Output */}
                <div className="bg-gray-900 rounded p-4 font-mono text-sm h-96 overflow-y-auto border border-gray-800">
                    {logs.map((log, index) => (
                        <div key={index} className={`mb-2 ${log.type === 'success' ? 'text-green-400' :
                            log.type === 'error' ? 'text-red-400' :
                                log.type === 'warning' ? 'text-yellow-400' : 'text-gray-300'
                            }`}>
                            <span className="text-gray-600 mr-2">[{log.timestamp}]</span>
                            {log.message}
                        </div>
                    ))}
                    {logs.length === 0 && <span className="text-gray-500">Initializing tests...</span>}
                </div>
            </div>
        </div>
    );
};

export default SanityTest;
