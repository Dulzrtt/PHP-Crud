import React from 'react'
import Select from "react-select";


const SelectTable = ({onChange}) => {
    const customStyles = {
        control: (provided) => ({
          ...provided,
          width: 300, // Define uma largura fixa
          minWidth: 300, // Impede que o tamanho diminua
          maxWidth: 300, // Impede que o tamanho aumente
        }),
      };    
    
    
    const options = [
        { value: 'Todas', label: 'Todas' },
        { value: 'Pendente', label: 'Pendente' },
        { value: 'Em progresso', label: 'Em progresso' },
        { value: 'Finalizada', label: 'Finalizada' }
      ]
  
    return (
        <div><Select defaultValue={options[0]} options={options} onChange={onChange} styles={customStyles}></Select></div>
    )
    }

export default SelectTable