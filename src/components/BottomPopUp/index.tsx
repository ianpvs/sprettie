import React, {
    useState,
    useEffect
} from 'react'

import { Animated, TouchableWithoutFeedback, View, Dimensions } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import {
    BottomPopUpProps
} from './types'

import {
    Container,
    Body,
    Point
} from './styles'

const BottomPopUp: React.FC<BottomPopUpProps> = ({
    onDismiss,
    maxHeight,
    minHeight,
    children,
    visible
}) => {

    const [size, setSize] = useState(300)
    const translate = new Animated.Value(0)
    const opacity = new Animated.Value(1)

    const gestureEvent = Animated.event(
        [{ nativeEvent: { translationY: translate } }],
        { useNativeDriver: true }
    )

    const hide = () => {
        Animated.sequence([
            Animated.timing(
                translate,
                {
                    toValue: size,
                    duration: 150,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                opacity,
                {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }
            )
        ]).start(() => {
            onDismiss()
        })
    }

    if (!visible) return null

    return (

        <Container
            style={{
                opacity,
            }}
        >
            <TouchableWithoutFeedback
                onPress={() => hide()}
            >
                <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>

            <PanGestureHandler
                onGestureEvent={gestureEvent}
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.oldState === State.ACTIVE) {
                        const { translationY } = nativeEvent

                        if (translationY >= 100) {
                            hide()
                        } else {
                            Animated.timing(
                                translate,
                                {
                                    toValue: 0,
                                    duration: 100,
                                    useNativeDriver: true
                                }
                            ).start()
                        }
                    }
                }}
            >
                <Body
                    style={{
                        transform: [
                            {
                                translateY: translate.interpolate({
                                    inputRange: [0, size],
                                    outputRange: [0, size - 50],
                                    extrapolate: 'clamp'
                                })
                            }
                        ],
                        minHeight: minHeight || Dimensions.get('window').height * 0.5,
                        maxHeight: maxHeight || Dimensions.get('window').height * 0.7
                    }}
                    onLayout={(props: any) => {
                        const { nativeEvent: { layout: { height } } } = props
                        setSize(height)
                    }}
                >
                    <Point />
                    {children}
                </Body>
            </PanGestureHandler>
        </Container>
    )
}

export default BottomPopUp
