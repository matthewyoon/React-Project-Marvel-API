import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { useGetData } from '../../custom-hooks';
import { server_calls } from '../../api';
import { Button, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core';
import { CharacterForm } from '../../components/CharacterForm';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'super_power', headerName: 'Super Power', type: 'string', width: 160, },
    { field: 'comics_appeared_in', headerName: '# of Comic Appearances', width: 160, },
  ];

  interface gridData{
    data:{
      id?:string;
    }
  }

  export const DataTable =  () => {
  
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
            <DataGrid rows={characterData} columns={columns} pageSize={5} checkboxSelection onRowSelected = { setData } />
  
          <Button onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
  
            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Character Info</DialogTitle>
            <DialogContent>
              <DialogContentText>Update Character</DialogContentText>
                <CharacterForm id={gridData.data.id!}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
              <Button onClick={handleClose} color = "primary">Done</Button> 
            </DialogActions>
          </Dialog>
          </div>
        );
  }