import React from 'react';
import PropTypes from 'prop-types';
import { List, Text } from './ContactList.styled';
import DeleteButton from 'components/DeleteButton';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Text>
            {contact.name}: {contact.number}
          </Text>
          <DeleteButton onDelete={onDelete} id={contact.id} />
        </li>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
