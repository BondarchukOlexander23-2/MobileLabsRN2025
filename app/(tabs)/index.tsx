import {Image, StyleSheet, Platform, View} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


const newsData = [
    {
        title: 'Modern art',
        image: require('@/assets/images/modernStyle.png'),
        summary: 'News from modern art, what`s new?',
    },
    {
        title: 'Motosport',
        image: require('@/assets/images/motosport.png'),
        summary: 'Who win in last race? Let`s talk about this.',
    },
    {
        title: 'Water supply Ukraine',
        image: require('@/assets/images/water.png'),
        summary: 'Water cutoffs across the country, get ready for it.',
    },
];



export default function HomeScreen() {
    return (
        <ParallaxScrollView headerBackgroundColor={{light: '#FFB7B7', dark: '#1D3D47'}} headerImage={<Image
            source={require('@/assets/images/water.png')}
            style={styles.newsLogo}
        />}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">News</ThemedText>
            </ThemedView>
            <ThemedView style={styles.newsContainer}>
                {newsData.map((news, index) => (
                    <View key={index} style={styles.newsItem}>
                        <Image source={news.image} style={styles.newsHeader} />
                        <ThemedText style={styles.colorBlack} type="subtitle">{news.title}</ThemedText>
                        <ThemedText style={styles.colorBlack}>{news.summary}</ThemedText>
                    </View>
                ))}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    newsContainer: {
        flexDirection: 'column',
        gap: 16,
        paddingHorizontal: 16,
    },
    newsItem: {
        backgroundColor: 'rgba(13,46,71,0.65)',
        padding: 16,
        borderRadius: 8,

    },
    newsHeader: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginBottom: 8,
        objectFit:'cover'
    },
    newsLogo: {
        height: 200,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    colorBlack:{
        color:'#ffffff'
    }
});

