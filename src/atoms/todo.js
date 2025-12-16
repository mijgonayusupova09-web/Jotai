import { atom } from "jotai";

export const dataAtom = atom([
        {
            id: 1, 
            name: "Ramziya",
            age: 16,
            image: "https://avatars.mds.yandex.net/i?id=6ca9227e68092752abde685c57d05b1096e1d19e-5220363-images-thumbs&n=13",
            status: false
        },
        {
            id: 3, 
            name: "Amin",
            age: 20,
            image: "https://avatars.mds.yandex.net/i?id=6ca9227e68092752abde685c57d05b1096e1d19e-5220363-images-thumbs&n=13",
            status: false
        },
        {
            id: 4, 
            name: "Polina",
            age: 11,
            image: "https://avatars.mds.yandex.net/i?id=6ca9227e68092752abde685c57d05b1096e1d19e-5220363-images-thumbs&n=13",
            status: true
        }
])

export const deleteAtom = atom(
    null,
    (get, set, id) => {
        const prev = get(dataAtom);
        const update = prev.filter(item => item.id !== id);
        set(dataAtom, update);
    }
)


export const addAtom = atom(
    null,
    (get, set, newUser) => {
        const prev = get(dataAtom);
        const update = [...prev, newUser];
        set(dataAtom, update);
    }
)

export const editAtom = atom(
    null,
    (get, set, updated) => {
        const prev = get(dataAtom);
        const update = prev.map(item => 
            item.id === updated.id ? {...item, ...updated} : item
        );
        set(dataAtom, update);
    }
)