import { Avatar, Box, Chip, colors, IconButton, Paper, Stack, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { PropTypes } from 'prop-types'
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react'
import getImageUrl from '../utils/imageUtils';
import { Delete, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';
import { number } from 'zod';
import { da } from 'zod/v4/locales';
import CellButton from './CustomCellButton';


const TablePaginationActions = (props) => {
    const { count, rowsPerPage, page, onPageChange } = props;
    const theme = useTheme();

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    }
    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    }
    const handleNextPageButtonClick = (event) => {
        onPageChange(event, page + 1);
    }
    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.ceil(count / rowsPerPage) - 1);
    }

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label='first page'
            >
                {theme.direction == 'rtl' ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction == 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction == 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction == 'rtl' ? <FirstPage /> : <LastPage />}
            </IconButton>
        </Box>
    );

}

TablePaginationActions.prototype = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
}

function CustomTable({
    tableName,
    rowsPerPageOptions = [],
    data = [],
    tableHeaders = [{}],
    headerColor,
    width,
    height,
    onViewClick,
    onEditClick,
    onDeleteClick,
    tableRef,
    ...others

}) {

    const StyledTableCell = styled(TableCell, { shouldForwardProp: (prop) => prop !== 'headerColor' })(({ theme, headerColor }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: headerColor || theme.palette.common.black,
            color: theme.palette.common.white,
            whiteSpace: 'nowrap',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            //whiteSpace: 'nowrap',
            overflowWrap: 'anywhere',
            paddingTop: '8px',    // උස එකම මට්ටමේ තබා ගැනීමට Padding පාලනය කරයි
            paddingBottom: '8px',
            height: '53px',       // සියලුම පේළි සඳහා ස්ථිර උසක් ලබා දේ
            boxSizing: 'border-box',
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleRowsPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const visibleRows = rowsPerPage > 0
        ? data.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        )
        : data;

    const emptyRows = rowsPerPage > 0
        ? Math.max(0, rowsPerPage - visibleRows.length)
        : 0;


    //const profileImage = getImageUrl("uploads/profileImages", Profile.UserProfile.ProfileImageUrl, "cff2e6ab-3478-4932-8c39-98bd73182eda_b1.jpg");
    return (
        <TableContainer
            ref={tableRef}
            sx={{
                height: '100%',
                minHeight: '100%',
                width: '100%',
                maxWidth: '100%',
                minWidth: 0,
                overflow: 'auto'

            }}
            component={Paper} >
            <Table stickyHeader sx={{
                width: '100%',
                height: '100%',
                tableLayout: 'auto',
            }}>
                <TableHead sx={{ bgcolor: colors.amber }}>
                    <TableRow>
                        {tableHeaders.map((header, index) => (
                            <StyledTableCell
                                headerColor={headerColor}
                                key={index}
                                style={{ width: header.width || 160, minWidth: header.width || 160 }}
                                align={header.align || 'left'}>
                                {header.field.toUpperCase()}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleRows.map((row, index) => (

                        <StyledTableRow key={index}>
                            <StyledTableCell>{page * rowsPerPage + (++index)}</StyledTableCell>
                            <StyledTableCell>{row.UserProfile?.FirstName} {row.UserProfile?.Lastname}</StyledTableCell>
                            <StyledTableCell>{row.UserProfile?.Nic}</StyledTableCell>
                            <StyledTableCell>{row.UserProfile?.Designation}</StyledTableCell>
                            <StyledTableCell>{row.UserProfile?.Branch}</StyledTableCell>
                            <StyledTableCell>{row.UserProfile?.PhoneNumber}</StyledTableCell>
                            <StyledTableCell>{row.Email}</StyledTableCell>
                            <StyledTableCell>
                                <Chip
                                    size='small'
                                    avatar={<Avatar alt={row.UserProfile?.FirstName} src={getImageUrl("uploads/profileImages", row.UserProfile?.ProfileImageUrl, "cff2e6ab-3478-4932-8c39-98bd73182eda_b1.jpg")}></Avatar>}
                                    label={row.UserProfile?.IsActive ? "Active" : 'Deactive'}
                                    color={row.UserProfile?.IsActive ? "success" : 'error'}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <Stack direction='row' spacing={1}>
                                    <Chip
                                        label='View'
                                        color='primary'
                                        onClick={() => onViewClick(row.Id)}
                                        deleteIcon={<Delete />}
                                        size='small'
                                        variant='outlined'

                                    />
                                    <Chip
                                        label='Edit'
                                        color='warning'
                                        onClick={() => {

                                            onEditClick(row.Id);

                                        }}
                                        deleteIcon={<Delete />}
                                        size='small'
                                        variant='outlined'
                                    />
                                    <Chip
                                        label='Delete'
                                        color='error'
                                        onClick={() => onDeleteClick(row)}
                                        deleteIcon={<Delete />}
                                        size='small'
                                        variant='outlined'
                                    />
                                </Stack>
                            </StyledTableCell>

                        </StyledTableRow>

                    ))}
                    {emptyRows > 0 && (
                        <StyledTableRow style={{ height: 53 * emptyRows }}>
                            <StyledTableCell colSpan={tableHeaders.length}></StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <StyledTableRow>
                        <TablePagination
                            sx={{
                                position: 'sticky',
                                bottom: 0,
                                backgroundColor: 'background.paper',
                                zIndex: 2,
                            }}

                            rowsPerPageOptions={rowsPerPageOptions}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                },
                            }}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPageChange}
                            ActionsComponent={TablePaginationActions}


                        />
                    </StyledTableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default CustomTable