import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';


export const SearchBar = ({ onSubmit }) => {
const [name, setName] = useState('');

const handleChange = evt => {
    setName(evt.target.value)
}

const handleSubmit = evt => {
    evt.preventDefault();
    if (name.toLowerCase().trim() === '') {
    return alert('You have to enter your request!')
    }
    onSubmit(name)
    setName('')
    reset()
}

const reset = () => {
    setName('')
}
return (
    <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
            <button type="submit" className={css.searchFormButton}>
                <span className={css.searchFormButtonLabel}>Search</span>
            </button>

            <input
                className={css.searchFormInput}
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
        </form>
    </header>
)
}


SearchBar.propTypes = {
    name: PropTypes.string,
}

