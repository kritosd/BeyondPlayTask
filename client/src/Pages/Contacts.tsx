import React, { useState, useEffect } from 'react';
import Modal from '../Components/DeveloperModal/DeveloperModal';
import RandomizerModal from '../Components/RandomizerModal/RandomizerModal';
import Datatable from '../Components/Datatable/Datatable';
import Button, { ButtonProps } from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Developers, Roles, Statuses, Teams, Randomize } from '../api/agent';
import { IDeveloperSendDescriptor, IDeveloper, IRoles, IStatus, ITeams } from '../types';

type ContactsProps = {
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[300],
    '&:hover': {
        backgroundColor: grey[400],
    },
    }));

const Contacts: React.FC<ContactsProps> = (props): React.ReactElement  => {
    const [open, setOpen] = useState<boolean>(false);
    const [openRandomizer, setOpenRandomizer] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>('');
    const [data, setData] = useState<IDeveloper[]>([]);
    
    const [roleList, setRoleList] = useState<IRoles[]>([]);
    const [statusList, setStatusList] = useState<IStatus[]>([]);
    const [teamList, setTeamList] = useState<ITeams[]>([]);


    useEffect(() => {
      loadData();
      const getOthers = async () => {
          const roles = await Roles.list();
          const statuses = await Statuses.list();
          const teams = await Teams.list();
          setRoleList(roles);
          setStatusList(statuses);
          setTeamList(teams);
        };
      getOthers();
    }, []);

    const loadData = async () => {
        const res = await Developers.list();
        setData(res.sort((a, b) => a.name.localeCompare(b.name)));
    };

    const closeRandomizerModal = () => {
        setOpenRandomizer(false);
    };

    const closeModal = () => {
        setSelectedId('');
        setOpen(false);
        setEditMode(false);
    };

    const openModal = (id: string = '', edit: boolean = false) => {
        setSelectedId(id);
        setOpen(true);
        setEditMode(edit);
    };

    const addDeveloper = async (developer: IDeveloperSendDescriptor) => {
        const res = await Developers.create(developer);
        if (res) {
            loadData();
        }
    };

    const editDeveloper = async (id: string, developer: IDeveloperSendDescriptor) => {
        const res = await Developers.update(id, developer);
        if (res) {
            loadData();
        }
    };

    return (
        <div className='container' style={{ margin: '50px' }}>
            <div className='buttonsContainer' style={{ float: 'right' }}>
                <ColorButton variant="contained" onClick={() => setOpenRandomizer(true)} style={{ marginRight: '10px'}}>NAME RANDOMIZER</ColorButton>
                <Button variant="contained" color="success" onClick={() => openModal('', true)}>CREATE NEW USER</Button>
            </div>
            <Datatable
                openModal={ openModal }
                data={data}
            />
            {
                open ? <Modal
                    id={selectedId}
                    display={open}
                    close={closeModal}
                    editMode={editMode}
                    roleList={roleList}
                    statusList={statusList}
                    teamList={teamList}
                    getDeveloper={Developers.details}
                    addDeveloper={addDeveloper}
                    editDeveloper={editDeveloper}
                /> : null
            }

            {
                openRandomizer ? <RandomizerModal
                        display={openRandomizer}
                        close={closeRandomizerModal}
                        developerList={ data }
                        randomize={ Randomize.calculate }
                    /> : null
            }
            
        </div>
    )
};

export default Contacts;