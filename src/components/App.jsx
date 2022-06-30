import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    const getContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(getContacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkDuplicateName = name => {
    return contacts.filter(contact => contact.name === name);
  };

  const formSubmitHandler = (name, number) => {
    const checkDuplicate = checkDuplicateName(name);

    if (checkDuplicate.length > 0)
      return alert(
        'This contact already exists, please enter a different name'
      );

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([...contacts, contact]);
  };

  const onDelete = id => {
    const filtredContacts = contacts.filter(contact => contact.id !== id);

    setContacts(filtredContacts);
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContact();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter changeFilter={changeFilter} filter={filter} />
      <ContactList contacts={visibleContacts} onDelete={onDelete} />
    </Container>
  );
}
