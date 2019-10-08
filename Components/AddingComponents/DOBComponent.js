import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import DatePicker from "react-native-datepicker";

const DOBComponent = props => {
  const { updateDetails, dob } = props;
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.question}>When were you born?</Text>
      <DatePicker
        style={{
          width: 280
        }}
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
            marginLeft: 40,
            borderColor: "#FFf",
            borderRadius: 5,
            borderWidth: 1
          },
          placeholderText: {
            color: "#fff"
          }
        }}
        onDateChange={date => {
          updateDetails("dob", date);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 50,
    padding: 16
  },
  question: {
    color: "#fff",
    fontSize: 17,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "poppins-semibold"
  }
});

export default DOBComponent;
