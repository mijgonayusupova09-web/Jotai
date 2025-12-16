import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useAtom } from 'jotai'
import { addAtom, dataAtom, deleteAtom, editAtom } from '../atoms/todo'
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';

const Sync = () => {
  const [data] = useAtom(dataAtom);
  const [, deleteUser] = useAtom(deleteAtom);
  const [, addUser] = useAtom(addAtom);
  const [, editUser] = useAtom(editAtom)

  const [openAdd, setOpenAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newStatus, setNewStatus] = useState(false);
  const [newImage, setNewImage] = useState("");

  const handleAdd = () => {
    addUser({
      id: Date.now(),
      name: newName,
      age: newAge,
      status: newStatus,
      image: newImage
    });
    setOpenAdd(false);
    setNewName("");
    setNewAge("");
    setNewStatus(false);
    setNewImage("");
  }

  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editImage, setEditImage] = useState("");
  const [editId, setEditId] = useState(null);

  const handleEdit = () => {
    editUser({
      id: editId,
      name: editName,
      age: editAge,
      status: editStatus,
      image: editImage
    });
    setOpenEdit(false);
    setEditId(null);
    setEditName("");
    setEditAge("");
    setEditImage("");
    setEditStatus(false);
  }

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  
  const filterData = data.filter((user) => {
    if(selected === 'active') return user.status === true;
    if(selected === 'inactive') return user.status === false;
    return true;
  })

  const [openInfo, setOpenInfo] = useState(false);
  const [infoId, setInfoId] = useState(null);

  return (
    <>
      <main className='min-h-screen bg-gray-100 p-6 flex flex-col items-center'>
        <div className='flex flex-col md:flex-row items-center gap-4 mb-8 w-full max-w-4xl'>
          <Button 
            variant='contained' 
            onClick={() => setOpenAdd(true)}
            className='bg-indigo-600 hover:bg-indigo-700 transition duration-200'
          >
            Add Card
          </Button>
          <TextField 
            placeholder='Search' 
            size="small" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className='bg-white rounded shadow-sm w-full md:w-1/3'
          />
          <select 
            value={selected} 
            onChange={(e) => setSelected(e.target.value)}
            className='p-2 rounded shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400'
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
          {
            filterData
            .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
            .map((e) => (
              <div 
                key={e.id} 
                className='bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300'
              >
                <img className='w-full h-48 object-cover' src={e.image} alt="" />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold'>{e.name}</h2>
                  <p className='text-gray-500'>{e.age}</p>
                  <p className={e.status ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {e.status ? "Active" : "Inactive"}
                  </p>
                  <div className='flex items-center gap-4 mt-4'>
                    <DeleteIcon className='cursor-pointer text-red-500 hover:text-red-600 transition' onClick={() => deleteUser(e.id)} />
                    <EditIcon className='cursor-pointer text-blue-500 hover:text-blue-600 transition' onClick={() => {
                      setOpenEdit(true);
                      setEditId(e.id);
                      setEditName(e.name);
                      setEditAge(e.age);
                      setEditStatus(e.status);
                      setEditImage(e.image);
                    }} />
                    <InfoIcon className='cursor-pointer text-gray-700 hover:text-gray-900 transition' onClick={() => {setOpenInfo(true); setInfoId(e)}}/>
                  </div>
                </div>
              </div>
            ))
          }
        </section>
      </main>

      {/* Dialogs */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent className='flex flex-col gap-3'>
          <TextField placeholder='Image URL' value={newImage} onChange={(e) => setNewImage(e.target.value)} fullWidth />
          <TextField placeholder='Name' value={newName} onChange={(e) => setNewName(e.target.value)} fullWidth />
          <TextField placeholder='Age' value={newAge} onChange={(e) => setNewAge(e.target.value)} fullWidth />
          <div className='flex items-center gap-2 mt-2'>
            <input type="checkbox" checked={newStatus} onChange={(e) => setNewStatus(e.target.checked)} className='w-4 h-4' />
            <span>Active</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant='contained' className='bg-indigo-600 hover:bg-indigo-700'>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent className='flex flex-col gap-3'>
          <TextField placeholder='Image URL' value={editImage} onChange={(e) => setEditImage(e.target.value)} fullWidth />
          <TextField placeholder='Name' value={editName} onChange={(e) => setEditName(e.target.value)} fullWidth />
          <TextField placeholder='Age' value={editAge} onChange={(e) => setEditAge(e.target.value)} fullWidth />
          <div className='flex items-center gap-2 mt-2'>
            <input type="checkbox" checked={editStatus} onChange={(e) => setEditStatus(e.target.checked)} className='w-4 h-4' />
            <span>Active</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEdit} variant='contained' className='bg-indigo-600 hover:bg-indigo-700'>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openInfo} onClose={() => setOpenInfo(false)} maxWidth="xs" fullWidth>
        <DialogTitle>User Info</DialogTitle>
        <DialogContent className='flex flex-col items-center gap-3'>
          <img src={infoId?.image} alt="" className='w-32 h-32 object-cover rounded-full' />
          <h2 className='text-xl font-semibold'>{infoId?.name}</h2>
          <p className='text-gray-500'>{infoId?.age}</p>
          <p className={infoId?.status ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {infoId?.status ? "Active" : "Inactive"}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInfo(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Sync
