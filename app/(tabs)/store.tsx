import React from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/app/header';
import ButtonList from "@/app/buttonList";
import { useThemeContext } from '../../hooks/themeContext';

interface Game {
    title: string;
    image: any;
    price: number;
    originalPrice?: number;
    discount?: number;
    platform: string;
}

const topSellers: Game[] = [
    {
        title: 'Dead by Daylight',
        image: require('@/assets/images/dbd.jpg'),
        price: 5,
        originalPrice: 18,
        discount: 70,
        platform: 'Windows',
    },
    {
        title: 'Grand Theft Auto V',
        image: require('@/assets/images/GTAV.jpg'),
        price: 10,
        originalPrice: 20,
        discount: 50,
        platform: 'Windows',
    },
    {
        title: 'Battlefield 4',
        image: require('@/assets/images/Battlefield_4.jpeg'),
        price: 12.5,
        originalPrice: 25,
        discount: 50,
        platform: 'Windows',
    },
];

const otherGames: Game[] = [
    {
        title: 'Factorio',
        image: require('@/assets/images/Factorio.jpg'),
        price: 7,
        platform: 'Windows, Mac',
    },
    {
        title: 'Horizon Zero Dawn',
        image: require('@/assets/images/hzd.jpg'),
        price: 38,
        platform: 'Windows',
    },
];

const buttons = [
    {
        label: 'Top Sellers',
    },
    {
        label: 'Free to Play',
    },
    {
        label: 'Early Access',
    },
    {
        label: 'Liked',
    },
    {
        label: 'Announced',
    },
];

export default function HomeScreen() {
    const { theme } = useThemeContext();

    const loadMoreGames = () => {
        const newGames: Game[] = [
            {
                title: 'Cyberpunk 2077',
                image: require('@/assets/images/cyber.jpg'),
                price: 30,
                originalPrice: 60,
                discount: 50,
                platform: 'Windows',
            },
            {
                title: 'The Witcher 3',
                image: require('@/assets/images/witcher.jpg'),
                price: 15,
                platform: 'Windows',
            },
        ];
        otherGames.push(...newGames);
    };

    const renderGameItem = ({ item }: { item: Game }) => {
        const isTopSeller = topSellers.some((game) => game.title === item.title);

        return (
            <View style={[styles.gameItem, { backgroundColor: theme.colors.card }]}>
                <Image
                    source={item.image}
                    style={isTopSeller ? styles.topSellerImage : styles.gameImage}
                />
                {isTopSeller ? (
                    <View style={[styles.overlayText, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                        <ThemedText type="subtitle" style={{ color: 'white' }}>{item.title}</ThemedText>
                        <ThemedText style={{ color: 'white' }}>{item.platform}</ThemedText>
                        <View style={styles.priceContainer}>
                            {item.discount && (
                                <ThemedText style={[styles.discount, { color: theme.colors.accent }]}>-{item.discount}%</ThemedText>
                            )}
                            {item.originalPrice && (
                                <ThemedText style={[styles.originalPrice, { color: '#9f9f9f' }]}>${item.originalPrice}</ThemedText>
                            )}
                            <ThemedText style={[styles.price, { color: 'white' }]}>${item.price}</ThemedText>
                        </View>
                    </View>
                ) : (
                    <View style={styles.gameDetails}>
                        <View>
                            <ThemedText style={[styles.title, { color: theme.colors.text }]}>{item.title}</ThemedText>
                            <ThemedText style={[styles.platform, { color: theme.colors.secondaryText }]}>{item.platform}</ThemedText>
                        </View>

                        <View style={styles.priceContainer}>
                            <ThemedText style={[styles.price, { color: theme.colors.text }]}>${item.price}</ThemedText>
                        </View>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header />
            <FlatList
                horizontal
                data={topSellers}
                style={styles.height}
                renderItem={renderGameItem}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
            />
            <ButtonList buttons={buttons} />
            <FlatList
                data={otherGames}
                style={styles.height}
                renderItem={renderGameItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={loadMoreGames}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    gameItem: {
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    topSellerImage: {
        width: 400,
        height: 250,
        borderRadius: 12,
    },
    gameImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
    },
    overlayText: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        maxWidth: '85%',
    },
    gameDetails: {
        flex: 1,
        marginLeft: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
    },
    platform: {
        marginTop: 4,
        fontSize: 12,
        opacity: 0.8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    discount: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        fontSize: 13,
        color: '#aaa',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    height: {
        height: 250,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
});
