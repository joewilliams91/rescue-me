import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import DatePicker from "react-native-datepicker";

export default class MyDatePicker extends Component {
  render() {
    const { setDate, dob } = this.props;
    return (
      <View style={styles.container}>
        <DatePicker
          style={{ width: 200 }}
          date={dob}
          mode="date"
          placeholder="select date"
          format="MM-DD-YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2019"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={date => {
            setDate(date);
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    padding: 16
  }
});
