import React, { useState } from 'react'
import { FlatList, View, ActivityIndicator, ToastAndroid } from 'react-native'
import CharacterItem from '../components/CharacterItem';
import { executeQuery } from '../utils/ApiProvider';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: false,
      footerLoading: false,
      loading: true
    }

    this.pagingCount = 1;
    this.characterList = [];
  }

  componentDidMount() {
    this.fetchCharacterList();
  }

  // to fetch list of characters
  fetchCharacterList() {
    let graphQuery = `
    query characters($page: Int) {
      characters(page: $page) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          species
          status
          gender
          image
          origin {
            id
            name
            dimension
            residents {
              id
            }
          }
          location {
            id
            name
            dimension
            residents {
              id
            }
          }
          episode {
            id
            name
          }
        }
      }
    }
    `;
    let graphData = { "page": this.pagingCount };
    executeQuery(graphQuery, graphData).then((res) => {
      let resArr = res.data.characters.results;
      this.characterList.push(...resArr);
      this.setState({ refresh: !this.state.refresh, loading: false, footerLoading: false })
    })
  }

  // to handle infinite scroll
  fetchMoreCharacters = () => {
    this.pagingCount++;
    this.setState({
      footerLoading: true
    });
    this.fetchCharacterList();
  }

  renderFooter = () => {
    if (!this.state.footerLoading) return null;

    return (
      <ActivityIndicator style={{ paddingVertical: 12 }} color="#43BEE2"/>
    );
  }

  renderEmpty = () => {
    return (
      <View>{this.state.loading && <ActivityIndicator  size='large' color="#43BEE2"/>}</View>
    )
  }

  // covered all the required details on the card, so didn't create character details page
  onPressItem = (name) => {
    ToastAndroid.show("clicked on " + name, ToastAndroid.SHORT);
  }

  render() {

    return (
      <View>
        <FlatList
          data={this.characterList}
          extraData={this.state.refresh}
          contentContainerStyle={this.characterList.length == 0 && { justifyContent: 'center', height: "100%" }}
          renderItem={({ item }) => (
            <CharacterItem
              character={item}
              onPress={this.onPressItem}
            />
          )}
          keyExtractor={(character) => character.id.toString()}
          onEndReached={this.fetchMoreCharacters}
          onEndReachedThreshold={1}
          ListEmptyComponent={this.renderEmpty}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}