import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Poppins from '../text/poppins';

interface ListItemProps {
  number: number;
  title: string;
  isCollapsed: boolean;
  onPress: () => void;
  onTopButtonPress?: () => void;
  isOnTop: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  number,
  title,
  isCollapsed,
  onPress,
  onTopButtonPress,
  isOnTop,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Left side - Number */}
      <View style={styles.numberContainer}>
        <Poppins style={styles.number}>{number}</Poppins>
      </View>

      {/* Middle - Title */}
      <Poppins style={styles.title}>{title}</Poppins>

      {/* Right side - Button and Icon */}
      <View style={styles.rightContainer}>
        {/* Only show Go Top button for first item (id=1) */}
        {isOnTop ? (
          <View style={[styles.topButton, {backgroundColor: '#f1c40f'}]}>
            <Poppins style={styles.topButtonText}>TOP</Poppins>
          </View>
        ) : (
          onTopButtonPress && (
            <Pressable
              style={[styles.topButton, {backgroundColor: '#3498db'}]}
              onPress={e => {
                // e.stopPropagation();
                onTopButtonPress();
              }}>
              <Poppins style={styles.topButtonText}>Go Top</Poppins>
            </Pressable>
          )
        )}

        {/* Icon */}
        <Icon
          name={isCollapsed ? 'chevron-small-down' : 'chevron-small-up'}
          size={24}
          color="#555"
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  number: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  topButtonText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default ListItem;
