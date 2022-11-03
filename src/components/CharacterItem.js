import React, { useState } from 'react';
import { Text, Pressable, View, Image, StyleSheet, LayoutAnimation } from 'react-native';
import colors from '../styles/colors';

const CharacterItem = ({ character, onPress }) => {
    const { name, image, species, status, gender, origin, location, episode } = character;
    // to show list of episodes in two lines
    const [allLines, setAllLines] = useState(false);
    // whether show more button should be displayed or not
    const [shouldShowButton, setShouldShowButton] = useState(false);
    // color code for character status
    const colorMap = { "Alive": "green", "Dead": "red", "unknown": "grey" };
    const statusColor = colorMap[status];

    let episodesLength = episode.length;

    const toggleShowMoreButton = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAllLines(!allLines)
    }

    return (
        <Pressable onPress={()=> onPress(name)}>
            <View style={styles.cardView}>
                <View>
                    <Image style={styles.cardImage} source={{ uri: image }} />
                    <View style={styles.leftCardView}>
                        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]}></View>
                        <Text style={styles.statusText}>{status}</Text>
                    </View>
                </View>
                <View style={styles.rightCardView}>
                    <Text style={styles.charName}>{name}</Text>
                    <Text>{species}, {gender}</Text>
                    <Text><Text style={styles.textHeading}>Origin: </Text>{origin.name}, {origin.dimension}, {origin.residents.length} Residents</Text>
                    <Text><Text style={styles.textHeading}>Location: </Text>{location.name}, {location.dimension}, {location.residents.length} Residents</Text>
                    <Text style={styles.charEpisodeText}
                        numberOfLines={!allLines ? 2 : undefined}
                        ellipsizeMode='tail'
                        onTextLayout={({ nativeEvent: { lines } }) =>
                            setShouldShowButton(lines.length > 2)
                        }>
                        <Text style={styles.textHeading}>Chapters: </Text>
                        {episode.map((item, index) =>
                            <Text key={item.id}>{item.name} {episodesLength != index + 1 ? "," : ""}</Text>
                        )}
                    </Text>
                    {shouldShowButton && <Text style={styles.showMoreButton} onPress={toggleShowMoreButton}>{allLines ? "Show Less" : "Show More"}</Text>}
                </View>

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        backgroundColor: "white",
        flexDirection: "row",
        margin: 8,
        padding: 8,
        borderRadius: 5
    },
    cardImage: {
        width: 90,
        height: 90,
        borderRadius: 5
    },
    leftCardView: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5
    },
    statusText: {
        marginLeft: 8
    },
    rightCardView: {
        flex: 1,
        paddingLeft: 8
    },
    charName: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: 'bold'
    },
    textHeading: {
        fontWeight: 'bold'
    },
    charEpisodeText: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    showMoreButton: {
        textAlign: 'right', 
        fontWeight: 'bold', 
        color: colors.secondary
    }
});

export default CharacterItem;