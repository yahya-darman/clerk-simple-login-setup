import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const StyledButton: React.FC<StyledButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, variant === 'secondary' ? styles.buttonSecondary : styles.buttonPrimary]} 
      onPress={onPress}
    >
      <Text style={[styles.text, variant === 'secondary' ? styles.textSecondary : styles.textPrimary]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 200,
    marginVertical: 5,
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonSecondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: 'white',
  },
  textSecondary: {
    color: '#007AFF',
  },
}); 