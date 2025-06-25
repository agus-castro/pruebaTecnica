import { useSession } from '@/context/SessionContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const { setHasLoggedIn } = useSession();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async () => {
    let valid = true;

    if (!username) {
      setEmailError('Please enter your email address.');
      valid = false;
    } else if (!emailRegex.test(username)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      valid = false;
    } else if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid && username === 'admin@admin.com' && password === 'admin') {
      setHasLoggedIn();
    } else if (valid) {
      setPasswordError('Incorrect email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Text style={[styles.label, emailError ? styles.labelError : null]}>
        Email Address:
      </Text>
      <TextInput
        style={[
          styles.input,
          emailError ? styles.inputError : null,
          isEmailFocused ? styles.inputFocused : null,
        ]}
        placeholder='Enter your email address'
        placeholderTextColor='#999'
        value={username}
        onChangeText={setUsername}
        autoCapitalize='none'
        keyboardType='email-address'
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
      />
      <View style={styles.errorSpace}>
        {emailError !== '' && (
          <View style={styles.errorContainer}>
            <Ionicons name='alert-circle' size={14} color='#e74c3c' />
            <Text style={styles.errorText}>{emailError}</Text>
          </View>
        )}
      </View>

      <Text style={[styles.label, passwordError ? styles.labelError : null]}>
        Password:
      </Text>
      <View
        style={[
          styles.passwordContainer,
          passwordError ? styles.inputError : null,
          isPasswordFocused ? styles.inputFocused : null,
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholder='Enter a password'
          placeholderTextColor='#999'
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color='#666'
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.errorSpace}>
        {passwordError !== '' && (
          <View style={styles.errorContainer}>
            <Ionicons name='alert-circle' size={14} color='#e74c3c' />
            <Text style={styles.errorText}>{passwordError}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 36,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#000',
  },
  labelError: {
    color: '#e74c3c',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color: '#000',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  inputFocused: {
    borderColor: 'rgb(21, 137, 173)',
    borderWidth: 2,
  },
  errorSpace: {
    minHeight: 20,
    marginBottom: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    height: 48,
  },
  passwordInput: {
    flex: 1,
    color: '#000',
  },
  eyeIcon: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#0086a5',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
