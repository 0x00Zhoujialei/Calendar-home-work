import { Component } from 'react'
import { View } from '@tarojs/components'
import Calendar from "custom-calendar-taro";
import { compareAsc, format } from 'date-fns'
import './index.less'

export default class Index extends Component {
  state = {
    current: Date.now()
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleMonthChange = (v) => {
    console.log(v)
  }

  render () {
    return (
      <View className='index'>
        <Calendar
          isMultiSelect
          onMonthChange={this.handleMonthChange}
        />
      </View>
    )
  }
}
