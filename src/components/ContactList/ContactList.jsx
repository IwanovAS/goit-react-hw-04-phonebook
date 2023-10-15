import css from './ContactList.module.css';

export const ContactList = ({ contacts, handleDelete }) => (
  <div className={css.wraperContactList}>
    <ul className={css.contactList}>
      {contacts.map((contact, id) => (
        <li key={id} className={css.contactListItem}>
          {contact.name}: {contact.number}
          <button
            type="button"
            className={css.contactListBtn}
            onClick={() => handleDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);
