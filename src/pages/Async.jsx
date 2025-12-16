import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { addAtom, dataAtom, deleteAtom, getAtom, editAtom } from "../atoms/todos";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
} from "@mui/material";

export default function AsyncWithModal() {
  const [data] = useAtom(dataAtom);
  const [, getUsers] = useAtom(getAtom);
  const [, addUser] = useAtom(addAtom);
  const [, deleteUsers] = useAtom(deleteAtom);
  const [, editUser] = useAtom(editAtom);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Для Add
  const [addName, setAddName] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addAvatar, setAddAvatar] = useState("");
  const [addStatus, setAddStatus] = useState(true);

  // Для Edit
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [editStatus, setEditStatus] = useState(true);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    getUsers();
  }, []);

  const handleAdd = async () => {
    await addUser({
      name: addName,
      phone: addPhone,
      avatar: addAvatar,
      status: addStatus,
    });
    setAddName("");
    setAddPhone("");
    setAddAvatar("");
    setAddStatus(true);
    setIsAddOpen(false);
  };

  const handleEdit = async () => {
    if (!editId) return;
    await editUser({
      id: editId,
      name: editName,
      phone: editPhone,
      avatar: editAvatar,
      status: editStatus,
    });
    setEditId(null);
    setEditName("");
    setEditPhone("");
    setEditAvatar("");
    setEditStatus(true);
    setIsEditOpen(false);
  };

  const openEditModal = (user) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditPhone(user.phone);
    setEditAvatar(user.avatar);
    setEditStatus(user.status);
    setIsEditOpen(true);
  };

  const filteredData = data
    .filter((user) => {
      if (selected === "active") return user.status === true;
      if (selected === "inactive") return user.status === false;
      return true;
    })
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ p: 4 }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2, mb: 3 }}>
        <Button variant="contained" color="primary" onClick={() => setIsAddOpen(true)}>Add User</Button>

        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <TextField
            label="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />
          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select value={selected} label="Status" onChange={(e) => setSelected(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* CARDS */}
      <Grid container spacing={3}>
        {filteredData.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              {user.avatar && <CardMedia component="img" height="160" image={user.avatar} alt={user.name} />}
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">{user.phone}</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: user.status ? "green" : "red", fontWeight: 600 }}>
                  {user.status ? "Active" : "Inactive"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="error" onClick={() => deleteUsers(user.id)}>Delete</Button>
                <Button color="warning" onClick={() => openEditModal(user)}>Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ADD MODAL */}
      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <Box sx={{ p: 3, width: 350 }}>
          <Typography variant="h6" mb={2}>Add User</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Name" value={addName} onChange={(e) => setAddName(e.target.value)} />
            <TextField label="Phone" value={addPhone} onChange={(e) => setAddPhone(e.target.value)} />
            <TextField label="Avatar URL" value={addAvatar} onChange={(e) => setAddAvatar(e.target.value)} />
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select value={addStatus ? "true" : "false"} onChange={(e) => setAddStatus(e.target.value === "true")}>
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleAdd}>Add</Button>
            </Box>
          </Box>
        </Box>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <Box sx={{ p: 3, width: 350 }}>
          <Typography variant="h6" mb={2}>Edit User</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
            <TextField label="Phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
            <TextField label="Avatar URL" value={editAvatar} onChange={(e) => setEditAvatar(e.target.value)} />
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select value={editStatus ? "true" : "false"} onChange={(e) => setEditStatus(e.target.value === "true")}>
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleEdit}>Save</Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

