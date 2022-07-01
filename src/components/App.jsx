import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import {
  contactLoading,
  contactAdd,
  contactDelete,
  changeFilter,
} from 'redux/phonebook/phonebook-actions.js';
import {
  getContacts,
  getFilter,
  getVisibleContacts,
} from 'redux/phonebook/phonebook-selectors';

export default function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    const getContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(getContacts);

    if (parsedContacts) {
      dispatch(contactLoading(parsedContacts));
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkDuplicateName = name =>
    contacts.find(contact => contact.name === name);

  const formSubmitHandler = (name, number) => {
    if (checkDuplicateName(name))
      return alert(
        'This contact already exists, please enter a different name',
      );

    dispatch(contactAdd(name, number));
  };

  const onDelete = id => {
    const filtredContacts = contacts.filter(contact => contact.id !== id);

    dispatch(contactDelete(filtredContacts));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter
        handlerFilter={e => dispatch(changeFilter(e.currentTarget.value))}
        filter={filter}
      />
      <ContactList contacts={visibleContacts} onDelete={onDelete} />
    </Container>
  );
}
