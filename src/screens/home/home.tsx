import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ListItem from '../../components/list/listItem';
import CollapsibleContent from '../../components/collapsible/collapsibleContent';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {
  fetchCategoriesThunk,
  fetchMultipleJokesThunk,
} from '../../redux/home/jokeThunks';
import {JokesCategoryResponse} from '../../redux/home/jokeEntity';
import {ErrorResponse} from '../../utils/errorResponse';
import JokeModal from '../../components/modals/jokeModal';

interface ListItem {
  id: number;
  title: string;
  items: string[];
  isCollapsed: boolean;
  loadingMore: boolean;
  canAddMore: boolean;
}

const screenWidth = Dimensions.get('window').width;

const Home: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [jokesItem, setJokesItem] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJoke, setSelectedJoke] = useState('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategories();
  }, [dispatch]);

  const getCategories = async () => {
    setLoading(true);
    try {
      const response: JokesCategoryResponse = await dispatch(
        fetchCategoriesThunk(),
      ).unwrap();

      if (response.categories) {
        setJokesItem(
          response.categories.map((category, index) => ({
            id: index + 1,
            title: category,
            items: [],
            isCollapsed: true,
            loadingMore: false,
            canAddMore: true,
          })),
        );
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getCategories();
    setRefreshing(false);
  };

  // Add this function to handle showing the modal
  const showModalJoke = (category: string, joke?: string) => {
    setSelectedCategory(category);
    setSelectedJoke(joke || ''); // If no joke is provided, set empty string
    setModalVisible(true);
  };

  const toggleCollapse = async (id: number, category: string) => {
    setJokesItem(prevJokes =>
      prevJokes.map(jokes =>
        jokes.id === id ? {...jokes, isCollapsed: !jokes.isCollapsed} : jokes,
      ),
    );

    const selectedJoke = jokesItem.find(joke => joke.id === id);
    if (selectedJoke && selectedJoke.items.length === 0) {
      await fetchJokes(id, category, 2); // ⬅ Fetch pertama kali dengan 2 jokes
    }
  };

  const fetchJokes = async (id: number, category: string, amount: number) => {
    try {
      const response = await dispatch(
        fetchMultipleJokesThunk({amount, category}),
      ).unwrap();

      const jokesArray = response?.jokes ?? [];

      setJokesItem(prevJokes =>
        prevJokes.map(jokes =>
          jokes.id === id
            ? {
                ...jokes,
                items: [...jokes.items, ...jokesArray.map(joke => joke.joke)],
                canAddMore: [...jokes.items, ...jokesArray].length < 6, // ✅ Perbarui canAddMore
              }
            : jokes,
        ),
      );
    } catch (error) {
      console.log(`Error fetching jokes for ${category}:`, error);
      const errorResponse = error as ErrorResponse;

      setJokesItem(prevJokes =>
        prevJokes.map(jokes =>
          jokes.id === id
            ? {
                ...jokes,
                items: [...jokes.items, `⚠️ Error: ${errorResponse.message}`],
                canAddMore: false,
              }
            : jokes,
        ),
      );
    }
  };

  const addMoreJokes = async (id: number, category: string) => {
    setJokesItem(prevJokes =>
      prevJokes.map(jokes =>
        jokes.id === id ? {...jokes, loadingMore: true} : jokes,
      ),
    );

    const selectedJoke = jokesItem.find(joke => joke.id === id);
    if (selectedJoke && selectedJoke.items.length < 6) {
      const remaining = 6 - selectedJoke.items.length;
      const amount = Math.min(remaining, 2); // ⬅ Ambil 2, tapi tidak lebih dari 6

      await fetchJokes(id, category, amount);
    }

    setJokesItem(prevJokes =>
      prevJokes.map(jokes =>
        jokes.id === id ? {...jokes, loadingMore: false} : jokes,
      ),
    );
  };

  const moveItemToTop = (id: number) => {
    setJokesItem(prevJokes => {
      const itemIndex = prevJokes.findIndex(joke => joke.id === id);
      if (itemIndex === -1) return prevJokes;

      const selectedItem = prevJokes[itemIndex];
      const updatedList = [
        selectedItem,
        ...prevJokes.slice(0, itemIndex),
        ...prevJokes.slice(itemIndex + 1),
      ];
      return updatedList;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3498db', '#9b59b6', '#e74c3c']}
            progressBackgroundColor="#ecf0f1"
          />
        }>
        {loading ? (
          // 🔥 Skeleton Loader Saat Fetching
          <View style={{marginVertical: 10}}>
            {[...Array(7)].map((_, index) => (
              <SkeletonPlaceholder key={index} borderRadius={4}>
                <SkeletonPlaceholder.Item style={{alignItems: 'center'}}>
                  <SkeletonPlaceholder.Item
                    width={screenWidth - 8 * 2}
                    height={60}
                    marginVertical={10}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            ))}
          </View>
        ) : (
          // 🔥 Render Data Jika Sudah Loaded
          jokesItem.map((jokes, index) => (
            <View key={jokes.id} style={styles.jokesContainer}>
              <ListItem
                number={index + 1}
                title={jokes.title}
                isCollapsed={jokes.isCollapsed}
                isOnTop={index === 0}
                onPress={() => toggleCollapse(jokes.id, jokes.title)}
                onTopButtonPress={() => {
                  moveItemToTop(jokes.id);
                }}
              />

              <Collapsible collapsed={jokes.isCollapsed}>
                <CollapsibleContent
                  items={jokes.items}
                  canAddMore={jokes.canAddMore}
                  loading={jokes.loadingMore}
                  onAddMore={() => addMoreJokes(jokes.id, jokes.title)}
                  onPressJoke={joke => showModalJoke(jokes.title, joke)}
                />
              </Collapsible>
            </View>
          ))
        )}
      </ScrollView>
      <JokeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        category={selectedCategory}
        joke={selectedJoke}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  jokesContainer: {
    marginVertical: 10,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});

export default Home;
