function getOid53_From53Key(in53Key) {
  switch (in53Key) {
    case "0":
      return "340";
    case "1":
      return "123";
    case "2":
      return "124";
    case "3":
      return "120";
    case "4":
      return "134";
    case "5":
      return "130";
    case "6":
      return "140";
    case "7":
      return "234";
    case "8":
      return "230";
    case "9":
      return "240";
    default:
      return "123";
  }
}

function getOverrideMajorBottles(code) {
  const num = parseInt(code, 10);
  const lastDigit = isNaN(num) ? -1 : parseInt(code.slice(-1), 10);
  const tens = isNaN(num) ? -1 : Math.floor(num / 10) * 10;

  // Defaults
  let majorOidBottle1 = 3;
  let majorOidBottle2 = lastDigit >= 0 && lastDigit <= 6 ? lastDigit : 3;

  switch (tens) {
    case 30:
      if (num <= 36) majorOidBottle1 = 10;
      break;
    case 40:
      if (num <= 46) majorOidBottle1 = 11;
      break;
    case 50:
      if (num <= 56) majorOidBottle1 = 5;
      break;
    case 60:
      if (num <= 66) majorOidBottle1 = 6;
      break;
    case 70:
      if (num <= 76) majorOidBottle1 = 7;
      break;
    case 80:
      if (num <= 86) majorOidBottle1 = 8;
      break;
    case 90:
      if (num <= 96) majorOidBottle1 = 9;
      break;
  }

  return {
    majorOidBottle1: String(majorOidBottle1),
    majorOidBottle2: String(majorOidBottle2),
  };
}

function getOid72_From72Key(bottleOrdinal, in72Key) {
  console.log(
    "get_oid72_from_72_key_bottle In: " +
      bottleOrdinal +
      ":in72Key In:" +
      in72Key
  );
  if (bottleOrdinal == "1") {
    switch (in72Key) {
      case "00":
        return "6";
      case "01":
        return "1";
      case "02":
        return "1";
      case "03":
        return "1";
      case "04":
        return "1";
      case "05":
        return "1";
      case "06":
        return "1";
      case "07":
        return "2";
      case "08":
        return "2";
      case "09":
        return "2";
      case "10":
        return "2";
      case "11":
        return "2";
      case "12":
        return "3";
      case "13":
        return "3";
      case "14":
        return "3";
      case "15":
        return "3";
      case "16":
        return "4";
      case "17":
        return "4";
      case "18":
        return "4";
      case "19":
        return "5";
      case "20":
        return "5";
      default:
        return getOverrideMajorBottles(in72Key).majorOidBottle1;
    }
  } else {
    switch (in72Key) {
      case "00":
        return "0";
      case "01":
        return "2";
      case "02":
        return "3";
      case "03":
        return "4";
      case "04":
        return "5";
      case "05":
        return "6";
      case "06":
        return "0";
      case "07":
        return "3";
      case "08":
        return "4";
      case "09":
        return "5";
      case "10":
        return "6";
      case "11":
        return "0";
      case "12":
        return "4";
      case "13":
        return "5";
      case "14":
        return "6";
      case "15":
        return "0";
      case "16":
        return "5";
      case "17":
        return "6";
      case "18":
        return "0";
      case "19":
        return "6";
      case "20":
        return "0";
      default:
        return getOverrideMajorBottles(in72Key).majorOidBottle2;
    }
  }
  return "0";
}

export { getOid72_From72Key, getOid53_From53Key };
