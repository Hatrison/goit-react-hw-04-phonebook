import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { Header, SectionHeader } from './App.styled';
import Filter from './Filter';

const LS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(LS_KEY);

    if (contacts !== null) {
      this.setState({
        contacts: JSON.parse(contacts),
      });
      return;
    }

    this.setState({ contacts: [] });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  onSubmit = values => {
    if (this.state.contacts.find(contact => contact.name === values.name)) {
      return;
    }
    values.id = nanoid();

    this.setState(({ contacts }) => ({
      contacts: [values, ...contacts],
    }));
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onDelete = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div>
        <Header>Phonebook</Header>
        <ContactForm onSubmit={this.onSubmit} />

        <SectionHeader>Contacts</SectionHeader>
        <Filter onChange={this.onChange} filter={filter} />
        <ContactList contacts={visibleContacts} onDelete={this.onDelete} />
      </div>
    );
  }
}
