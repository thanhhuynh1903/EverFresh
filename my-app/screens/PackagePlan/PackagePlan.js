import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/header";
import { Card, Icon } from "@rneui/themed";
import CustomButton from "../../components/CustomButton";
const plans = [
  { name: "Monthly", title: "Monthly", price: "150.000 VNĐ / month" },
  { name: "Annual", title: "Annual", price: "100.000 VNĐ / month (1.200.000 VNĐ / year)" },
  { name: "Free", title: "Free plan", price: "1 month free" },
];

export default function PackagePlan({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState('Monthly');

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Text style={styles.title}>Choose your plan</Text>
        <Text style={styles.subtitle}>
          To complete the sign up process, please make the payment.
        </Text>
        {plans.map((plan, index) => (
          <TouchableOpacity key={index} onPress={() => handleSelectPlan(plan.name)}>
            <Card containerStyle={[styles.card, selectedPlan === plan.name && styles.selectedCard]}>
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                </View>
                <Icon
                  name={selectedPlan === plan.name ? 'radio-button-checked' : 'radio-button-unchecked'}
                  type="material"
                  color="#000"
                />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        <View style={{flex : 1 ,justifyContent :"center", alignContent:"center"}}>
        <CustomButton onPressName={"homepage"} navigation={navigation} style={styles.ButtonStyle}>
          <Text style={styles.signInButtonText}>Complete subscription</Text>
        </CustomButton>
        </View>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "start",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "start",
    color: "#888",
    marginBottom: 30,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedCard: {
    borderColor: "#000",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  planPrice: {
    fontSize: 16,
    color: "#888",
  }, signInButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  ButtonStyle: {
    width:"100%"
  },
});
