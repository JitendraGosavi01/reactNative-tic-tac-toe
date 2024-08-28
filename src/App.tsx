import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';

interface Tile {
  [key: string]: string;
}
export default function App() {
  const {height} = useWindowDimensions();
  const [tiles, setTiles] = useState<Tile>({});
  const [winMessage, setWinMessage] = useState('');
  let [turn, setTurn] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const winningCombinations = useMemo(
    () => [
      ['0', '1', '2'],
      ['0', '3', '6'],
      ['1', '4', '7'], // Rows
      ['2', '5', '8'],
      ['3', '4', '5'],
      ['6', '7', '8'], // Columns
      ['0', '4', '8'], //left-to-right cross
      ['2', '4', '6'], //right-to-left cross
    ],
    [],
  );

  const handleBoxClick = (e: any, boxNumber: number) => {
    if (isDisabled) {
      return 0;
    }
    setTiles(prevState => ({
      ...prevState,
      [boxNumber]: turn % 2 === 0 ? 'X' : 'O',
    }));
    setTurn(turn + 1);
  };

  useEffect(() => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (tiles[a] === 'X' && tiles[b] === 'X' && tiles[c] === 'X') {
        setWinMessage('X wins this game!');
        setIsDisabled(true);
        return;
      } else if (tiles[a] === 'O' && tiles[b] === 'O' && tiles[c] === 'O') {
        setWinMessage('O wins this game!');
        setIsDisabled(true);
        return;
      }

      if (
        winMessage.length === 0 &&
        Object.values(tiles).filter(ele => ele).length > 8
      ) {
        setWinMessage("It's a Draw!, Try again!");
      }
    }
  }, [tiles, winMessage, isDisabled, winningCombinations]);

  const resetGame = () => {
    setTurn(0);
    setIsDisabled(false);
    setTiles({});
    setWinMessage('');
  };

  return (
    <ScrollView>
      <View style={[styles.container, {height}]}>
        <Text style={styles.heading}>TIC-TAC-TOE</Text>
        <Text style={styles.result_heading}>{winMessage}</Text>
        <View style={styles.tiles_container}>
          <TouchableOpacity onPress={e => handleBoxClick(e, 0)}>
            <View style={styles.tile}>
              <Text style={styles.tile_text}>{tiles[0]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => handleBoxClick(e, 1)}>
            <View style={styles.tile}>
              <Text style={styles.tile_text}>{tiles[1]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => handleBoxClick(e, 2)}>
            <View style={styles.tile}>
              <Text style={styles.tile_text}>{tiles[2]}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tiles_container}>
          <TouchableOpacity onPress={e => handleBoxClick(e, 3)}>
            <View style={styles.tile}>
              <Text style={styles.tile_text}>{tiles[3]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => handleBoxClick(e, 4)}>
            <View style={styles.tile}>
              <Text style={styles.tile_text}>{tiles[4]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => handleBoxClick(e, 5)}>
            <View style={styles.tile}>
              <Text style={styles.tile_text}>{tiles[5]}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tiles_container}>
          <TouchableOpacity onPress={e => handleBoxClick(e, 6)}>
            <View style={styles.tile}>
              <Text style={styles.tile_text}>{tiles[6]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => handleBoxClick(e, 7)}>
            <View style={styles.tile}>
              <Text style={styles.tile_text}>{tiles[7]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={e => handleBoxClick(e, 8)}>
            <View style={styles.tile}>
              <Text style={styles.tile_text}>{tiles[8]}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7695FF',
    height: 800,
  },
  heading: {
    fontSize: 30,
    color: 'White',
    fontWeight: 'bold',
  },

  result_heading: {
    fontSize: 20,
    color: 'White',
    fontWeight: 'bold',
  },
  tiles_container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 4,
  },
  tile: {
    display: 'flex',
    height: 100,
    width: 100,
    backgroundColor: '#9DBDFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },

  tile_text: {
    fontSize: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    margin: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
