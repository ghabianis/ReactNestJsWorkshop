import { useCallback, useEffect, useState } from 'react';
import { AddItemForm } from './AddNewItemForm';
import { ItemDisplay } from './ItemDisplay';

export function TodoListCard() {
    const [items, setItems] = useState(null);

    useEffect(() => {
        fetch('https://3000-ghabianis-workshopnestj-3o8p78q8s8f.ws-eu116.gitpod.io/api/todo')
            .then((r) => r.json())
            .then((response) => {
                console.log('data:', response); // Log the correct response
                setItems(response);  // Directly set the array from the response
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
                setItems([]);  // Optionally set an empty array if there's an error
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
                    item={{ ...item, id: String(item.id) }}  // Convert id to string here
                    onItemUpdate={onItemUpdate}
                    onItemRemoval={onItemRemoval}
                />
            ))}
        </>
    );
}
