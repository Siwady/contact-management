import React, { useEffect, useState }  from 'react';
import ContactTable from './ContactTable';
import axios from 'axios';
import { Container } from './styles';
import { Link } from 'react-router-dom';

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    async function addContact() {
        const nextId = Math.max(...contacts.map(contact=>contact.id)) + 1;
        const payload = { id: nextId, name, email };
        await axios.post('https://elite-dev-test-api.azurewebsites.net/api/Contact', payload);
        fetchContacts();
    }

    async function fetchContacts() {
        const result = await axios.get('https://elite-dev-test-api.azurewebsites.net/api/Contact');
        setContacts(result.data || []);
    }

    useEffect(() => {
        fetchContacts();
    }, [])
    return (
        <Container>
            <div>Contacts</div>
            <Link to="/contact">Add/Edit Contact</Link>
            <ContactTable data={contacts} fetchContacts={fetchContacts}/>
        </Container>
    );
};

export default Contact;