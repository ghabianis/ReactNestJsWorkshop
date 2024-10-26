import faCheckSquare from '@fortawesome/fontawesome-free-regular/faCheckSquare';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './ItemDisplay.scss';

export function ItemDisplay({ item, onItemUpdate, onItemRemoval }) {
    const toggleCompletion = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/todo/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: item.title,
                description: item.description,
                isActive: !item.isActive // Toggle isActive
            }),
        })
            .then((response) => response.json())
            .then((updatedItem) => {
                console.log('Updated item from API:', updatedItem);
                onItemUpdate(updatedItem); // Update in parent
            })
            .catch((error) => console.error('Error updating item:', error));
    };

    const removeItem = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/todo/${item.id}`, { method: 'DELETE' })
            .then(() => onItemRemoval(item))
            .catch((error) => console.error('Error removing item:', error));
    };

    return (
        <Container fluid className={`item ${!item.isActive && 'completed'}`}   style={{
            opacity: item.isActive ? 1 : 0.9,
            filter: item.isActive ? 'none' : 'blur(2px)',
        }}>
            <Row>
                <Col xs={2} className="text-center">
                    <Button
                        className="toggles"
                        size="sm"
                        variant="link"
                        onClick={toggleCompletion}
                        aria-label={item.isActive ? 'Mark item as completed' : 'Mark item as active'}
                    >
                        <FontAwesomeIcon
                            icon={item.isActive ? faSquare : faCheckSquare} // Check based on `isActive`
                        />
                    </Button>
                </Col>
                <Col xs={8} className="name">
                    <h5>{item.title || "No Title"}</h5>
                    <p>{item.description || "No Description"}</p>
                    <p>Status: {item.isActive ? "Active" : "Completed"}</p>
                </Col>
                <Col xs={2} className="text-center remove">
                    <Button
                        size="sm"
                        variant="link"
                        onClick={removeItem}
                        aria-label="Remove Item"
                    >
                        <FontAwesomeIcon icon={faTrash} className="text-danger" />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

ItemDisplay.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        isActive: PropTypes.bool,
    }).isRequired,
    onItemUpdate: PropTypes.func.isRequired,
    onItemRemoval: PropTypes.func.isRequired,
};
