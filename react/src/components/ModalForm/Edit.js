import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import './ModalForm.css'


const Edit = ({ rowData, pathname, updateData, handleClose }) => {

    const initialValues = {...rowData}
    const [values, setValues] = useState(initialValues)

    
    const handleInputChange = (e) => {
        const {name, value, checked} = e.target;
        let resValue = value

        if (value === '')
            resValue = checked

        setValues({
            ...values,
            [name]: resValue,
        })
    }


    const generateInput = (key, value) => {
        if (typeof value === 'boolean'){
            return (
                <>
                    {key}
                    <Checkbox name={key} checked={value}  onChange={(e) => {handleInputChange(e)}} type='checkbox'/>
                </>
            )
        }
        else if (key.substring(0,4) === 'date'){
            return
        }
        else{
            return (
                <>
                    {key}
                    <TextField style={{marginLeft: '11px'}} name={key} value={values[key]} onChange={(e) => {handleInputChange(e)}}/>  
                </>
            )
        }

    }

    const[popupData, setPopupData] = useState([])

    const generatePopupInput = (key, allValues) => {
        return (
            <select name={key} onChange={(e) => {handleInputChange(e)}}>
                {
                    [...allValues].map((groupName) => {
                        return <option value={groupName}>{groupName}</option>
                    })
                }         
            </select>
        )
    }

    
    useEffect(async () => {
        const response = await axios.get('http://127.0.0.1:8000/groups/');
        const result = [...response.data['data']].map((group) => {
            return group['name']
        })
        
        setPopupData(result);
    }, [])


    const [errorEmail, setErrorEmail] = useState(false)

    const updateRow = (e) => {  
        e.preventDefault()
        axios.patch(`http://127.0.0.1:8000/${pathname}/`, values)
        .then(response => {
            updateData(prevstate => ({
                ...prevstate, 
                data: prevstate.data.map((el) => {
                    if (el.id === values.id){
                        el = {...values}
                    }
                    return el
                })          
            })) 
            
            handleClose()
        }).catch((error) => {
            setErrorEmail(true)
        })
        
    }

    const [errorDeleteExisting, setErrorDeleteExisting] = useState(false)

    const deleteRow = (e) => {
        e.preventDefault()
        axios.delete(`http://127.0.0.1:8000/${pathname}/`, {data: values})
        .then(response => {updateData(prevstate => ({
            ...prevstate, 
            data: prevstate.data.filter((el) => {
                return el.id !== values.id
            })          
        }))
        
        handleClose()
    }).catch((error) => {
        setErrorDeleteExisting(true)
    })
    }

    
    return (
        <div className="modalContent">
            <form className="modalForm">
                {Object.keys(rowData).map((key, index) =>{
                        if (key == 'group')
                            return <dd key={key + '-' + index}>{key} {generatePopupInput(key, popupData)}</dd>
                        
                        else if (key != 'id')
                            return <dd key={key + '-' + index}>{generateInput(key, values[key])}</dd>
                        
                })}

                    
                    <div>
                        <Button variant="contained" 
                        color="secondary" style={{margin: '5px', width: '7px', height: '31px'}} onClick={(e) => {deleteRow(e)}}>
                                Delete
                        </Button>

                        <Button id='sendDataButton' type='submit' onClick={(e) => {updateRow(e)}}
                        variant="contained" color="primary" size="small">
                            Save
                        </Button>
                        
                        { errorEmail && 
                            <dd style={{color: 'red'}}>Invalid email</dd> 
                        } 

                        { errorDeleteExisting && 
                            <dd style={{color: 'red'}}>Can't be deleted, row has relation with another table</dd> 
                        } 

                    </div>
            </form>  
        </div>
    )
}


export { Edit }

