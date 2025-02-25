import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CollapsibleContentProps {
  items: string[];
  canAddMore: boolean;
  onAddMore: () => void;
  loading: boolean;
  onPressJoke: (joke: string) => void;
}

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  items,
  canAddMore,
  onAddMore,
  loading,
  onPressJoke,
}) => {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <ActivityIndicator size="large" color="#6200ee" />
          </Animated.View>
          <Text style={styles.loadingText}>Loading jokes...</Text>
        </View>
      ) : (
        <>
          {items.length > 0 ? (
            items.map((item, index) => (
              <Pressable key={index} onPress={() => onPressJoke(item)}>
                <View style={styles.itemContainer}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons
                      name="emoji-emotions"
                      size={20}
                      color="#FFC107"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                </View>
              </Pressable>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No jokes available yet</Text>
            </View>
          )}

          {canAddMore && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={onAddMore}
              activeOpacity={0.7}>
              <MaterialIcons name="add-circle" size={18} color="white" />
              <Text style={styles.addButtonText}>More Jokes</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 8,
    color: '#6200ee',
    fontWeight: '500',
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
  addButton: {
    marginTop: 12,
    backgroundColor: '#6200ee',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#6200ee',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default CollapsibleContent;
