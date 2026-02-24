// import {View, Text, TouchableOpacity} from 'react-native';
// import React from 'react';

// export default function Btn({bgColor, btnLabel, textColor, Press}) {
//   return (
//     <TouchableOpacity
//     onPress={Press}
//       style={{
//         backgroundColor: bgColor,
//         borderRadius: 100,
//         alignItems: 'center',
//         width: 350,
//         // paddingVertical: 5,
//         // marginVertical: 10,
//          height: 60,
//       }}>
//       <Text style={{color: textColor, fontSize: 25, textAlign:'center',fontWeight: 'bold'}}>
//         {btnLabel}
//       </Text>
//     </TouchableOpacity>
//   );
// }

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Btn({ bgColor, btnLabel, textColor, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 350,
        height: 50, 
        top: 30,
        // marginVertical: 10,
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center', 
        }}
      >
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
