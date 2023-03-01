import React from 'react'
import './../styles/toolbar.scss'
import toolState from '../store/toolState'

const Settings = () => {
   return (
      <div className='setting-bar'>
         <label htmlFor='line-width' style={{ marginLeft: '10px' }}>Толщина линии: </label>
         <input
            style={{ margin: '0 10px' }}
            type='number'
            defaultValue={1}
            min={1}
            max={50}
            id='line-width'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => toolState.setLineWidth(Number(e.target.value))}
         />
         <label htmlFor='stroke-color'>Цвет обводки: </label>
         <input
            style={{ margin: '0 10px' }}
            type='color'
            id='stroke-color'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => toolState.setStrokeColor(e.target.value)}
         />
      </div>
   )
}

export default Settings