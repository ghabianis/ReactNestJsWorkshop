import { useCallback, useEffect, useState } from 'react';
import { AddItemForm } from './AddNewItemForm';
import { ItemDisplay } from './ItemDisplay';

// Changed to default export
export function TodoListCard() {
    const [items, setItems] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/todo`)
            .then((r) => r.json())
            .then((response) => {
                console.log('data:', response);
                setItems(response);
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
                setItems([]);
            });
    }, []);

    const onNewItem = useCallback(
        (newItem) => {
            setItems((prevItems) => [...prevItems, newItem]);
        },
        [],
    );

    const onItemUpdate = useCallback(
        (item) => {
            setItems((prevItems) =>
                prevItems.map((i) => (i.id === item.id ? item : i))
            );
        },
        [],
    );

    const onItemRemoval = useCallback(
        (item) => {
            setItems((prevItems) =>
                prevItems.filter((i) => i.id !== item.id)
            );
        },
        [],
    );

    if (items === null) return 'Loading...';

    return (
        <>
            <AddItemForm onNewItem={onNewItem} />
            {items.length === 0 && (
                <p className="text-center">No items yet! Add one above!</p>
            )}
            {items.map((item) => (
                <ItemDisplay
                    key={item.id}
                    item={{ ...item, id: String(item.id) }}
                    onItemUpdate={onItemUpdate}
                    onItemRemoval={onItemRemoval}
                />
            ))}
        </>
    );
}