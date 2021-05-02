import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { useGetData } from '../../custom-hooks';
import { server_calls } from '../../api';
import { Button, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles } from '@material-ui/core';
import { CharacterForm } from '../../components/CharacterForm';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'super_power', headerName: 'Super Power', type: 'string', width: 350, },
    { field: 'comics_appeared_in', headerName: '# of Comic Appearances', width: 250, },
  ];

  interface gridData{
    data:{
      id?:string;
    }
  }

  const useStyles = makeStyles({
    topspace:{
      marginTop: '2vh',
      color: 'white'
    },
    textcolor:{
      color: 'white',
      textShadow: '1px 1px 4px black',
      fontFamily: 'sans-serif',
      textDecoration: 'none'
    }
  })

  export const DataTable =  () => {

    const classes = useStyles();
    let { characterData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({data:{}})
  
    let handleOpen = () => {
      setOpen(true)
    }
  
    let handleClose = () => {
      setOpen(false)
    }
  
    let deleteData = () => {
      server_calls.delete(gridData.data.id!)
      getData()
    }
  
    console.log(gridData.data.id)
  
      return (
          <div style={{ height: 400, width: '100%' }}>
            <h2>Marvel Characters In Inventory</h2>
            <DataGrid className={classes.textcolor} rows={characterData} columns={columns} pageSize={5} checkboxSelection onRowSelected = { setData } />
  
          <Button className={classes.topspace} onClick={handleOpen}>Update</Button>
          <Button className={classes.topspace} variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
  
            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Character Info</DialogTitle>
            <DialogContent>
              <DialogContentText>Update Character</DialogContentText>
                <CharacterForm id={gridData.data.id!}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
              <Button onClick = {handleClose} color = "primary">Done</Button> 
            </DialogActions>
          </Dialog>
          </div>
        );
  }