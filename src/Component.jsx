import React, {useState} from 'react'

export default function Component() {
    const [text,setText] = useState();
    const [updated,setUpdated] = useState();
    const textonChange = (event) => {
        setText(event.target.value);

    }
    const buttonOnClick = () => {
        setUpdated(text);
    }
  return (
    <div>
        <input type="text" value={text} onChange={textonChange} />
        <button onClick={buttonOnClick}>Actualizar</button>
        <p>texto input: {text}</p>
        <p>texto actualizado: {updated}</p>
    </div>
  )
}
