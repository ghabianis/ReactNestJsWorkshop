import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

export function AddItemForm({ onNewItem }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState(true); // Initialize as boolean with default true
    const [submitting, setSubmitting] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const submitNewItem = (e) => {
        e.preventDefault();
        setSubmitting(true);

        const newItemData = {
            title,
            description,
            isActive: Boolean(isActive) // Ensure it's converted to boolean
        };

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/todo/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItemData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to create item: ${response.statusText}`);
                }
                return response.json();
            })
            .then((createdItem) => {
                onNewItem(createdItem);
                setTasks((prevTasks) => [...prevTasks, createdItem]);
                setSubmitting(false);
                setTitle('');
                setDescription('');
                setIsActive(true); // Reset to default true
            })
            .catch((error) => {
                console.error('Error creating item:', error);
                setSubmitting(false);
                alert('Error creating item. Please try again later.');
            });
    };

    const toggleTaskStatus = (id, newStatus) => {
        const updatedTask = tasks.find(task => task.id === id);
        if (!updatedTask) return;

        const updatedTaskData = {
            ...updatedTask,
            isActive: Boolean(newStatus.isActive) // Ensure boolean conversion
        };

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/todo/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTaskData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to update item: ${response.statusText}`);
                }
                return response.json();
            })
            .then((updatedItem) => {
                setTasks(tasks.map(task => (task.id === id ? updatedItem : task)));
            })
            .catch((error) => {
                console.error('Error updating item:', error);
                alert('Error updating item. Please try again later.');
            });
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setShowEditModal(true);
    };

    const handleUpdateTask = () => {
        if (!editingTask) return;

        const updatedTaskData = {
            ...editingTask,
            title: editTitle,
            description: editDescription,
            isActive: Boolean(editingTask.isActive) // Ensure boolean conversion
        };

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/todo/${editingTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTaskData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to update item: ${response.statusText}`);
                }
                return response.json();
            })
            .then((updatedItem) => {
                setTasks(tasks.map(task => (task.id === editingTask.id ? updatedItem : task)));
                setShowEditModal(false);
                setEditingTask(null);
            })
            .catch((error) => {
                console.error('Error updating item:', error);
                alert('Error updating item. Please try again later.');
            });
    };

    return (
        <>
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
                    className="mb-5 col-12"
                    type="submit"
                    variant="success"
                    disabled={!title.length || submitting}
                >
                    {submitting ? 'Adding...' : 'Add Item'}
                </Button>
            </Form>

            <div className="task-list">
                {tasks.map(task => (
                    <Card
                        key={task.id}
                        className="mb-3"
                        style={{
                            opacity: task.isActive ? 1 : 0.9,
                            filter: task.isActive ? 'none' : 'blur(2px)',
                        }}
                    >
                        <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>{task.description}</Card.Text>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={() => toggleTaskStatus(task.id, { isActive: false })}
                                    disabled={!task.isActive}
                                >
                                    Mark as Done
                                </Button>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEdit(task)}
                                >
                                    Update
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateTask}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

AddItemForm.propTypes = {
    onNewItem: PropTypes.func.isRequired,
};