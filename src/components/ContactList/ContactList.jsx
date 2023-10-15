import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => (
  <div className={css.wraperContactList}>
    <ul className={css.contactList}>
      {contacts.map(contact => (
        <li key={contact.id} className={css.contactListItem}>
          {contact.name}: {contact.number}
          <button
            type="button"
            className={css.contactListBtn}
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);
