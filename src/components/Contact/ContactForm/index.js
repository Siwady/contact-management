import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    async function addContact() {
        const payload = { id, name, email };
        await axios.post('https://elite-dev-test-api.azurewebsites.net/api/Contact', payload);
        navigate('/');
    }

    async function updateContact() {
        const payload = { name, email };
        await axios.put(`https://elite-dev-test-api.azurewebsites.net/api/Contact/${id}`, payload);
        navigate('/');
    }
    
    async function contactExist() {
        try {
            const result = await axios.get(`https://elite-dev-test-api.azurewebsites.net/api/Contact/${id}`);
            return result.data && result.data.id ? true: false;
        } catch (e) {
            return e.response.status != 404;
        }
    }

    async function handleSave() {
        const exist = await contactExist();
        if (exist) {
            updateContact();
        } else {
            addContact();
        }
    }

    return (
        <div>
            <h1>Add/Edit Contact</h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <label>ID</label>
                    <input value={id} onChange={(e) => setId(e.target.value)}></input>
                </div>
                <div>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default ContactForm;