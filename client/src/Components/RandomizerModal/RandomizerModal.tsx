import React, { useState } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import { IDeveloper, IRandomize, IRandomizeResp } from '../../types';

require('./RandomizerModal.css');

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[300],
    '&:hover': {
      backgroundColor: grey[400],
    },
  }));

type RandomizerModalProps = {
    display: boolean;
    close: () => any;
    developerList: IDeveloper[];
    randomize: (randomizeOptions: IRandomize) => any;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export enum Orders {
    Random = 'Random',
    Alphabetically = 'Alphabetically',
};

const RandomizerModal: React.FC<RandomizerModalProps> = (props): React.ReactElement|any  => {
    const [saving, setSaving] = useState<boolean>(false);
    const [selectedDevelopers, setSelectedDevelopers] = useState<IDeveloper[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Orders>(Orders.Random);
    const [speaker, setSpeaker] = useState<string>('');
    const [generatedList, setGeneratedList] = useState<IDeveloper[]>([]);
    
    const submit = async () => {
        setSaving(true);
        const randomizeOptions: IRandomize = {
            developers: selectedDevelopers.map((dev) => dev.id),
            order: selectedOrder,
            speaker: speaker
        };
        const data: IRandomizeResp = await props.randomize(randomizeOptions);
        if (data) {
            setGeneratedList(data.developers);
            setSpeaker(data.speaker.id);
            setSaving(false);
        }
    };

    const clear = () => {
        setGeneratedList([]);
        setSelectedDevelopers([]);
        setSelectedOrder(Orders.Random);
        setSpeaker('');
    };

    const handleChange = (event: any) => {
        let selections = event.target.value

        const newSelection = selections.pop();

        let foundIndex = -1;

        if (typeof newSelection === 'string') {
            foundIndex = selectedDevelopers.findIndex(f => f.id === newSelection);
            if (newSelection === 'all') {
                if (selections.length === props.developerList.length) {
                    selections = [];
                } else {
                    selections = props.developerList;
                }
            } else if (foundIndex > -1) {
                selections.splice(foundIndex,1);
            } else {
                selections.push(props.developerList.find(f => f.id === newSelection));
            }
        }
        setSelectedDevelopers(selections);
    };

    const handleChangeOrder = (e: any) => {
        let value: Orders = e.target.value;
        setSelectedOrder(value);
    };

    if (!props.display) {
        return null;
    }

    const modalTitle = 'NAME RANDOMIZER';

    return (
        <BootstrapDialog
            onClose={props.close}
            aria-labelledby="customized-dialog-title"
            open={props.display}
            className={'Dialog'}
        >
            <DialogTitle>
                { modalTitle }
            </DialogTitle>
            <DialogContent dividers  style={{ margin: 'auto' }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    className='content'
                >
                    {
                        generatedList.length > 0
                            ? <List
                                sx={{
                                width: '100%',
                                maxWidth: 360,
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 300,
                                '& ul': { padding: 0 },
                                }}
                                subheader={<li />}
                            >
                                <ul>
                                    <ListSubheader>{`List result: `}</ListSubheader>
                                    {generatedList.map((item, index) => (
                                        <ListItem key={`item-${item.id}`}>
                                            <ListItemText primary={`${++index}. ${item.name}`} />
                                            {
                                                speaker === item.id
                                                    ? <span style={{ paddingLeft: '10px', fontSize: '10px' }} >(Designated Speaker)</span>
                                                    : null
                                            }
                                        </ListItem>
                                    ))}
                                </ul>
                            </List>
                            : <>
                            <List>
                                <ListItem>
                                    <FormControl fullWidth>
                                        <InputLabel>Developers</InputLabel>
                                        <Select
                                            labelId="multiple-developers-label"
                                            id="multiple-developers"
                                            multiple
                                            value={selectedDevelopers}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Developers" />}
                                            renderValue={(selected) => selected.length.toString().concat(' Developers')}
                                            MenuProps={MenuProps}
                                            disabled={saving}
                                            fullWidth
                                        >
                                            <MenuItem value="all">
                                                <Checkbox
                                                    checked={props.developerList.length > 0 && selectedDevelopers.length === props.developerList.length}
                                                />
                                                <ListItemText primary="Select All" />
                                            </MenuItem>
                                            {props.developerList.map((option) => (
                                                <MenuItem key={`speaker-option-${option.id}`} value={option.id}>
                                                    <Checkbox checked={selectedDevelopers.findIndex(d => d.id === option.id) > -1} />
                                                    <ListItemText primary={option.name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </ListItem>
                                <ListItem>
                                    <FormControl fullWidth>
                                        <InputLabel>Sorting order</InputLabel>
                                        <Select
                                            id="order-selection"
                                            // label="Sorting order"
                                            value={selectedOrder}
                                            onChange={handleChangeOrder}
                                            input={<OutlinedInput label="Sorting order" />}
                                            MenuProps={MenuProps}
                                            disabled={saving}
                                            fullWidth
                                        >
                                            {Object.keys(Orders).map((option) => (
                                                <MenuItem key={`team-option-${option}`} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </ListItem>
                                <ListItem>
                                    <FormControl fullWidth>
                                        <InputLabel>Speaker</InputLabel>
                                        <Select
                                            id="speaker-selection"
                                            value={speaker}
                                            onChange={ (e) => setSpeaker(e.target.value) }
                                            input={<OutlinedInput label="Speaker" />}
                                            MenuProps={MenuProps}
                                            disabled={saving}
                                            fullWidth
                                        >
                                            {selectedDevelopers.map((option) => (
                                                <MenuItem key={`team-option-${option.id}`} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </ListItem>

                            </List>
                        </>
                    }
                <div className='buttonsContainer'>
                    <ColorButton variant="contained" onClick={props.close}>Cancel</ColorButton>
                    {
                        saving
                            ? <LoadingButton
                                loading
                                variant="outlined"
                                color="success"
                            >
                                LOADING LIST
                            </LoadingButton>
                            : (generatedList.length > 0 ? <Button variant="contained" color="success" onClick={clear}>Generate New</Button> : <Button variant="contained" color="success" onClick={submit}>Done</Button>)
                    }
                </div>
            </Box>
            </DialogContent>
        </BootstrapDialog>
    )
};

export default RandomizerModal;