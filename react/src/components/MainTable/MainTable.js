import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row } from './Row'
import './MainTable.css'
import { Modal, Container } from '@material-ui/core'
import {Edit} from '../ModalForm/Edit'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Add } from '../Add/Add'

const MainTable = ({pathname}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/${pathname}/`);
            for(let obj of response.data.data){
                for(let prop in obj){
                    if (obj[prop] === 'true')
                        obj[prop] = true
                    else if (obj[prop]  === 'false')
                        obj[prop] = false
                }
            }
            setData(response.data);
        }        

        getData();
    }, [pathname])


    const [groups, setGroups] = useState([])


    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState(null)


    const handleClose = () => {
        setIsOpen(false)
    }

    const handleOpen = (e, row) => {
        e.preventDefault()
        setModalData(row)
        setIsOpen(true)
    }


    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    const classes = useStyles();
    return (
        <>
        <Add rowFields={data.fields} pathname={pathname} updateData={setData}/>

        <div className='mainTable'>
        <Container fixed>
        <TableContainer component={Paper}>
            <Table className={classes.table} size="medium">
                {
                    data['data'] && 
                    <>
                        <TableHead>
                            <TableRow>
                                {
                                Object.keys(data.fields).map((field) =>{
                                    return <TableCell>{field}</TableCell>
                                })
                                } 
                                <TableCell>{'Actions'}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                
                                Array.from(data['data']).map((row) => {   
                                    return <Row name={row.id} currRow={row} handleOpen={(e) => handleOpen(e, row)} />
                                 })
                                    
                            }
                            
                        </TableBody>
                    </>
                }
            </Table>
        </TableContainer>
        </Container>
        </div>
        {   

            isOpen && <Modal open={isOpen} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"> 
            <div className="addModalWindow">
                <Edit rowData={modalData} pathname={pathname} updateData={setData} handleClose={handleClose}/>
                <Button variant="contained" size="small"  onClick={handleClose} id="modalCloseButton">
                    Close 
                </Button> 
            </div>
            </Modal>
        }
    </>
    );
    
}



export {MainTable}