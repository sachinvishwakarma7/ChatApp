import {
  InputModeOptions,
  KeyboardType,
  StyleSheet,
  TextInput,
  View,
  Text,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useTheme} from './ThemeProvider';
import {EditIcon} from '../assets/svg';

type InputProps = {
  onChangeText?: (value: string) => void;
  value?: string;
  placeholder?: string;
  isIcon?: boolean;
  Icon?: React.ReactElement;
  keyboardType?: KeyboardType;
  inputMode?: InputModeOptions;
  containerStyle?: ViewStyle;
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'creditCardExpiration'
    | 'creditCardExpirationMonth'
    | 'creditCardExpirationYear'
    | 'creditCardSecurityCode'
    | 'creditCardType'
    | 'creditCardName'
    | 'creditCardGivenName'
    | 'creditCardMiddleName'
    | 'creditCardFamilyName'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | 'birthdate'
    | 'birthdateDay'
    | 'birthdateMonth'
    | 'birthdateYear'
    | undefined;
};

const CommonInputText = ({
  onChangeText,
  value,
  placeholder,
  textContentType,
  keyboardType,
  containerStyle,
  isIcon = false,
  Icon,
}: InputProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    input: {
      height: 50,
      backgroundColor: theme.colors.secondary,
      padding: 10,
      paddingLeft: 40,
      borderRadius: 6,
      marginVertical: 6,
      color: theme.colors.text,
    },
    iconView: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      width: 40,
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {isIcon && (
        <View style={styles.iconView}>
          {/* <Text>asfsaf</Text> */}
          {Icon}
        </View>
      )}
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text}
        textContentType={textContentType}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CommonInputText;
