import {
  InputModeOptions,
  KeyboardType,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useTheme} from './ThemeProvider';

type InputProps = {
  onChangeText?: (value: string) => void;
  value?: string;
  placeholder?: string;
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
}: InputProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    input: {
      height: 50,
      backgroundColor: theme.colors.secondary,
      padding: 10,
      borderRadius: 6,
      marginVertical: 6,
      color: theme.colors.text,
    },
  });

  return (
    <View style={containerStyle}>
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
