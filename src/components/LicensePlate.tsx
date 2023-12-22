import React from 'react';
import { ViewStyle, Text, ImageBackground, StyleSheet } from 'react-native';

// Assume you have a mapping of state abbreviations to image URIs
const plateImages: Record<string, any> = {
  AL: require('../../assets/plates/AL_plate.png'),
  Alaska: require('../../assets/plates/AK_plate.png'),
  AK: require('../../assets/plates/AK_plate.png'),
  Arizona: require('../../assets/plates/AZ_plate.png'),
  AZ: require('../../assets/plates/AZ_plate.png'),
  AR: require('../../assets/plates/AR_plate.png'),
  CA: require('../../assets/plates/CA_plate.png'),
  CO: require('../../assets/plates/CO_plate.png'),
  CT: require('../../assets/plates/CT_plate.png'),
  DE: require('../../assets/plates/DE_plate.png'),
  'District Of Columbia': require('../../assets/plates/DC_plate.png'),
  FL: require('../../assets/plates/FL_plate.png'),
  GA: require('../../assets/plates/GA_plate.png'),
  HI: require('../../assets/plates/HI_plate.png'),
  ID: require('../../assets/plates/ID_plate.png'),
  IL: require('../../assets/plates/IL_plate.png'),
  IN: require('../../assets/plates/IN_plate.png'),
  IA: require('../../assets/plates/IA_plate.png'),
  KS: require('../../assets/plates/KS_plate.png'),
  KY: require('../../assets/plates/KY_plate.png'),
  LA: require('../../assets/plates/LA_plate.png'),
  ME: require('../../assets/plates/ME_plate.png'),
  MD: require('../../assets/plates/MD_plate.png'),
  MA: require('../../assets/plates/MA_plate.png'),
  MI: require('../../assets/plates/MI_plate.png'),
  MN: require('../../assets/plates/MN_plate.png'),
  MS: require('../../assets/plates/MS_plate.png'),
  MO: require('../../assets/plates/MO_plate.png'),
  MT: require('../../assets/plates/MT_plate.png'),
  NE: require('../../assets/plates/NE_plate.png'),
  NV: require('../../assets/plates/NV_plate.png'),
  NH: require('../../assets/plates/NH_plate.png'),
  NJ: require('../../assets/plates/NJ_plate.png'),
  NM: require('../../assets/plates/NM_plate.png'),
  NY: require('../../assets/plates/NY_plate.png'),
  NC: require('../../assets/plates/NC_plate.png'),
  ND: require('../../assets/plates/ND_plate.png'),
  OH: require('../../assets/plates/OH_plate.png'),
  OK: require('../../assets/plates/OK_plate.png'),
  OR: require('../../assets/plates/OR_plate.png'),
  PA: require('../../assets/plates/PA_plate.png'),
  RI: require('../../assets/plates/RI_plate.png'),
  SC: require('../../assets/plates/SC_plate.png'),
  SD: require('../../assets/plates/SD_plate.png'),
  TN: require('../../assets/plates/TN_plate.png'),
  TX: require('../../assets/plates/TX_plate.png'),
  UT: require('../../assets/plates/UT_plate.png'),
  VT: require('../../assets/plates/VT_plate.png'),
  VA: require('../../assets/plates/VA_plate.png'),
  WA: require('../../assets/plates/WA_plate.png'),
  WV: require('../../assets/plates/WV_plate.png'),
  WI: require('../../assets/plates/WI_plate.png'),
  WY: require('../../assets/plates/WY_plate.png'),
};

  
interface LicensePlateProps {
  plateNumber: string;
  plateState: string;
  style?: ViewStyle;
}

const LicensePlate: React.FC<LicensePlateProps> = ({ plateNumber, plateState, style = {} }) => {
  const plateImage = plateImages[plateState];

  if (!plateImage) {
    return <Text>{plateNumber}</Text>;
  }

  return (
    <ImageBackground source={plateImage} style={[styles.plateBackground, style]} resizeMode="contain">
      <Text style={styles.plateText}>{plateNumber}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  plateBackground: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
  },
  plateText: {
    color: 'black',
    fontSize: 40,
    paddingTop: 18,
    lineHeight: 48,
  },
});

export default LicensePlate;
