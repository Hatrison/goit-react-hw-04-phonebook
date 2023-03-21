import { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { Header, SectionHeader } from './App.styled';
import Filter from './Filter';
import useLocalStorage from '../hooks/useLocalStorage';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(LS_KEY, []);
  const [filter, setFilter] = useState('');

  const onSubmit = values => {
    if (contacts.find(contact => contact.name === values.name)) {
      return;
    }
    values.id = nanoid();

    setContacts([values, ...contacts]);
  };

  const onChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const onDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div>
      <Header>Phonebook</Header>
      <ContactForm onSubmit={onSubmit} />

      <SectionHeader>Contacts</SectionHeader>
      <Filter onChange={onChange} filter={filter} />
      <ContactList contacts={visibleContacts} onDelete={onDelete} />
    </div>
  );
};
