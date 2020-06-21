import styled from 'styled-components/native'
import { Animated, Dimensions } from 'react-native'

export const Container = styled(Animated.View)({
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    zIndex: 9999999,
})

export const Body = styled(Animated.View)({
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    zIndex: 9999999,
})

export const Point = styled.View({
    backgroundColor: '#b7b7b7',
    alignSelf: 'center',
    height: 5,
    width: '10%',
    borderRadius: 15,
    marginBottom: 10
})
