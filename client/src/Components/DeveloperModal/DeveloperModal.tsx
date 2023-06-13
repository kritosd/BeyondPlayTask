import React, { useState, useEffect } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { IDeveloperSendDescriptor, IRoles, IStatus, ITeams } from '../../types';

require('./DeveloperModal.css');

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[300],
    '&:hover': {
      backgroundColor: grey[400],
    },
  }));

type ModalProps = {
    id: string;
    display: boolean;
    close: () => void;
    editMode?: boolean;
    roleList: IRoles[];
    statusList: IStatus[];
    teamList: ITeams[];
    getDeveloper: (id: string) => any;
    addDeveloper: (developer: IDeveloperSendDescriptor) => any;
    editDeveloper: (id: string, developer: IDeveloperSendDescriptor) => any;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const Modal: React.FC<ModalProps> = (props): React.ReactElement|any  => {
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [team, setTeam] = useState<string>('');

    useEffect(()  => {
        if (props.id) {
            loadData(props.id);
        } else {
            setLoading(false);
        }
    }, []);

    const submit = async () => {
        let body: IDeveloperSendDescriptor = {
            name,
            email,
            RoleId: role == '' ? 1 : parseInt(role),
            StatusId: status == '' ? 1 : parseInt(status),
            TeamId: team == '' ? 1 :  parseInt(team)
        };
        setSaving(true);
        let result ;
        if(props.id) {
            result = await props.editDeveloper(props.id, body);
        } else {
            result = await props.addDeveloper(body);
        }
        setSaving(false);
        props.close();
    };

    const loadData = async (id: string) => {
        const result = await props.getDeveloper(id);
        setName(result.name);
        setEmail(result.email);
        setRole(result.Role.id.toString());
        setStatus(result.Status.id.toString());
        setTeam(result.Team.id.toString());
        setLoading(false);
    };

    const submitDisabled = (): boolean => {
        return name === '' || email === '' || role === '' || status === '' || team === '';
    };

    if (!props.display) {
        return null;
    }

    let modalTitle = '';
    if (props.id === '') {
        modalTitle = 'CREATE NEW USER';
    } else if (props.editMode) {
        modalTitle = 'EDIT USER';
    } else {
        modalTitle = 'VIEW USER';
    } 

    return (
        <BootstrapDialog
            onClose={props.close}
            aria-labelledby="customized-dialog-title"
            open={props.display}
        >
            <DialogTitle>
                { modalTitle }
            </DialogTitle>
            <DialogContent dividers  style={{ margin: 'auto' }}>
                {
                    loading
                        ? <CircularProgress/>
                        : <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            className='content'
                            >
                            <List>
                                <ListItem>
                                    <TextField
                                        id="outlined-name"
                                        label="Name &amp; Surname"
                                        variant="outlined"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setName(e.target.value)}
                                        value={name}
                                        required
                                        disabled={!props.editMode}
                                        fullWidth
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        id="outlined-email"
                                        label="Email address"
                                        variant="outlined"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        disabled={!props.editMode}
                                    />
                                </ListItem>
                                <ListItem>
                                    <FormControl fullWidth>
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            id="outlined-select-role"
                                            value={role}
                                            onChange={ (e) => setRole(e.target.value) }
                                            disabled={!props.editMode}
                                            input={<OutlinedInput label="Role" />}
                                            fullWidth
                                        >
                                            {props.roleList.map((option) => (
                                                <MenuItem key={`role-option-${option.id}`} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </ListItem>
                                <ListItem>
                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            id="outlined-select-status"
                                            value={status}
                                            onChange={ (e) => setStatus(e.target.value) }
                                            disabled={!props.editMode}
                                            input={<OutlinedInput label="Status" />}
                                            fullWidth
                                        >
                                            {props.statusList.map((option) => (
                                                <MenuItem key={`status-option-${option.id}`} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </ListItem>
                                <ListItem>
                                    <FormControl fullWidth>
                                        <InputLabel>Team</InputLabel>
                                        <Select
                                        id="outlined-select-team"
                                            value={team}
                                            onChange={ (e) => setTeam(e.target.value) }
                                            disabled={!props.editMode}
                                            input={<OutlinedInput label="Team" />}
                                            fullWidth
                                        >
                                            {props.teamList.map((option) => (
                                                <MenuItem key={`team-option-${option.id}`} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </ListItem>
                                <ListItem>
                                    <div className='buttonsContainer'>
                                        <ColorButton variant="contained" onClick={props.close}>Cancel</ColorButton>
                                        {
                                            saving
                                                ? <LoadingButton
                                                    loading
                                                    variant="outlined"
                                                    color="success"
                                                >
                                                    SAVING
                                                </LoadingButton>
                                                : <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={submit}
                                                    disabled={submitDisabled()}
                                                >
                                                        Done
                                                </Button>
                                        }
                                    </div>
                                </ListItem>
                            </List>
                        </Box>
                }
            </DialogContent>
        </BootstrapDialog>
    )
};

export default Modal;