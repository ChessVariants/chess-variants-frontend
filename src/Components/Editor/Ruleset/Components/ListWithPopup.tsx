import { Button, Typography } from "@mui/material";
import MyPopup from "./Popup";
import React, { useState } from "react";


interface ListWithPopupProps {
    title: string;
    type: string;
    singleton: boolean;
    width: string | number;
    height: string | number;
    listComponent: React.FunctionComponent<
        {
            itemsAdded: { name: string, id: number }[];
            onRemoveItem: (newItem: { name: string, id: number }) => void;
            width: string | number;
            height: string | number;
            setJSON: (json: string) => void
        }>;
    items: string[]
    setItems: (items: string[]) => void
    setListJSON: (json: string) => void
}

export default function ListWithPopup({ title, type, singleton, width = "200px", height = "200px", listComponent: ListComponent, items, setItems, setListJSON }: ListWithPopupProps) {

    const [itemsAdded, setItemsAdded] = useState([] as { name: string, id: number }[]);

    const [isOpen, setIsOpen] = useState(false);

    const findUnusedId = () => {
        var i = 0
        while (true) {
            if (itemsAdded.some((item) => item.id === i))
                i++;
            else
                return i;
        }
    }

    const handleAddItem = (newName: string) => {
        var newItem = { name: newName, id: findUnusedId() };
        setItemsAdded([...itemsAdded, newItem]);
    };

    const handleRemoveItem = (newItem: { name: string, id: number }) => {
        setItemsAdded(itemsAdded.filter((item) => item.id !== newItem.id));
    };


    const handleClickItem = (itemClicked: string) => {
        if (singleton) {
            if (!(itemsAdded.some((item) => item.name === itemClicked))) {
                handleAddItem(itemClicked);
                setIsOpen(false);
            }
        }
        else {
            handleAddItem(itemClicked);
            setIsOpen(false);
        }
    };



    return (
        <div>
            <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 1, mt: 2 }}>{title}:</Typography>
            <ListComponent itemsAdded={itemsAdded} onRemoveItem={handleRemoveItem} width={width} height={height} setJSON={setListJSON} />

            <div>
                <Button variant="contained" color="joinColor" style={{ height: '40px', width: '200px' }} onClickCapture={() => setIsOpen(true)} sx={{ mt: 1, mr: 2, ml: 2 }}>
                    Add {type}
                </Button>
            </div>
            <div>
            </div>
            <MyPopup isOpen={isOpen} setIsOpen={setIsOpen} title={type + "s"} onClickItem={(item) => handleClickItem(item)} addedItems={itemsAdded} singleton={singleton} items={items} setItems={setItems}></MyPopup>
        </div>
    );
}
