import { StyleSheet, Image } from 'react-native';

import { View } from 'react-native';
import ParallaxScrollView from "@/components/ParallaxScrollView";


const imagePaths = [
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
    require('@/assets/images/motosport.png'),
];



export default function TabTwoScreen() {
    return (
        <ParallaxScrollView headerBackgroundColor={{light: '#473E86', dark: '#1D3D47'}} headerImage={<Image
            source={require('@/assets/images/manytimes.png')}
            style={styles.topImage}
        />}>

        <View style={styles.imageRow}>
            {imagePaths.map((imagePath, index) => (
                <View key={index} style={styles.imageBlock}>
                    <Image source={imagePath} style={styles.image} />
                </View>
            ))}
        </View>

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap:'wrap',
        marginVertical: 20,
    },
    image: {
        width: '100%',
        height: 160,
        marginBottom: 10,
    },
    topImage: {
        height: "250",
        width: 400,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    imageBlock: {
        width: '45%',
        height: 150,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow:'white 0 0 5px',
        borderRadius: 8,
    },
});