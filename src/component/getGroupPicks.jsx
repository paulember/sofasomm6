function getOid53_From53Key(in53Key){
  switch (in53Key) {
      case '0':
        return '340';
      case '1':
        return '123';
      case '2':
        return '124';
      case '3':
        return '120';
      case '4':
        return '134';
      case '5':
        return '130';
      case '6':
        return '140';
      case '7':
        return '234';
      case '8':
        return '230';
      case '9':
        return '240';
      default: 
        return '123'
  }

}

function getOid72_From72Key(bottleOrdinal, in72Key){
  console.log ('get_oid72_from_72_key_bottle In: ' + bottleOrdinal + ':in72Key In:' + in72Key )
  if (bottleOrdinal == '1'){
    switch (in72Key){
      case '00':
        return '6' 
      case '01':
        return '1' 
      case '02':
        return '1'
      case '03':
        return '1' 
      case '04':
        return '1'
      case '05':
        return '1' 
      case '06':
        return '1'
      case '07':
        return '2' 
      case '08':
        return '2'
      case '09':
        return '2' 
      case '10':
        return '2' 
      case '11':
        return '2' 
      case '12':
        return '3'
      case '13':
        return '3' 
      case '14':
        return '3'
      case '15':
        return '3' 
      case '16':
        return '4'
      case '17':
        return '4' 
      case '18':
        return '4'
      case '19':
        return '5' 
      case '20':
        return '5'
    default:
        return '3' 
                
      }

    }else{ 
  switch (in72Key){
    case '00':
      return '0' 
    case '01':
      return '2' 
    case '02':
      return '3'
    case '03':
      return '4' 
    case '04':
      return '5'
    case '05':
      return '6' 
    case '06':
      return '0'
    case '07':
      return '3' 
    case '08':
      return '4'
    case '09':
      return '5' 
    case '10':
      return '6' 
    case '11':
      return '0' 
    case '12':
      return '4'
    case '13':
      return '5' 
    case '14':
      return '6'
    case '15':
      return '0' 
    case '16':
      return '5'
    case '17':
      return '6' 
    case '18':
      return '0'
    case '19':
      return '6' 
    case '20':
      return '0' 
      default:
        return '3' 
    


  }
  }
  return '0'
}


function getWineInfo(key, dataTable, wineData) {
  const targetOid = dataTable?.[Number(key)];
  const targetWine = targetOid != null ? wineData?.[targetOid] : null;

  return {
    style: targetWine?.style ?? "N/A",
    notes: targetWine
      ? [
          targetWine.tastingNote1,
          targetWine.tastingNote2,
          targetWine.tastingNote3,
          targetWine.tastingNote4,
          targetWine.tastingNote5,
        ]
      : [],
  };
}

export {getOid72_From72Key, getOid53_From53Key, getWineInfo }