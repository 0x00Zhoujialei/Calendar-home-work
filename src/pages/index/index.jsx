import { Component } from 'react'
import { Button, View } from '@tarojs/components'
import Calendar from "nick-custom-calendar-taro";
import { AtToast } from 'taro-ui'
import {
  isMonday,
  isWednesday,
  isFriday,
  isBefore,
  isSameDay, isPast, isAfter, format, addDays
} from 'date-fns'
import './index.less'

export default class Index extends Component {

  dateInfosTimeout = null

  currentDateInfo = []

  calendarRef

  state = {
    marks: [
      { value: '2022-09-24', color: 'red', markSize: '9px' },
      { value: '2021-06-12', color: 'pink', markSize: '9px' },
      { value: '2021-06-13', color: 'gray', markSize: '9px' },
      { value: '2021-06-14', color: 'yellow', markSize: '9px' },
      { value: '2021-06-15', color: 'darkblue', markSize: '9px' },
      { value: '2021-06-16', color: 'pink', markSize: '9px' },
      { value: '2021-06-17', color: 'green', markSize: '9px' },
    ],
    isOpened: false,
    text: ''
  }

  componentWillMount () {
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  isDateValid = (date) => {
    return isMonday(date) || isWednesday(date) || isFriday(date)
  }

  debounceSetMarks = () => {
    clearTimeout(this.dateInfosTimeout)
    this.dateInfosTimeout = setTimeout(() => {
      this.setState({
        marks: this.currentDateInfo
      })
    }, 500)
  }

  handleClick = () => {
    console.log('forceUpdate')
    // this.setState({
    //   marks: this.currentDateInfo
    // })
  }

  handleCustomStyleGenerator = (dateInfo) => {
    let style = {
      extraInfoStyle: {
        position: "absolute",
        fontSize: "0.5rem",
        right: "-0.8rem",
        top: "0",
      },
      dateStyle: {
      },
      markStyle: {
        top: "auto",
        bottom: "0",
        right: "50%",
        transform: "translateX(50%)",
      },
    }
    const today = Date.now()
    const current = new Date(dateInfo.fullDateStr)
    if (this.isDateValid(current)) {
      this.currentDateInfo = [...this.currentDateInfo, {
        value: dateInfo.fullDateStr,
        color: 'red',
        markSize: '9px'
      }]
      this.debounceSetMarks()
    }
    if (isBefore(current, today) && !isSameDay(current, today)) {
      style.dateStyle = {
        ...style.dateStyle,
        'color': '#e2e5e8'
      }
    }
    return style;
  }

  handleCanSelectDay = (v) => {
    const selected = new Date(v.value)
    const today = Date.now()
    if (isBefore(selected, today) && !isSameDay(selected, today)) {
      return false
    }
    return true
  }

  handleMonthChange = () => {
    // TODO: 这里可以缓存
    console.log('handleMonthChange')
    this.currentDateInfo = []
  }

  handleSelectDate = (v) => {
    console.log(this.calendarRef.state.selectedRange)
    this.setState({
      isOpened: false,
      text: ''
    })
    const start = this.calendarRef.state.selectedRange.start
    const startDate = new Date(start)
    const end = this.calendarRef.state.selectedRange.end
    console.log(start, end)
    if (end !== "" && start !== "" && start !== end) {
      const endDate = new Date(end)
      let current = startDate
      let t = ""
      while (!isAfter(current, endDate)) {
        t += `${format(current,'yyyy年MM月dd日')},`
        console.log(t)
        current = addDays(current, 1)
      }
      t = t.slice(0, -1)
      this.setState({
        isOpened: true,
        text: t
      })
      setTimeout(() => {
        this.setState({
          isOpened: false,
          text: ""
        })
      }, 3000)
    }
  }

  render () {
    return (
      <View className='index'>
        <Calendar
          isMultiSelect
          extraInfo={[]}
          marks={this.state.marks}
          onClickPre={this.handleMonthChange}
          onClickNext={this.handleMonthChange}
          onDayLongPress={(item) => console.log(item)}
          selectedDateColor="#346fc2"
          customStyleGenerator={this.handleCustomStyleGenerator}
          onMonthChange={this.handleMonthChange}
          canSelectDay={this.handleCanSelectDay}
          onSelectDate={this.handleSelectDate}
          bindRef={(ref) => {
            this.calendarRef = ref
          }}
        />
        <AtToast isOpened={this.state.isOpened} text={this.state.text}></AtToast>
      </View>
    )
  }
}
