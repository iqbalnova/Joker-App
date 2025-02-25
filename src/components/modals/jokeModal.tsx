import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface JokeModalProps {
  visible: boolean;
  onClose: () => void;
  category: string;
  joke?: string;
}

const {width, height} = Dimensions.get('window');

const JokeModal: React.FC<JokeModalProps> = ({
  visible,
  onClose,
  category,
  joke,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Random emoji for the joke category
  const getCategoryEmoji = () => {
    const emojiMap: {[key: string]: string} = {
      Programming: '💻',
      Misc: '🎭',
      Dark: '🌚',
      Pun: '🥁',
      Spooky: '👻',
      Christmas: '🎄',
      // Add more categories and emojis as needed
    };

    return emojiMap[category] || '😂';
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  opacity: opacityAnim,
                  transform: [{scale: scaleAnim}],
                },
              ]}>
              {/* Category Header */}
              <View style={styles.categoryHeader}>
                <Text style={styles.emoji}>{getCategoryEmoji()}</Text>
                <Text style={styles.categoryText}>{category}</Text>
              </View>

              {/* Joke Content */}
              <View style={styles.jokeContainer}>
                <MaterialIcons
                  name="format-quote"
                  size={24}
                  color="#6200ee"
                  style={styles.quoteIcon}
                />
                <Text style={styles.jokeText}>{joke || 'Loading...'}</Text>
              </View>

              {/* Footer with actions */}
              <View style={styles.footer}>
                {/* <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() => console.log('Share joke')}>
                  <MaterialIcons name="share" size={20} color="#FFF" />
                  <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  categoryHeader: {
    backgroundColor: '#6200ee',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
    marginRight: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  jokeContainer: {
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  quoteIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    opacity: 0.1,
    transform: [{scale: 2}],
  },
  jokeText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  shareButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  closeText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});

export default JokeModal;
