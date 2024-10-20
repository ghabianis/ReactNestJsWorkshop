import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function AddItemForm({ onNewItem }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const submitNewItem = (e) => {
        e.preventDefault();
        setSubmitting(true);

        const newItemData = {
            title,
            description,
            isDone: false,        // Assuming new items are not done by default
            isInProgress: true     // Assuming new items are in progress by default
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(newItemData),
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('https://3000-ghabianis-workshopnestj-3o8p78q8s8f.ws-eu116.gitpod.io/api/todo/create', options)
            .then((r) => r.json())
            .then((response) => {
                const createdItem = response;  // Directly use the response
                onNewItem(createdItem);  // Pass the newly created item
                setSubmitting(false);
                setTitle('');         // Reset title input
                setDescription('');    // Reset description input
            })
            .catch((error) => {
                console.error('Error creating item:', error);
                setSubmitting(false);  // Reset submitting state on error
            });
    };

    return (
        <Form onSubmit={submitNewItem}>
            <InputGroup className="mb-3">
                <Form.Control
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                    aria-label="Title"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Form.Control
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    placeholder="Description"
                    aria-label="Description"
                />
            </InputGroup>
            <Button
                className="mb-3"
                type="submit"
                variant="success"
                disabled={!title.length || submitting}
            >
                {submitting ? 'Adding...' : 'Add Item'}
            </Button>
        </Form>
    );
}

AddItemForm.propTypes = {
    onNewItem: PropTypes.func.isRequired,
};
