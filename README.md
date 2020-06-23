# sprettie

## Getting started

`$ npm install sprettie --save`

ou

`$ yarn add sprettie`


## Usage
```javascript
import React, { useState } from 'react'
import { View } from 'react-native'
import { BottomPopUp, Select } from 'sprettie'

function App() {
  const [visible, setVisible] = useState(true)
  
  return (
    <View style={{ flex: 1}}>
      <Select 
        label="Selecione um item" /* This prop is optional */
        itens={
          [
            { value: 1, label: 'Option 1' },
            { value: 2, label: 'Option 2' },
          ]
        }
        onSelected={item => {
          console.log(item.value)
        }}
      />
    
      <BottomPopUp
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <View></View>
      </BottomPopUp>
    </View>
  )
}
```
