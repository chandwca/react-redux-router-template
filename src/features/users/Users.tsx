import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, deleteUserById, editUserByID, fetchUserData, selectAllUsers } from './usersSlice';
import { RootState } from '../../app/store';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAllUsers);
  const { loading, error } = useSelector((state: RootState) => state.users);

  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const handleOpenModal = (mode: 'add' | 'edit', userId?: number) => {
    setModalMode(mode);
    setEditUserId(userId || null);
    if (mode === 'edit' && userId !== undefined && data && data.length > 0) {
      const userToEdit = data.find((user) => user.id === userId);
      if (userToEdit) {
        setName(userToEdit.name);
        setEmail(userToEdit.email);
      }
    } else {
      setName('');
      setEmail('');
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleAddUser = async () => {
    try {
      await dispatch(addNewUser({ name, email }) as any) ;
      setName('');
      setEmail('');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  const handleEditUser = async () => {
    try {
      if (editUserId !== null) {
        console.log(editUserId)
        await dispatch(editUserByID({ userId: editUserId, name, email }) as any);
      }
    } catch (error) {
      console.error('Error editing user:', error);
    }
    finally {
      handleCloseModal();
    }
  };
  const handleDeleteUser = async (userId: number) => {
    try {
        await dispatch(deleteUserById(userId) as any);
        dispatch(fetchUserData() as any);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
};
  useEffect(() => {
    dispatch(fetchUserData() as any);
  }, [dispatch]);

  if (loading === 'loading') {
    return <p>Loading...</p>;
  }

  if (loading === 'failed') {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ marginLeft: 'auto', marginTop: '16px' }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal('add')}  style={{ margin: '16px' }}>
          Add User
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                <IconButton onClick={() => handleOpenModal('edit', user.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* pop-up */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
       <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {modalMode === 'add' ? 'Add User' : 'Edit User'}
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={modalMode === 'add' ? handleAddUser : handleEditUser}
          >
            {modalMode === 'add' ? 'ADD' : 'EDIt'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Users;
