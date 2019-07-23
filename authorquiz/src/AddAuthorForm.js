import React from 'react';
import "./AddAuthorForm.css";

class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        }
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);

    }

    onFieldChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    handleAddBook(event) {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        });
    }


    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div className="AddAuthorForm__input">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
                </div>
                <div className="AddAuthorForm__input">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}></input>
                </div>
                <div className="AddAuthorForm__input">
                    <label htmlFor="bookTemp">Books</label>
                    {this.state.books.map((book) => <p key={book} > {book}</p>)}
                    <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}></input>
                    <input type="button" value="+" onClick={this.handleAddBook} />
                </div>
                <input type="submit" value="Add" />
            </form>
        </div>
    }
}


function AddAuthorForm({ onAddAuthor }) {
    return <div className="AddAuthorForm">
        <h1>Add author</h1>
        <AuthorForm onAddAuthor={onAddAuthor} />
    </div>
}

export default AddAuthorForm;