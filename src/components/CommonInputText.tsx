import {
  InputModeOptions,
  KeyboardType,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import React from 'react';
import {appColor} from '../assets/colors/appColor';

type InputProps = {
  onChangeText?: (value: string) => void;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
  inputMode?: InputModeOptions;
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
}: InputProps) => {
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={appColor.gray}
        textContentType={textContentType}
        keyboardType={keyboardType}
      />
    </>
  );
};

export default CommonInputText;

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: appColor.lightGray,
    padding: 10,
    borderRadius: 6,
    marginVertical: 6,
  },
});
