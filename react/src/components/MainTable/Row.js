import React from 'react'
import { useLocation } from 'react-router-dom'
import './MainTable.css'
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const Row = ({ currRow, handleOpen }) => {

    const location = useLocation()
    
    return (
        <>
        <TableRow>{
            
            Object.keys(currRow).map((key) => {
                if (true === currRow[key])
                    return <TableCell>true</TableCell>
                else if (false === currRow[key])
                    return <TableCell>false</TableCell> 
                return <TableCell>{currRow[key]}</TableCell>
            })
        }
        <TableCell>
            <Button variant="contained" size="small"  onClick={(e) => {handleOpen(e)}}>
                Edit { location.pathname[1].toUpperCase() + location.pathname.slice(2, -1) }
            </Button>
        </TableCell>
        </TableRow>
        </>
    )
    
}




export { Row }