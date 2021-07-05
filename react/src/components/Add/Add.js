import { Button, Container, Modal} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './Add.css'
import axious from 'axios'

const Add = ({rowFields, pathname, updateData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const location = useLocation()
    const initialValues = {...rowFields}
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


    const[popupData, setPopupData] = useState([])

    useEffect(async () => {
        const response = await axios.get('http://127.0.0.1:8000/groups/');
        const result = [...response.data['data']].map((group) => {
            return group['name']
        })
        
        setPopupData(result);
    }, [])


    const formGenerator = (rowFields, handleInputChange, popupData) => {
        const generatePopupInput = (key, allValues) => {
            return (
                <div className="formInputs">
                    <label className="formInputsLabels" for={key}>{key}</label>
                    <select  name={key} onChange={(e) => {handleInputChange(e)}}>
                        {
                            [...allValues].map((name) => {
                                return <option value={name}>{name}</option>
                            })
                        }         
                    </select>
                </div>
            )
        }

        const inputs = []

        for (let key in rowFields){
            if (rowFields[key] === "BooleanField"){
                inputs.push(
                <div className="formInputs">
                    <label className="formInputsLabels" for={key}>{key}</label>
                    <Checkbox name={key} onChange={(e) => {handleInputChange(e)}} type='checkbox'/>
                </div>
                )
            }
            else if (key.substring(0,4) === 'date'){
                continue
            }
            else if (rowFields[key] === "CharField"){
                inputs.push(
                <div className="formInputs">
                    <label className="formInputsLabels" for={key}>{key}</label>
                    <TextField className="formInputs" required style={{marginLeft: '11px'}}name={key} onChange={(e) => {handleInputChange(e)}}></TextField>
                </div>
                )
            }
            else if (rowFields[key] === "ForeignKey"){
                inputs.push(generatePopupInput(key, popupData))            
            }
        }
            
        return inputs
    }


    const sendRow = (e) => {
        
        axious.post(`http://127.0.0.1:8000/${pathname}/`, values)
        .then(response => {updateData(prevstate => ({
            ...prevstate, 
            data: prevstate.data.filter((el) => {
                return el.id !== values.id
            })          
        }))
        handleClose()
    })}


    return (
        <>
        <Modal open={isOpen} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            <div className="addModalWindow">
               
                <div className="modalContent">
                    <form>
                            {formGenerator(rowFields, handleInputChange, popupData)}
                        <div className="formInputs">
                            <Button id='sendDataButton' type='submit' variant="contained" 
                            color="primary" size="small" onClick={(e) => {sendRow(e)}}>
                                Send
                            </Button>
                        </div>
                    </form>
                    
                    <Button variant="contained" size="small"  onClick={handleClose} id="modalCloseButton">
                        Close 
                    </Button> 

                </div>
          
            </div>
        </Modal>


        <Container fixed style={{ display: 'flex' }}>
            <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginLeft: 'auto'}}>
                Add { location.pathname[1].toUpperCase() + location.pathname.slice(2, -1) }
            </Button>
        </Container>
        </>
        
    )
}



export {Add}