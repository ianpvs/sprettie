import React, {
  useState
} from 'react'

import { TouchableWithoutFeedback, Animated, View, Dimensions } from 'react-native'
import { FlatList, PanGestureHandler, State } from 'react-native-gesture-handler'

import {
  Container,
  Label,
  Body,
  BottomContainer,
  Point
} from './styles'

import Icon from 'react-native-vector-icons/Ionicons'

import {
  ItemProps,
  SelectProps,
  FlatProps
} from './types'

const Select: React.FC<SelectProps> = ({
  label,
  itens,
  onSelected,
  maxHeight,
  minHeight
}) => {

  const [size, setSize] = useState(300)
  const translate = new Animated.Value(0)
  const opacity = new Animated.Value(1)

  const [selected, setSelected] = useState<null | ItemProps>(null)
  const [visible, setVisible] = useState(false)

  const placeholder = !selected ?
    label || 'Selecione'
    : selected.label


  const gestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translate } }],
    { useNativeDriver: true }
  )

  const hide = (callback?: any) => {
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
      setVisible(false)
      if (!!callback) {
        callback()
      }
    })
  }

  function renderItem({ item }: FlatProps) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          hide(() => {
            setSelected(item)
            onSelected(item)
          })
        }}
      >
        <Container>
          <Label>{item.label}</Label>
          <Icon
            name="ios-arrow-forward"
            size={22}
            color="#999"
          />
        </Container>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => setVisible(true)}
      >
        <Container>
          <Label>{placeholder}</Label>
          <Icon
            name="ios-arrow-forward"
            size={22}
            color="#999"
          />
        </Container>
      </TouchableWithoutFeedback>

      {visible
        ? (
          <BottomContainer
            style={{
              opacity
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

                <FlatList
                  data={itens}
                  keyExtractor={(item, index) => `item${index}`}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  style={{ marginVertical: 20 }}
                />
              </Body>
            </PanGestureHandler>
          </BottomContainer>
        )
        : null
      }
    </>
  )
}

export default Select
