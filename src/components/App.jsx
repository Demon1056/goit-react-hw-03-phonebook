import React, { Component } from 'react';
import shortid from 'shortid';
import { ContactForm } from './Form/Form';
import { ContactList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { PhoneBook, InformationArea } from './App.styled';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  generId = () => shortid.generate();
  updateContacts = (values, actions) => {
    actions.resetForm();
    this.setState(({ contacts }) => {
      if (contacts.find(({ name }) => name === values.name)) {
        return alert(`${values.name} is already in contacts`);
      }

      return {
        contacts: [...contacts, { id: this.generId(), ...values }],
      };
    });
  };
  updateFilter = e =>
    this.setState({
      filter: e.currentTarget.value,
    });
  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toUpperCase().includes(filter.toUpperCase())
    );
  };
  deleteContacts = item => {
    const newContacts = this.state.contacts.filter(
      contact => contact.id !== item.id
    );
    this.setState({
      contacts: newContacts,
    });
  };
  render() {
    const contactsLength = this.state.contacts.length;
    return (
      <PhoneBook>
        <ContactForm showName={this.updateContacts} />
        <InformationArea>
          <h2>CONTACTS</h2>
          <Filter updateFilter={this.updateFilter} />
          {contactsLength > 0 && (
            <ContactList
              data={this.filterContacts()}
              deleteContact={this.deleteContacts}
            />
          )}
        </InformationArea>
      </PhoneBook>
    );
  }
}
