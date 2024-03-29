import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { CustomSelectLabel } from 'src/components/custom-select';
import Checkbox from '@mui/material/Checkbox';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function NewDiaryDialog({
  open,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
  editingDiary,
  isEditing = false,
  ...other
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [historyToogle, setHistoryToogle] = useState(false);

  const [happenedAt, setHappenedAt] = useState(new Date());

  useEffect(() => {
    if (isEditing) {
      setTitle(editingDiary.attributes.title);
      setDescription(editingDiary.attributes.description);
      setSelectedType(editingDiary.attributes.type);
      setHappenedAt(new Date(editingDiary.attributes.happenedAt));
    } else {
      resetForm();
    }
  }, [editingDiary, isEditing]);

  const handleCreateOrUpdate = () => {
    const item = {
      title,
      description,
      type: selectedType,
      isHistory: historyToogle,
      happenedAt,
    };

    if (isEditing) {
      onUpdate(editingDiary.id, item); // Assuming each diary entry has a unique ID
    } else {
      onCreate(item);
    }
    resetForm();
    onClose();
  };

  const handleDelete = () => {
    onDelete(editingDiary.id);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedType('');
    setHistoryToogle(false);
    setHappenedAt(new Date());
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
        <Typography variant="h6"> {isEditing ? 'Update Diary' : 'Create Diary'} </Typography>
        <Checkbox
          color="warning"
          icon={<Iconify icon="eva:star-outline" />}
          checkedIcon={<Iconify icon="eva:star-fill" />}
          checked={historyToogle}
          onChange={(event) => {
            setHistoryToogle(event.target.checked);
          }}
        />
      </Stack>
      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <Stack spacing={2}>
          Date
          <DatePicker format="dd/MM/yyyy" value={happenedAt} onChange={setHappenedAt} />
          Title
          <TextField fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          <CustomSelectLabel
            label="Type"
            options={['family', 'travel', 'study', 'friend', 'hobby', 'sports', 'work']}
            selectOption={selectedType}
            placeholder="Select a type"
            onChange={setSelectedType}
          />
          Description
          <TextField
            multiline
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
          {isEditing && (
            <Button variant="outlined" color="error" onClick={handleDelete} sx={{ mr: 3 }}>
              Delete
            </Button>
          )}
          <Button variant="soft" onClick={handleCreateOrUpdate}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

NewDiaryDialog.propTypes = {
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  open: PropTypes.bool,
  editingDiary: PropTypes.object,
  isEditing: PropTypes.bool,
};
