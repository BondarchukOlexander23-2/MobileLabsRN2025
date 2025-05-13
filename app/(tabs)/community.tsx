import {StyleSheet, Image, Text, View, ScrollView, FlatList, ListRenderItemInfo} from 'react-native';
import Header from '@/app/header';
import ButtonList from "@/app/buttonList";
import { useThemeContext } from '../../hooks/themeContext';

interface Post {
    id: number;
    source: string;
    time: string;
    image: any;
    title: string;
    description: string;
    likeCount: number;
    commentCount: number;
}

export default function CommunityFeed() {
    const { theme } = useThemeContext();

    const buttons = [
        { label: 'all' },
        { label: 'screenshots' },
        { label: 'artworks' },
        { label: 'news' },
    ];

    const posts: Post[] = [
        {
            id: 1,
            source: 'International',
            time: 'today • 1:48 am',
            image: require('@/assets/images/international.jpg'),
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet justo ac ipsum molestie aliquam. Nunc sit amet justo a magna malesuada volutpat. Proin egestas purus eu urna euismod gravida. ',
            description: 'Sed pretium laoreet cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras id felis at enim cursus elementum. Phasellus ut tincidunt ex. Duis dapibus suscipit neque vitae auctor.',
            likeCount: 324,
            commentCount: 12,
        },
        {
            id: 2,
            source: 'Reinbet cup',
            time: '5 days ago • 8 pm',
            image: require('@/assets/images/cs.png'),
            title: 'New Gaming Consoles Coming in 2025',
            description: 'Several gaming console manufacturers are preparing new consoles to release next year. The next-gen consoles could redefine the gaming experience.',
            likeCount: 280,
            commentCount: 18,
        },
    ];

    const renderItem = ({ item }: ListRenderItemInfo<Post>) => (
        <View style={[styles.postContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.postHeader}>
                <Image source={item.image} style={styles.avatar} />
                <Text style={[styles.postSource, { color: theme.colors.text }]}>{item.source}</Text>
                <Text style={[styles.newsTag, { backgroundColor: theme.colors.accent }]}>NEWS</Text>
                <Text style={[styles.postTime, { color: theme.colors.secondaryText }]}>{item.time}</Text>
            </View>

            <Image source={item.image} style={styles.postImage} />

            <Text style={[styles.postTitle, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.postDescription, { color: theme.colors.secondaryText }]}>{item.description}</Text>

            <View style={styles.reactionRow}>
                <Text style={[styles.likeCount, { color: theme.colors.like }]}>👍 {item.likeCount}</Text>
                <Text style={[styles.commentCount, { color: theme.colors.secondaryText }]}>💬 {item.commentCount}</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header />

            <ScrollView>
                <View style={styles.communityHeader}>
                    <Text style={[styles.communityTitle, { color: theme.colors.text }]}>Community</Text>
                    <Text style={[styles.communitySubtitle, { color: theme.colors.secondaryText }]}>
                        Community and official content for all games and software
                    </Text>

                    <ButtonList buttons={buttons} />
                </View>

                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    communityHeader: {
        padding: 20,
    },
    communityTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    communitySubtitle: {
        fontSize: 14,
        marginVertical: 10,
    },
    postContainer: {
        borderRadius: 12,
        margin: 10,
        padding: 12,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    postSource: {
        fontWeight: 'bold',
    },
    newsTag: {
        marginLeft: 8,
        color: '#FFFFFF',
        paddingHorizontal: 8,
        borderRadius: 10,
        fontSize: 12,
    },
    postTime: {
        marginLeft: 8,
        fontSize: 12,
    },
    postImage: {
        width: '100%',
        height: 160,
        borderRadius: 8,
        marginVertical: 10,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    postDescription: {
        fontSize: 14,
    },
    reactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    likeCount: {
        fontSize: 14,
    },
    commentCount: {
        fontSize: 14,
    },
});
