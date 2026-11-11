import * as React from 'react'
import useUserManager from '../hooks/useUserManager'
import CustomTable from '@/core/components/CustomTable';
import { Box, Collapse, colors, Drawer } from '@mui/material';
import { amber, blue } from '@mui/material/colors';
import UserDetailDrawer from '../components/UserDetailDrawer';
import UserEditDrawer from '../components/UserEditDrawer';
import { set } from 'zod';

function ListUsers() {
    const { loading, users, message, loadUsers } = useUserManager();
    const [openViewDrawer, setOpenViewDrawer] = React.useState(false);
    const [openEditDrawer, setOpenEditDrawer] = React.useState(false);
    const [userDetail, setUserDetail] = React.useState(null);
    const [userId, setUserId] = React.useState(0);

    React.useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    // 1. TableContainer එක සඳහා ref එකක් සාදා ගැනීම
    const tableContainerRef = React.useRef(null);

    // 2. Drawer එක open වන අවස්ථාවේදී scroll එක දකුණු පසට ගෙන යාම
    React.useEffect(() => {
        if ((openViewDrawer || openEditDrawer) && tableContainerRef.current) {
            // Collapse animation එක (300ms) අවසන් වන තෙක් හෝ ක්ෂණිකව scroll කිරීමට
            setTimeout(() => {
                const container = tableContainerRef.current;
                container.scrollTo({
                    left: container.scrollWidth, // සම්පූර්ණ දකුණු කෙළවරටම scroll කරයි
                    behavior: 'smooth'           // අවශ්‍ය නම් 'auto' දිය හැක
                });
            }, 300); // Collapse duration එකට සමානව හෝ ඊට මදක් වැඩි කාලයක් තැබීම හොඳයි
        }
    }, [openViewDrawer, openEditDrawer]);



    const handleViewClick = (userId) => {
        setUserId(userId);
        setOpenViewDrawer(true);
        setOpenEditDrawer(false);

    }

    const handleEditClick = (userId) => {
        setOpenEditDrawer(true);
        setOpenViewDrawer(false);
        setUserId(userId);
    }


    const handleCloseDrawer = () => {
        setOpenViewDrawer(false);
        setOpenEditDrawer(false);
    }


    console.log(users)
    if (loading) {
        return <div>Loading users...</div>;
    }

    if (message) {
        return <div>{message}</div>;
    }



    return (
        <Box sx={{ display: 'flex', p: 1, height: '100%', width: '100%', gap: 1, boxSizing: 'border-box', minWidth: 0, }}>
            <Box sx={{
                flexGrow: 1,
                minWidth: 0,
                transition: 'flex-grow 300ms ease',
                //border: '1px solid black',

            }}>
                <CustomTable
                    tableRef={tableContainerRef}
                    data={users}
                    rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                    tableHeaders={[
                        { field: 'No.', width: 50 },
                        { field: 'Full Name', width: 160 },
                        { field: 'NIC', width: 160 },
                        { field: 'Designation', width: 160 },
                        { field: 'Branch', width: 160 },
                        { field: 'Contact', width: 160 },
                        { field: 'Email', width: 160 },
                        { field: 'Status', width: 160 },
                        { field: 'Actions', width: 200 },
                    ]}
                    headerColor={blue[500]}
                    onViewClick={handleViewClick}
                    onEditClick={handleEditClick}
                >

                </CustomTable>

            </Box>
            <Collapse in={openViewDrawer} orientation='horizontal' sx={{ boxSizing: 'border-box', flexShrink: 0 }} unmountOnExit>
                <Box sx={{
                    border: '1px solid #f1f1f1',
                    p: 1,
                    width: 300,
                    height: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 5,

                }}>
                    <UserDetailDrawer onClose={handleCloseDrawer} userId={userId} />
                </Box>

            </Collapse>
            {/* User edit form */}
            <Collapse
                in={openEditDrawer}
                orientation='horizontal'
                sx={{
                    boxSizing: 'border-box',
                    //border: '1px solid green',
                    flexShrink: 0,
                    height: '100%',
                }} unmountOnExit>
                <Box sx={{
                    width: '600px',
                    height: '100%',
                    bgcolor: 'Background.paper',
                    borderRadius: 3,
                    boxShadow: 5,
                    //border: '1px solid red',
                    overflow: 'auto'
                }}>
                    <UserEditDrawer onClose={handleCloseDrawer} userId={userId} />
                </Box>
            </Collapse>


        </Box>
    );
}

export default ListUsers