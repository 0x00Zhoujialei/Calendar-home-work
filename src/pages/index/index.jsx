import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtCalendar } from 'taro-ui'
import './index.less'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <AtCalendar
          isMultiSelect
        />
      </View>
    )
  }
}
