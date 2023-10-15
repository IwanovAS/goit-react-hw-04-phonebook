import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import css from './App.module.css';

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

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const contactsArr = JSON.parse(stringifiedContacts) ?? [];
    this.setState({
      contacts: contactsArr,
    });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = contact => {
    const { name, number } = contact;

    if (!name || !number) {
      alert('Please enter both name and number.');
      return;
    }

    const isNameExists = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />
        <h2 className={css.contactTitle}> Contacts</h2>
        <Filter filter={filter} handleChange={this.handleChange} />
        <ContactList
          contacts={this.getFilteredContacts()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
