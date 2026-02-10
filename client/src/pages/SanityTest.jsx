import React, { useState, useEffect } from 'react';
import { client } from '../utils/sanity';

const SanityTest = () => {
    const [status, setStatus] = useState("Initializing...");
    const [tokenPreview, setTokenPreview] = useState("Checking...");
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);

    const log = (msg) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

    useEffect(() => {
        const runTest = async () => {
            try {
                // 1. Check Client Config
                log("Checking Client Config...");
                let currentToken = "";
                try {
                    if (client && client.config) {
                        const cfg = client.config();
                        currentToken = cfg.token;
                        setTokenPreview(currentToken ? `Present (${currentToken.slice(0, 5)}...)` : "MISSING");
                    } else {
                        setTokenPreview("Client Config Error");
                        log("Client config method missing");
                    }
                } catch (e) {
                    log("Error reading config: " + e.message);
                }

                // 2. Read Test
                log("Attempting Read...");
                try {
                    await client.fetch('*[_type == "siteSettings"][0]');
                    log("Read Success!");
                } catch (e) {
                    log("Read Failed: " + e.message);
                }

                // 3. User Sync Check
                log("Checking Users...");
                const local = JSON.parse(localStorage.getItem('users') || '[]');
                if (local.length > 0) {
                    const emails = local.map(u => u.email).filter(Boolean);
                    const cloudUsers = await client.fetch(`*[_type == "customer" && email in $emails]{email}`);

                    const mapped = local.map(u => {
                        const isSynced = cloudUsers.some(c => c.email === u.email);
                        return { ...u, isSynced };
                    });
                    setUsers(mapped);
                } else {
                    log("No local users found.");
                }

                setStatus("Complete");

            } catch (err) {
                setStatus("Crashed: " + err.message);
                console.error(err);
            }
        };

        runTest();
    }, []);

    const handleSync = async (user) => {
        log(`Syncing ${user.firstName}...`);
        try {
            const doc = {
                _type: 'customer',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile,
                password: user.password,
                createdAt: new Date().toISOString()
            };
            await client.create(doc);
            log("Sync Success!");
            // Refresh
            window.location.reload();
        } catch (e) {
            log("Sync Failed: " + e.message);
        }
    };

    return (
        <div style={{ padding: '50px', backgroundColor: '#111', color: '#fff', minHeight: '100vh', fontFamily: 'monospace' }}>
            <h1 style={{ color: 'gold' }}>Sanity Connection Diagnostic (Simple Mode)</h1>
            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #333' }}>
                <strong>Status:</strong> {status} <br />
                <strong>Token:</strong> {tokenPreview}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Local Users Check</h3>
                {users.length === 0 ? "No users found in localStorage." : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #555' }}>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #333' }}>
                                    <td style={{ padding: '10px' }}>{u.firstName}</td>
                                    <td style={{ padding: '10px' }}>{u.email}</td>
                                    <td style={{ padding: '10px', color: u.isSynced ? '#4f4' : '#f44' }}>
                                        {u.isSynced ? "Synced" : "Local Only"}
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        {!u.isSynced && (
                                            <button
                                                onClick={() => handleSync(u)}
                                                style={{ padding: '5px 10px', background: 'gold', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                            >
                                                SYNC NOW
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div style={{ background: '#000', padding: '10px', border: '1px solid #333', height: '300px', overflow: 'auto' }}>
                {logs.map((l, i) => <div key={i}>{l}</div>)}
            </div>
        </div>
    );
};

export default SanityTest;
